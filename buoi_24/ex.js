const todoForm = document.getElementById('todoForm');
        const newTodoInput = document.getElementById('newTodo');
        const todoList = document.getElementById('todoList');
        let isEditMode = false; 
        let editItem = null; 

        todoForm.addEventListener('submit', function (e) {
            e.preventDefault(); 
            const newTodoText = newTodoInput.value;

            if (newTodoText) {
                if (isEditMode) {
                    saveEditedTodo();
                } else {
                    const newTodoItem = createTodoItem(newTodoText);
                    todoList.appendChild(newTodoItem);
                }
                newTodoInput.value = '';
            }
        });

        function createTodoItem(todoText) {
    const todoItem = document.createElement('div');
    todoItem.classList.add("list-task")
    todoItem.classList.add("list")
    const todoContent = document.createElement('input'); 
    todoContent.type = 'text';
    todoContent.value = todoText;
    todoContent.setAttribute('readonly', 'true');
    const icon =document.createElement('div');
    icon.classList.add("icon")
    icon.classList.add("u-icon")

    const editButton = document.createElement('button');
    editButton.innerHTML = ' <i id="edit" class="fa-solid fa-pen-to-square"></i>';
    editButton.onclick = function () {
        editTodoItem(todoContent, editButton, deleteButton);
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML= ` <i id="xoa" class="fa-solid fa-trash"></i>`;
    deleteButton.onclick = function () {
        deleteTodoItem(todoItem);
    };

    todoItem.appendChild(todoContent);
    
    
    icon.appendChild(editButton);
    icon.appendChild(deleteButton);
    todoItem.appendChild(icon);
    return todoItem;
}

function editTodoItem(todoContent, editButton, deleteButton) {
  const todoItem =document.querySelector(".list");
  const styleButton = document.querySelector(".submit").style;
 const styleIcon=document.querySelector(".u-icon");
    if (todoContent.readOnly) {
        todoContent.readOnly = false;
        
        editButton.style.display = 'inline';
        editButton.classList.add("submit");
        editButton.innerHTML='Thêm';
        styleIcon.classList.remove("icon");
        


        deleteButton.style.display = 'none'; 
        
        todoContent.classList.add("newTodo");
        todoItem.classList.remove("list-task");
        todoItem.style.display="flex";
        
    } else {
      todoContent.classList.remove("newTodo");
     
        todoItem.classList.add("list-task");
        todoContent.readOnly = true;
        editButton.style.display = 'inline';
        deleteButton.style.display = 'inline'; 
        editButton.classList.remove("submit");
        editButton.innerHTML='<i id="edit" class="fa-solid fa-pen-to-square"></i>';
        styleIcon.classList.add("icon");
    }
}

        function saveEditedTodo() {
         const styleIcon =document.querySelector("u-icon")
            if (editItem) {
              const editButton =document.querySelector(".submit");
              editButton.classList.remove("submit");
                editButton.innerHTML='<i id="edit" class="fa-solid fa-pen-to-square"></i>';
                styleIcon.classList.add("icon");
                editItem.readOnly = true;
                editItem.nextElementSibling.style.display = 'inline'; 
                editItem.previousElementSibling.textContent = 'EDIT'; 
                editItem = null;
            }
        }

        function deleteTodoItem(item) {
            todoList.removeChild(item);
        }