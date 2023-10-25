import { client } from "./client.js";
import { config } from "./config.js";
const { PAGE_LIMIT } = config;
let poin = 0;

const app = {
  rootEl: document.querySelector(".questions-container"),
  query: {
    _sort: "id",
    _order: "desc",
    _limit: PAGE_LIMIT,
    _page: 1,
  },
  render: function (ques) {
    const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");
    this.rootEl.innerHTML = ques.map(({ question, id, answers, note }, index) => {
      const answerHTML = answers.map((answer, answerIndex) => `
        <div class="answer-item">
          <input type="radio" name="answer-${id}" value="${answerIndex}">
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
          <button type="button" id="submit-button-${index}">Gửi câu trả lời</button>
          <p id="result-${index}"></p>
        </div>
      `;
    }).join("");
  
    // Lắng nghe sự kiện khi nút "Gửi câu trả lời" được nhấn
   // Khởi tạo điểm (poin) ban đầu với giá trị là 0 ở mức globa

ques.forEach((question, index) => {
  const submitButton = document.getElementById(`submit-button-${index}`);
  const resultElement = document.getElementById(`result-${index}`);
  startCountdown();
  submitButton.addEventListener('click', async function() {
    const selectedAnswerIndex = document.querySelector(`input[name="answer-${question.id}"]:checked`);
  
    if (selectedAnswerIndex) {
      const selectedAnswerIndexValue = parseInt(selectedAnswerIndex.value);
      const selectedAnswerData = question.answers[selectedAnswerIndexValue];
  
      if (selectedAnswerData.is_correct) {
        // Cộng thêm 100 điểm khi đáp án đúng
        poin += 100;
        resultElement.textContent = 'Kết quả của bạn là đúng.';
      } else {
        resultElement.textContent = 'Kết quả của bạn là sai.';
      }
  
      // Cập nhật giá trị điểm trên màn hình
      const totalPointsSpan = document.getElementById('total-points');
      if (totalPointsSpan) {
        totalPointsSpan.textContent = poin;
      }
    } else {
      resultElement.textContent = 'Hãy chọn một câu trả lời trước khi gửi.';
    }
  });
});

// ...

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
  
  
  handleGoPage: function () {
    const pagination = document.querySelector('.pagination-root');
    pagination.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("page-number") || e.target.parentNode.classList.contains("page-number")) {
        const pageNumber = e.target.innerText;
        this.query._page = pageNumber;
        startCountdown();
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
const countdownTimer = document.getElementById("countdown-timer");
let timer;
let timeLeft = 10; // Thời gian đếm ngược ban đầu (10 giây)
let isCounting = false;

function startCountdown() {
  if (!isCounting) {
    isCounting = true;
    countdownTimer.textContent = `Thời gian còn lại: ${timeLeft} giây`;

    timer = setInterval(() => {
      timeLeft--;

      if (timeLeft <= 0) {
        clearInterval(timer);
        autoClickNextPage(); // Tự động kích hoạt "Trang kế tiếp"
        isCounting = false;
        timeLeft = 10; // Reset the countdown timer
        startCountdown(); // Bắt đầu đếm ngược lại
      } else {
        countdownTimer.textContent = `Thời gian còn lại: ${timeLeft} giây`;
      }
    }, 1000); // Cập nhật mỗi giây
  }
}

function autoClickNextPage() {
  const nextPageButton = document.querySelector('.page-next');
  if (nextPageButton) {
    nextPageButton.click();
  }
}

// ...



//Chạy app
app.start();
