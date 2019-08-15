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


    addTodoUi(newTodo);


    e.preventDefault();
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
