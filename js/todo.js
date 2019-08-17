const addtodoform = document.querySelector('#todo-form');
const todofirstinput = document.querySelector('#todo');
const listgroupul = document.querySelector('.list-group');
const firstcartbody = document.querySelector('.card-body');
const secondcardbody = document.querySelectorAll('.card-body')[1];
const filterinput = document.querySelector('#filter');
const clearalltodo = document.querySelector('#clear-todos');


evenListeners();


function evenListeners(){  // butun listnerler burda olacaq

    addtodoform.addEventListener('submit',getValue);
    document.addEventListener('DOMContentLoaded',loadAlltodoui);
    secondcardbody.addEventListener('click',deleteTodo);
    filterinput.addEventListener('keyup',search);
}


function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        let textnode;
        e.target.parentElement.parentElement.remove();
        showAlert('success','Uğurla silindi');
        textnode = e.target.parentElement.parentElement.textContent;
        deletefromlocalstorage(textnode);
    }
}


function search(e){
    
    let value = e.target.value.toLowerCase();   

    let listitems = document.querySelectorAll('.list-group-item');

    listitems.forEach(function(listitem){
        
        const text = listitem.textContent.toLocaleLowerCase();

        if (text.indexOf(value) === -1){
            listitem.setAttribute('style','display:none !important');
        }else {
            listitem.setAttribute('style','display:block');
        }

    })

}

function deletefromlocalstorage(textnode){
    let todos = getLocalStorage();

    for(let i = 0; i < todos.length;i++){
        if(todos[i] === textnode){
            todos.splice(i,1);
            localStorage.setItem('todos',JSON.stringify(todos));
        }
    }
}


function loadAlltodoui(){
    let todos = getLocalStorage();

    todos.forEach(todo => {
        addTodoUi(todo);
    });
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
