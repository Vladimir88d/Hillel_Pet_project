/*По нажатию на кнопку "New Task" справа выезжает форма добавления новой задачи. 
Текст вверху формы должен автогенерироваться на основании выбранных ниже опций и 
введенного текста.
Реализовать добавление, редактирование и удаление задач. Данные сохранять используя любой бекенд (в нашем случае просто NodeJS)
Код выполненного задания выложить на github с описанием шагов для запуска приложения.*/

let electrician = new ServiceType('Electrician', ['Fix TV', 'Fix washer', 'Fix Iron']);
let plumber = new ServiceType('Plumber',
    ['Unblock toilet', 'Unblock a sink', 'Fix a water leak',
        'Install a sink', 'Install a shower', 'Install a toilet']);
let gardener = new ServiceType('Gardener', ['Cut trees', 'Wattering flowers', 'Sweepping garden']);
let housekeeper = new ServiceType('Housekeeper', ['Cleaning house']);
let cook = new ServiceType('Cook', ['Prepare breakfest', 'Prepare food for birtday party']);
let services = [electrician, plumber, gardener, housekeeper, cook];


let form = new Form();
let newTask = form.addSection('NEW TASK', 'new_task');
let locat = form.addSection('LOCATION', 'location');
let serviceType = form.addSection('SERVICE TYPE', 'service');
let tasks = form.addSection('TASKS', 'tasks');
let taskDescr = form.addSection('TASK DESCRIPTION', 'task_description');



form.addButton(serviceType, 'Electrician', './images/icons/electrician_321339_cc.svg');
form.addButton(serviceType, 'Plumber', './images/icons/plumber_321315_cc.svg');
form.addButton(serviceType, 'Gardener', './images/icons/gardener_321363_cc.svg');
form.addButton(serviceType, 'Housekeeper', './images/icons/housekeeper_321399_cc.svg');
form.addButton(serviceType, 'Cook', './images/icons/cook_321395_cc.svg');


form.addTextField(locat);
form.addTextField(taskDescr);

form.appendForm();


let formModel = new FormModel(services);
let formView = new FormView(form);
let formController = new FormController(formModel, formView);
formController.listenServiceBtn('.service');





function ServiceType(name, taskList) {
    this.name = name;
    this.taskList = taskList;
}

function Form(serviceTypeList) {
    this.serviceTypeList = serviceTypeList;
    this.form = document.createElement('form');

    this.addSection = function (sectionName, className) {
        let fieldset = document.createElement('fieldset');
        fieldset.classList.add(className);
        let legend = document.createElement('legend');
        let div = document.createElement('div');
        legend.innerText = sectionName;
        fieldset.appendChild(legend);
        fieldset.appendChild(div);
        this.form.appendChild(fieldset);
        return fieldset;
    }

    this.addButton = function (fieldset, btnName, url, className) {
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

    this.addTaskButton = function (fieldsetClass, btnName, btnClass) {
        let button = document.createElement('button');
        button.innerText = btnName;
        button.setAttribute('class', btnClass);
        let elem = document.querySelector(fieldsetClass);
        elem.appendChild(button);
    }

    this.addTextField = function (fieldset) {
        let textField = document.createElement('input');
        fieldset.appendChild(textField);
    }

    this.appendForm = function () {
        document.body.appendChild(this.form);
    }


}

function FormView(form) {
    this.form = form;

    this.selectBtn = function () {
        let prevSelectedElem = document.querySelector('#selected');
        if (prevSelectedElem && event.target.tagName === 'IMG')
            prevSelectedElem.setAttribute('id', '');
        let target = event.target;
        if (event.target.tagName === 'IMG') {
            target.setAttribute('id', 'selected');
        }
    }

    this.showTasks = function (taskList) {
        this.deleteButtons();
        taskList.forEach(element => {
            this.form.addTaskButton('.tasks', element, 'task_btn');
        });
    }

    this.deleteButtons = function (className) {
        let buttons = document.querySelectorAll('.task_btn');
        buttons.forEach((elem) => elem.remove());

    }


}

function FormController(formModel, formView) {
    this.formModel = formModel;
    this.formView = formView;

    let button = document.body.querySelector('#newtask');
    button.addEventListener('click', () => {
        $("form").toggle(1000);
    });

    this.listenServiceBtn = function (className) {
        let elem = document.querySelector(className);
        elem.addEventListener('click', this.handler.bind(this));
    }

    this.handler = function () {
        this.formView.selectBtn();
        if (event.target.tagName === 'IMG') {
            let serviceName = event.target.nextSibling.innerText;
            let service = this.formModel.getTaskList(serviceName);
            this.formView.showTasks(service.taskList);
        }

    }


}


function FormModel(services) {
    this.services = services;

    this.getTaskList = function (serviceName) {
        console.log(this.services);
        return this.services.find((elem) => elem.name === serviceName);
    }

}





