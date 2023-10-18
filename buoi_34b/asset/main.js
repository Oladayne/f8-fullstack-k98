var dataList = [];
var searchResults = [];


function sanitizeInput(input) {
    var temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

// Sử dụng hàm sanitizeInput để xử lý dữ liệu người dùng
var userInput = document.getElementById('nameInput').value;
var cleanInput = sanitizeInput(userInput);
document.getElementById("searchInput").addEventListener("input", function() {
    if (document.getElementById("searchInput").value === "") {
        hideSearchResults();
    } else {
        search();
    }
});

function hideSearchResults() {
    var searchDisplay = document.getElementById("searchList");
    searchDisplay.innerHTML = ""; 
}

function loadDataFromAPI() {
    var apiUrl = "https://gnmyzm-8080.csb.app/users"; 
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
    var countDisplay = document.getElementById("count");
    completedDataDisplay.innerHTML = "";
    incompleteDataDisplay.innerHTML = "";

    incompleteDataCount = 0; 

    dataList.forEach(function (data) {
        var listItem = createListItem(data);

        if (data.completed) {
            completedDataDisplay.appendChild(listItem);
        } else {
            incompleteDataCount++;
            incompleteDataDisplay.appendChild(listItem);
        }
    });

    countDisplay.textContent = incompleteDataCount;
}

document.addEventListener("DOMContentLoaded", function () {
    loadDataFromAPI();
    updateDataList();
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

function createListItem(data) {
    var listItem = document.createElement("li");

    var nameText = document.createElement("span");
    nameText.textContent =  data.name;

    var editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    editButton.style.background='blue'
    editButton.addEventListener("click", function() {
        editData(data);
    });

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.style.background='red'
    deleteButton.addEventListener("click", function() {
        deleteData(data.id);
    });

    var completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeButton.classList.add("completed-button");
    completeButton.addEventListener("click", function () {
        toggleCompleted(data);
    });
    if (!data.completed) {
        completeButton.classList.add("completed-icon"); 
    }
    listItem.appendChild(nameText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(completeButton);

    return listItem;
}

function deleteData(itemId) {
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
            completed: data.completed 
        };

        fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            })
            .then(() => {
               
                data.name = newName;
                updateDataList(); 
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
        completed: !data.completed 
    };

    fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
        .then(() => {
           
            data.completed = !data.completed;
            updateDataList(); 
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


// Xử lý sự kiện khi nhấn nút "Add todos"
addButton.addEventListener("click", function() {
    overlay.style.display = "block";
    addForm.style.display = "block";
    nameInput.value = ""; 
});

// Xử lý sự kiện khi nhấn nút "Hủy"
cancelButton.addEventListener("click", function() {
    overlay.style.display = "none";
    addForm.style.display = "none";
});

// Xử lý sự kiện khi nhấn nút "Gửi Dữ Liệu"
submitButton.addEventListener("click", function() {
    overlay.style.display = "none";
    addForm.style.display = "none";
});
