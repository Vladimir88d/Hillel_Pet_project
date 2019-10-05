/*По нажатию на кнопку "New Task" справа выезжает форма добавления новой задачи. Текст вверху формы должен автогенерироваться на основании выбранных ниже опций и введенного текста.

Реализовать добавление, редактирование и удаление задач. Данные сохранять используя любой бекенд (в нашем случае просто NodeJS)

Код выполненного задания выложить на github с описанием шагов для запуска приложения.*/

let form = new Form();
let newTask =form.addSection('NEW TASK');
let locat = form.addSection('LOCATION');
let serviceType = form.addSection('SERVICE TYPE');
let tasks = form.addSection('TASKS');
let taskDescr = form.addSection('TASK DESCRIPTION');
form.addButton(serviceType, 'Electrician', './images/icons/electrician_321339_cc.svg');
form.addButton(serviceType, 'Plumber', './images/icons/plumber_321315_cc.svg');
form.addButton (newTask, 'Create task');
form.addTextField(locat);
form.addTextField(taskDescr);

form.addTaskButton(tasks, 'Unlock a toilet');





form.appendForm();
FormController();

function Task() {

}

function ServiceType() {
    this.name = name;
    this.taskList = taskList;
}

function Form(serviceTypeList) {
    this.serviceTypeList = serviceTypeList;
    this.form = document.createElement('form');

    this.addSection = function (sectionName) {
        let fieldset = document.createElement('fieldset');
        let legend = document.createElement('legend');
        legend.innerText = sectionName;
        fieldset.appendChild(legend);
        this.form.appendChild(fieldset);
        return fieldset;
    }

    this.addButton = function (fieldset, btnName, url) {
        let div = document.createElement('div');
        div.classList.add('type')
        let p = document.createElement('p');
        let button = document.createElement('img');
        button.setAttribute('src', url);
        div.appendChild(button);
        div.appendChild(p);
        p.innerText = btnName;
        fieldset.appendChild(div);
    }
  
  this.addTaskButton = function (fieldset, btnName) {
        let button = document.createElement('button');
        button.innerText = btnName;
        fieldset.appendChild(button);
  }
  
  this.addTextField = function (fieldset){
    let textField = document.createElement('input');
    fieldset.appendChild(textField);
  }
  
  /*this.showForm(mainFieldSet, secondaryFieldSet){
    
    this.serviceTypeList.forEach((service)=>{
      this.addButton(mainFieldSet, service.name);
      service.taskList.forEach((item)=>{
        this.addTaskButtons(secondaryFieldSet, item);
      });
    });
    
  }*/
  
  
  
  

    this.appendForm = function () {
        document.body.appendChild(this.form);
    }


}

function FormView() {

}

function FormController() {
  let button  = document.body.querySelector('#newtask');
  button.addEventListener('click', ()=>{
    $("form").toggle(1000);
  } );
}


function FormModel() {

}





