const addtodoform = document.querySelector('#todo-form');
const todofirstinput = document.querySelector('#todo');
const listgroupul = document.querySelector('.list-group');
const firstcartbody = document.querySelector('.card-body');
const secondcadrbody = document.querySelectorAll('.card-body')[1];
const filterinput = document.querySelector('#filter');
const clearalltodo = document.querySelector('#clear-todos');


evenListeners();


function evenListeners(){  // butun listnerler burda olacaq

    addtodoform.addEventListener('submit',getValue)
   
}


function getValue(e) {
    let newTodo = todofirstinput.value.trim(); // goturulen deyeri trim etmek ucun

    if(newTodo === ""){
        showAlert('danger','Zəhmət olmasa bir todo giriniz');
    }else{
        addTodoUi(newTodo);
        showAlert('success','Uğurla yükləndi');
        addTodoLocalStorage(newTodo);  
    }

    e.preventDefault();
}


function getLocalStorage(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}


function addTodoLocalStorage(newTodo){
    let todos = getLocalStorage();

    todos.push(newTodo);

    localStorage.setItem('todos',JSON.stringify(todos));
}



// error ve ya succes divinin create olundugu hisse

function showAlert(type,message){

    /*


    <div class="alert alert-danger" role="alert">
        This is a danger alert—check it out!
    </div>


    */

    const todonotification = document.createElement('div');

    todonotification.className = `alert alert-${type}`;

    todonotification.setAttribute('role','alert');

    todonotification.textContent = message;

    firstcartbody.appendChild(todonotification);



    setTimeout(function(){
        todonotification.remove()
    },2000);


}


function addTodoUi(newTodo){ // gelen valueni li kimi interface elave etmek


    const listItem = document.createElement('li');
    const link = document.createElement('a');

    link.className = 'delete-item';
    link.href='#';
    link.innerHTML = "<i class='fa fa-remove'></i>";


    listItem.className = 'list-group-item d-flex justify-content-between';

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // list-groupa li ni append etmek
    listgroupul.appendChild(listItem);
    todofirstinput.value = "";


}
