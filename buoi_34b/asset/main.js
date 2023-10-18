var dataList = [];
var searchResults = [];

// Thêm sự kiện lấy dữ liệu từ API sau khi trang tải xong
function sanitizeInput(input) {
    // Sử dụng một biến tạm thời để tạo một phần tử div
    var temp = document.createElement('div');
    temp.textContent = input;
    // Lấy giá trị text đã được làm sạch
    return temp.innerHTML;
}

// Sử dụng hàm sanitizeInput để xử lý dữ liệu người dùng
var userInput = document.getElementById('nameInput').value;
var cleanInput = sanitizeInput(userInput);
var completeButton = document.createElement("button");
completeButton.textContent = "Completed";
completeButton.addEventListener("click", function() {
    toggleCompleted(data);
});
document.addEventListener("DOMContentLoaded", function() {
    loadDataFromAPI(); // Gọi hàm lấy dữ liệu mặc định
});
document.getElementById("searchInput").addEventListener("input", function() {
    if (document.getElementById("searchInput").value === "") {
        hideSearchResults();
    } else {
        search();
    }
});

function hideSearchResults() {
    var searchDisplay = document.getElementById("searchList");
    searchDisplay.innerHTML = ""; // Xóa tất cả phần tử trong danh sách tìm kiếm
}

function loadDataFromAPI() {
    var apiUrl = "https://gnmyzm-8080.csb.app/users"; // Thay thế bằng URL của API thật
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            dataList = data;
            updateDataList();
        })
        .catch((error) => {
            console.error("Lỗi trong quá trình lấy dữ liệu từ API:", error);
        });
}
document.getElementById("submitBtn").addEventListener("click", function() {
    var name = document.getElementById("nameInput").value;

    if (name.trim() === "") {
        alert("Vui lòng nhập tên trước khi gửi.");
        return;
    }

    var inputData = {
        name: name,
        completed: true,
    };

    var apiUrl = "https://gnmyzm-8080.csb.app/users";
    fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
        })
        .then((response) => response.json())
        .then((data) => {
            dataList.push(data);
            updateDataList();
        })
        .catch((error) => {
            console.error("Lỗi trong quá trình gửi yêu cầu:", error);
        });
});

// Thêm sự kiện tìm kiếm khi nhấn Enter hoặc nút "Tìm kiếm"
document.getElementById("searchBtn").addEventListener("click", search);
document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        search();
    }
});

function search() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();
    searchResults = dataList.filter(function(data) {
        return data.name.toLowerCase().includes(searchTerm);
    });
    updateSearchResults();
}
// để hiển thị tất cả các dữ liệu đang có 
function updateDataList() {
    var completedDataDisplay = document.getElementById("completedList");
    var incompleteDataDisplay = document.getElementById("incompleteList");
    completedDataDisplay.innerHTML = "";
    incompleteDataDisplay.innerHTML = "";

    dataList.forEach(function(data) {
        var listItem = createListItem(data);

        if (data.completed) {
            completedDataDisplay.appendChild(listItem);
        } else {
            incompleteDataDisplay.appendChild(listItem);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadDataFromAPI(); // Gọi hàm lấy dữ liệu mặc định
});

function updateSearchResults() {
    var completedDataDisplay = document.getElementById("completedList");
    var incompleteDataDisplay = document.getElementById("incompleteList");
    completedDataDisplay.innerHTML = "";
    incompleteDataDisplay.innerHTML = "";

    // Hiển thị danh sách dựa trên kết quả tìm kiếm
    searchResults.forEach(function(data) {
        var listItem = createListItem(data);

        if (data.completed) {
            completedDataDisplay.appendChild(listItem);
        } else {
            incompleteDataDisplay.appendChild(listItem);
        }
    });
}
document.addEventListener("DOMContentLoaded", function() {
    loadDataFromAPI(); // Gọi hàm lấy dữ liệu mặc định
});

function createListItem(data) {
    var listItem = document.createElement("li");

    var nameText = document.createElement("span");
    nameText.textContent =  data.name;

    var editButton = document.createElement("button");
    editButton.textContent = "Sửa";
    editButton.addEventListener("click", function() {
        editData(data);
    });

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Xóa";
    deleteButton.addEventListener("click", function() {
        deleteData(data.id);
    });

    var completeButton = document.createElement("button");
    completeButton.textContent = "Completed";
    completeButton.addEventListener("click", function() {
        toggleCompleted(data);
    });

    listItem.appendChild(nameText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(completeButton);

    return listItem;
}

function deleteData(itemId) {
    // Sử dụng biến tạm thời searchResults nếu có kết quả tìm kiếm, nếu không sử dụng dataList
    var dataToDelete = searchResults.length > 0 ? searchResults : dataList;

    var apiUrl = "https://gnmyzm-8080.csb.app/users/" + itemId;
    fetch(apiUrl, {
            method: "DELETE"
        })
        .then(() => {
            var index = dataToDelete.findIndex(item => item.id === itemId);
            if (index !== -1) {
                dataToDelete.splice(index, 1);
                updateDataList();
            }
        })
        .catch((error) => {
            console.error("Lỗi trong quá trình xóa mục:", error);
        });
}

function editData(data) {
    var newName = prompt("Nhập tên mới:", data.name);
    if (newName !== null) {
        var itemId = data.id;
        var apiUrl = "https://gnmyzm-8080.csb.app/users/" + itemId;
        var updatedData = {
            name: newName,
            completed: data.completed // Giữ nguyên trạng thái completed
        };

        fetch(apiUrl, {
                method: "PUT", // hoặc PATCH tùy thuộc vào API của bạn
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            })
            .then(() => {
                // Cập nhật danh sách dữ liệu sau khi cập nhật thành công
                data.name = newName;
                updateDataList(); // Cập nhật giao diện ngay lập tức
            })
            .catch((error) => {
                console.error("Lỗi trong quá trình cập nhật dữ liệu:", error);
            });
    }
}

function toggleCompleted(data) {
    var itemId = data.id;
    var apiUrl = "https://gnmyzm-8080.csb.app/users/" + itemId;
    var updatedData = {
        name: data.name,
        completed: !data.completed // Đảo ngược trạng thái completed
    };

    fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
        .then(() => {
            // Cập nhật trạng thái completed trong dữ liệu
            data.completed = !data.completed;
            updateDataList(); // Cập nhật giao diện ngay lập tức
        })
        .catch((error) => {
            console.error("Lỗi trong quá trình cập nhật trạng thái Completed:", error);
        });
}
const overlay = document.getElementById("overlay");
const addButton = document.getElementById("addBtn");
const addForm = document.querySelector(".add");
const nameInput = document.getElementById("nameInput");
const submitButton = document.getElementById("submitBtn");
const cancelButton = document.getElementById("cancelBtn");

// Ẩn form thêm khi trang web tải lên


// Xử lý sự kiện khi nhấn nút "Add todos"
addButton.addEventListener("click", function() {
    overlay.style.display = "block";
    addForm.style.display = "block";
    nameInput.value = ""; // Xóa dữ liệu trong trường input
});

// Xử lý sự kiện khi nhấn nút "Hủy"
cancelButton.addEventListener("click", function() {
    overlay.style.display = "none";
    addForm.style.display = "none";
});

// Xử lý sự kiện khi nhấn nút "Gửi Dữ Liệu"
submitButton.addEventListener("click", function() {
    // Thực hiện các xử lý khi gửi dữ liệu và sau đó ẩn form
    // Ví dụ: gửi dữ liệu lên máy chủ và sau đó ẩn form
    overlay.style.display = "none";
    addForm.style.display = "none";
});
