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

  render: function (ques) {
    const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");
    this.rootEl.innerHTML = `<div class="row g-3">
    ${ques
      .map(
        ({ question ,id}) => `<div class="col-6 col-md-4">
    <div class="post-item border p-3">
      <h3><a href="#" data-bs-toggle="modal" data-bs-target="#post-detail" data-id="${id}">${stripHtml(question)}</a></h3>
      <p>
 
      </p>
    </div>
  </div>`,
      )
      .join("")}
  </div>`;
  },

  //Call API
  getPosts: async function (query = {}) {
    console.log(query);
    // let queryString = new URLSearchParams(query).toString();
    let queryString = Object.entries(query)
      .map((item) => {
        return item.join("=");
      })
      .join("&")
      .replaceAll(" ", "+");

    queryString = queryString ? "?" + queryString : "";

    const { data: ques,response } = await client.get(`/questions${queryString}`);
    this.render(ques);
    console.log(ques);
    // tính tổng só trang
    // bằng tổng số bài viết / limit (totalPage = math.ceil)
    window.scroll({
      top: 0,
    });
    const totalPosts = response.headers.get("x-total-count");
    const totalPage= Math.ceil(totalPosts/PAGE_LIMIT)
    this.pagination(totalPage);
  },
  pagination: function (totalPage) {
    const paginationRoot = document.querySelector('.pagination-root');
    // tạo 1 array từ 0 đến totalPage
    const range = Array.from(Array(totalPage).keys());

    paginationRoot.innerHTML = `
    <nav class="d-flex justify-content-end mt-3">
    <ul class="pagination pagination-sm">
      ${
      this.query._page > 1 ?
      `<li class="page-item"><a class="page-link page-prev" href="#">Trước</a></li>`:""
      }
      ${range.map((index) => `<li class="page-item page-number  ${+this.query._page === index + 1 ? "active" : ""}"><a class="page-link" href="#">${index + 1}</a></li>`,)
      .join("")}
      ${
      this.query._page < totalPage ?
      `<li class="page-item"><a class="page-link page-next" href="#">Sau</a></li>`:""
      }
    </ul>
  </nav>
    `
  },
  handleGoPage: function () {
    const pagination = document.querySelector('.pagination-root');
    pagination.addEventListener("click", (e) => {
      e.preventDefault();
      console.log()
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
    })
  },
  //Khởi động app
  start: function () {
    this.getPosts(this.query);
    this.handleGoPage();
  },
};
document.addEventListener("DOMContentLoaded", function() {
    const countdownButton = document.getElementById("countdownButton");
    const backgroundImage = document.getElementById("backgroundImage");
    const start = document.querySelector('.start');

    countdownButton.addEventListener("click", function() {
        countdownButton.disabled = true; // Ngăn không cho người dùng click lại trong quá trình đếm
        let secondsLeft = 3;
        function countdown() {
            if (secondsLeft === 0) {
                start.style.display = "none"; // Ẩn background-image sau khi đếm xong
            } else {
                countdownButton.textContent = `${secondsLeft} giây`;
                secondsLeft--;
                setTimeout(countdown, 1000);
            }
        }

        countdown();
    });
    
});
//Chạy app
app.start();
