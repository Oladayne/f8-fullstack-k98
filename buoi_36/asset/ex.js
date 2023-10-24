import { client } from "./client.js";
import { config } from "./config.js";
const { PAGE_LIMIT } = config;

const app = {
  rootEl: document.querySelector(".questions-container"),
  query: {
    _sort: "id",
    _order: "desc",
    _limit: PAGE_LIMIT,
    _page: 1,
  },
  autoPageChangeInterval: 10000,
  autoPageChangeTimer: null,
  render: function (ques) {
    const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");
    this.rootEl.innerHTML = ques.map(({ question, id, answers, note }) => {
      const answerHTML = answers.map((answer) => `
        <div class="answer-item">
          <input type="radio" name="answer-${id}" value="${answer.text}">
          <label>${answer.text}</label>
        </div>
      `).join("");
      
      return `
        <div class="question-item">
          <h3><a href="#" data-bs-toggle="modal" data-bs-target="#post-detail" data-id="${id}">${stripHtml(question)}</a></h3>
          <p>${note}</p>
          <div class="answers">
            ${answerHTML}
          </div>
          <button class="submit-button" data-question-id="${id}">Gửi kết quả</button>
        </div>
      `;
    }).join("");
  },
  

  // Call API
  getPosts: async function (query = {}) {
    console.log(query);
    let queryString = Object.entries(query)
      .map((item) => {
        return item.join("=");
      })
      .join("&")
      .replaceAll(" ", "+");

    queryString = queryString ? "?" + queryString : "";

    const { data: ques, response } = await client.get(`/questions${queryString}`);
    this.render(ques);

    window.scroll({
      top: 0,
    });
    const totalPosts = response.headers.get("x-total-count");
    const totalPage = Math.ceil(totalPosts / PAGE_LIMIT);
    this.pagination(totalPage);
  },
  pagination: function (totalPage) {
    const paginationRoot = document.querySelector('.pagination-root');
    const range = Array.from(Array(totalPage).keys());

    paginationRoot.innerHTML = `
    <nav class="d-flex justify-content-end mt-3">
    <ul class="pagination pagination-sm">
      ${
      this.query._page > 1 ?
      `<li class="page-item"><a class="page-link page-prev" href="#">Trước</a></li>` : ""
      }
      ${range.map((index) => `<li class="page-item page-number  ${+this.query._page === index + 1 ? "active" : ""}"><a class="page-link" href="#">${index + 1}</a></li>`,)
      .join("")}
      ${
      this.query._page < totalPage ?
      `<li class="page-item"><a class="page-link page-next" href="#">Sau</a></li>` : ""
      }
    </ul>
  </nav>
    `
  },
  startAutoPageChange: function () {
    const countdownSpan = document.getElementById("countdown");
    let countdownValue = this.autoPageChangeInterval / 1000;

    const updateCountdown = () => {
      if (countdownValue > 0) {
        countdownSpan.textContent = countdownValue;
        countdownValue--;
      } else {
        countdownValue = this.autoPageChangeInterval / 1000;
        this.query._page++;
        this.getPosts(this.query);
      }
    };

    updateCountdown(); // Gọi một lần ngay từ đầu

    this.autoPageChangeTimer = setInterval(updateCountdown, 1000);
  },
  handleSubmitButtonClick: function () {
    const submitButtons = document.querySelectorAll('.submit-button');
    const resultMessage = document.getElementById('result-message');
  
    submitButtons.forEach((button) => {
      button.addEventListener('click', async (e) => {
        const questionId = e.target.getAttribute('data-question-id');
        const selectedAnswer = document.querySelector(`input[name="answer-${questionId}"]:checked`);
  
        if (selectedAnswer) {
          const answerText = selectedAnswer.value;
          
          // Gửi kết quả lên API
          const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              questionId,
              answer: answerText,
            }),
          });
  
          if (response.ok) {
            // Lấy kết quả từ API
            const result = await response.json();
            
            // Hiển thị thông báo dựa trên kết quả
            if (result.is_correct) {
              resultMessage.textContent = 'Kết quả chính xác';
            } else {
              resultMessage.textContent = 'Kết quả không chính xác';
            }
          } else {
            console.error('Lỗi trong quá trình gửi kết quả');
          }
        } else {
          console.error('Vui lòng chọn một câu trả lời trước khi gửi');
        }
      });
    });
  },
  
  handleGoPage: function () {
    const pagination = document.querySelector('.pagination-root');
    pagination.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("page-number") || e.target.parentNode.classList.contains("page-number")) {
        const pageNumber = e.target.innerText;
        this.query._page = pageNumber;
      }
      if (e.target.classList.contains("page-prev")) {
        this.query._page -= 1;
      }
      if (e.target.classList.contains("page-next")) {
        this.query._page += 1;
      }
      this.getPosts(this.query);
    });
  },
  // Khởi động app
  start: function () {
    this.getPosts(this.query);
    this.handleGoPage();
  },
};

// Biến để kiểm tra xem countdown đã hoàn thành hay chưa
let countdownFinished = false;

// Hàm để thiết lập sự kiện khi click vào nút "Start"
function setupCountdownAndStartAutoPageChange() {
  const countdownButton = document.getElementById("countdownButton");
  const startDiv = document.getElementById("backgroundImage");

  countdownButton.addEventListener("click", () => {
    countdownButton.disabled = true; // Ngăn không cho người dùng click lại trong quá trình đếm

    setTimeout(() => {
      startDiv.style.display = "none"; // Ẩn startDiv sau khi đếm xong
      countdownFinished = true; // Đã đếm xong 3 giây
      app.startAutoPageChange(); // Khởi động autoPageChange sau khi đếm xong
    }, 3000); // Đợi 3 giây trước khi ẩn
  });
}

// Gọi hàm để thiết lập sự kiện khi click vào nút "Start"
setupCountdownAndStartAutoPageChange();

//Chạy app
app.start();
