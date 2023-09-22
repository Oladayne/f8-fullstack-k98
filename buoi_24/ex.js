const listTasks = document.querySelector('.list-task');
const btnAddTask = document.querySelector('.btn-addTask');
const inputTodo = document.querySelector('.input-todo');
let itemInput, edits, deletes, taskItem, taskItemEdit, btnAddTaskEdit, inputEdits, lis;
let arrItemInput, arrEdit, arrDelete, arrtaskItem, arrTaskItemEdit, arrbtnAddTaskEdit, arrinputEdit;

btnAddTask.onclick = ()=>{
    let value = inputTodo.value;
    if(value){
        const li = document.createElement('li');
        li.innerHTML = 
        `
            <div class="task-item">
                <div class="item">
                    <input type="text" value="${value}" disabled class="item-input" >
                </div>
                <div class="icon">
                    <span class="edit"><i class="fa-solid fa-pen-to-square"></i></span>
                    <span class="delete"><i class="fa-solid fa-trash"></i></span>
                </div>
            </div>
            <div class="task-item-edit">
                <div class="task-input">
                    <input type="text" class="input-edit" >
                </div>
                <button class="btn-addTask btn-addTask-Edit ">Add Task</button>
            </div>
        `
        listTasks.appendChild(li);
        inputTodo.value = ''
    }else{
        alert('Enter something !!!');
        inputTodo.focus()
    }
    itemInput = document.querySelectorAll('.item-input');
    edits = document.querySelectorAll('.edit');
    lis = document.querySelectorAll('li');
    deletes = document.querySelectorAll('.delete');
    taskItem = document.querySelectorAll('.task-item');
    taskItemEdit = document.querySelectorAll('.task-item-edit');
    btnAddTaskEdit = document.querySelectorAll('.btn-addTask-Edit');
    inputEdits = document.querySelectorAll('.input-edit');
    arrItemInput = Array.from(itemInput);
    arrEdit = Array.from(edits);
    arrDelete = Array.from(deletes);
    arrtaskItem = Array.from(taskItem);
    arrTaskItemEdit = Array.from(taskItemEdit);
    arrbtnAddTaskEdit = Array.from(btnAddTaskEdit);
    arrinputEdit = Array.from(inputEdits);
    arrli = Array.from(lis);

    arrEdit.forEach((el, index)=>{
        el.addEventListener('click', ()=>{
            arrtaskItem[index].style.display = 'none';
            arrTaskItemEdit[index].style.display = 'flex';
            arrinputEdit[index].value = arrItemInput[index].value;
            arrbtnAddTaskEdit[index].addEventListener('click', ()=>{
                arrtaskItem[index].style.display = 'flex';
                arrTaskItemEdit[index].style.display = 'none';
                arrItemInput[index].value = arrinputEdit[index].value
            })
        })
    })
    arrDelete.forEach((el, index)=>{
        el.addEventListener('click', ()=>{
            arrli[index].remove()
        })
    })
}