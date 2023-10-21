document.body.classList.toggle("dark-theme");

let currentPage = 1;
let isLoading = false;
let currentObjectIndex = 0;
let data = [];
let loadingTimer = null; // Biến để xác định thời gian tải dữ liệu mới
let loadDelay = 1500; // Thời gian tải dữ liệu mới

function fetchData() {
  if (isLoading) {
    return;
  }
  isLoading = true;

  fetch(`https://gnmyzm-8080.csb.app/posts?page=${currentPage}`)
    .then(response => response.json())
    .then(responseData => {
      const dataContainer = document.querySelector('.statuss');
      console.log(responseData);
      if (responseData) {
        const currentObject = responseData[currentObjectIndex];
        if (currentObject) {
          // Tạo element và thêm nội dung
          const itemElement = document.createElement('div');
          itemElement.innerHTML = `
          <div class="status-field-container write-post-container">
          <div class="user-profile-box">
                  <div class="user-profile">
                      <img src="${currentObject.image}" alt="">
                      <div>
                          <p>${currentObject.title}</p>
                          <small>${currentObject.time}</small>
                      </div>
                  </div>
                  <div>
                      <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                  </div>
              </div>
              <div class="status-field">
                  <p>${currentObject.content} </p>
                  <img src="${currentObject.image}" alt="">

              </div>
              <div class="post-reaction">
                  <div class="activity-icons">
                      <div><img src="images/like-blue.png" alt="">120</div>
                      <div><img src="images/comments.png" alt="">52</div>
                      <div><img src="images/share.png" alt="">35</div>
                  </div>
                  <div class="post-profile-picture">
                      <img src="https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-1/357711147_1445054526253643_537251041321107664_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wZyYpb6DhskAX-hUUSo&_nc_ht=scontent.fhan5-6.fna&_nc_e2o=s&oh=00_AfAykq2DGj5uxHtxm2gHuP3P6psNFZWdsaWrQqnN0d39AA&oe=6538160C " alt=""> <i class=" fas fa-caret-down"></i>
                  </div>
              </div>
          </div>
          `;
          dataContainer.appendChild(itemElement);

          currentObjectIndex++;

          if (currentObjectIndex >= responseData.length) {
            currentPage++;
            currentObjectIndex = 0;
          }
        } else {
          currentPage = -1;
        }
      }

      isLoading = false;
      startLoadTimer(); // Bắt đầu đếm thời gian để hiển thị bài viết mới
    })
    .catch(error => {
      console.error('Lỗi: ' + error);
      isLoading = false;
    });
}

function startLoadTimer() {
  if (loadingTimer === null) {
    loadingTimer = setTimeout(() => {
      loadingTimer = null;
      showNextPost(); // Hiển thị bài viết mới sau khi kết thúc thời gian tải
    }, loadDelay);
  }
}
function showNextPost() {
  // Hiển thị bài viết mới ở đây
  // Ví dụ: hiển thị bài viết mới bằng cách làm visible
  const dataContainer = document.querySelector('.statuss');
  const dataElements = dataContainer.querySelectorAll('.status-field-container');
  const newPostElement = dataElements[dataElements.length - 1]; // Get the new post element

  if (newPostElement) {
    newPostElement.style.display = 'block';
  }
}

function shouldFetchData() {
    // Kiểm tra xem có nên tải dữ liệu mới hay không
    // Dựa vào vị trí scroll và chiều cao của object cuối cùng
    const dataContainer = document.querySelector('.statuss');
    const dataElements = dataContainer.querySelectorAll('.status-field-container');
    if (dataElements.length === 0) {
      return true;
    }
  
    const lastDataElement = dataElements[dataElements.length - 1];
    const scrollThreshold = 0.8 * lastDataElement.clientHeight;
    const scrollY = window.innerHeight + window.scrollY;
  
    return scrollY >= lastDataElement.offsetTop + scrollThreshold;
  }

  window.addEventListener('scroll', () => {
    if (!isLoading && shouldFetchData()) {
      fetchData();
    }
  });
  fetchData();  

// Khởi đầu bằng cách hiển thị bài viết đầu tiên
showNextPost();
const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading-indicator';
loadingIndicator.textContent = 'Loading...';

document.body.appendChild(loadingIndicator);

function startLoadTimer() {
    if (loadingTimer === null) {
      loadingTimer = setTimeout(() => {
        loadingTimer = null;
        hideLoadingIndicator(); // Ẩn thông báo "loading..." sau khi kết thúc thời gian tải
        showNextPost(); // Hiển thị bài viết mới sau khi kết thúc thời gian tải
      }, loadDelay);
      showLoadingIndicator(); // Hiển thị thông báo "loading..." khi bắt đầu thời gian tải
    }
  }
  
  function showLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    loadingIndicator.style.display = 'block';
  }
  
  function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    loadingIndicator.style.display = 'none';
  }