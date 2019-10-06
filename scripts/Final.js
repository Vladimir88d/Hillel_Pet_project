/*По нажатию на кнопку "New Task" справа выезжает форма добавления новой задачи. 
Текст вверху формы должен автогенерироваться на основании выбранных ниже опций и 
введенного текста.
Реализовать добавление, редактирование и удаление задач. Данные сохранять используя любой бекенд (в нашем случае просто NodeJS)
Код выполненного задания выложить на github с описанием шагов для запуска приложения.*/

let electrician = new ServiceType('Electrician', ['Fix TV', 'Fix washer', 'Fix Iron'], './images/icons/electrician_321339_cc.svg');
let plumber = new ServiceType('Plumber',
    ['Unblock toilet', 'Unblock a sink', 'Fix a water leak',
        'Install a sink', 'Install a shower', 'Install a toilet'], './images/icons/plumber_321315_cc.svg');
let gardener = new ServiceType('Gardener', ['Cut trees', 'Wattering flowers', 'Sweepping garden'], './images/icons/gardener_321363_cc.svg');
let housekeeper = new ServiceType('Housekeeper', ['Clean house'], './images/icons/housekeeper_321399_cc.svg');
let cook = new ServiceType('Cook', ['Prepare breakfest', 'Prepare food for birtday party'], './images/icons/cook_321395_cc.svg');
let services = [electrician, plumber, gardener, housekeeper, cook];


let form = new Form();
let newTask = form.addSection('NEW TASK', 'new_task');
let locat = form.addSection('LOCATION', 'location');
let serviceType = form.addSection('SERVICE TYPE', 'service');
let tasks = form.addSection('TASKS', 'tasks');
let taskDescr = form.addSection('TASK DESCRIPTION', 'task_description');





form.addTextField(locat, 'location');
form.addTextField(taskDescr, 'task_description_input');

form.appendForm();


let formModel = new FormModel(services);
let formView = new FormView(form);
let formController = new FormController(formModel, formView);
formController.listenServiceBtn('.service');
formController.listenTaskButtons('.task_btn');
formController.listenTexField('#task_description_input', '#task_description_output');
formController.listenTexField('#location', '#task_location');
formView.showServiceButtons(formModel.services);
formView.showNewTaskSection('.new_task');





function ServiceType(name, taskList, imgUrl) {
    this.name = name;
    this.taskList = taskList;
    this.imgUrl = imgUrl;
}

function Form(serviceTypeList) {
    this.serviceTypeList = serviceTypeList;
    this.form = document.createElement('form');

    this.addSection = function (sectionName, className) {
        let fieldset = document.createElement('fieldset');
        fieldset.classList.add(className);
        let legend = document.createElement('legend');
        legend.innerText = sectionName;
        fieldset.appendChild(legend);
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
        button.setAttribute('type', 'button');
        button.innerText = btnName;
        button.setAttribute('class', btnClass);
        let elem = document.querySelector(fieldsetClass);
        elem.appendChild(button);
    }

    this.addTextField = function (fieldset, id) {
        let textField = document.createElement('input');
        textField.setAttribute('id', id);
        fieldset.appendChild(textField);
    }

    this.appendForm = function () {
        document.body.appendChild(this.form);
    }


}

function FormView(form) {
    this.form = form;

    this.showServiceButtons = function (serviceTypeList) {
        let formSection = document.querySelector('.service');
        console.log(formSection);
        serviceTypeList.forEach((service) => {
            this.form.addButton(formSection, service.name, service.imgUrl);
        });
    }

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

    this.showNewTaskSection = function (className) {
        let newTaskSection = document.querySelector(className);
        let description = document.createElement('div');
        description.setAttribute('id', 'new_task_description');
        let serviceType = document.createElement('span');
        serviceType.setAttribute('id', 'service_type');
        description.appendChild(serviceType);
        let taskType = document.createElement('span');
        taskType.setAttribute('id', 'task_type');
        description.appendChild(taskType);

        let taskDescr = document.createElement('span');
        taskDescr.setAttribute('id', 'task_description_output');
        description.appendChild(taskDescr);

        addLocationField(description, 'task_location');

        let button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('id', 'create_task');
        button.innerHTML = 'CREATE TASK';
        newTaskSection.appendChild(description);
        newTaskSection.appendChild(button);

    }

    function addLocationField(descriptionContainer, fieldId) {
        let locationField = document.createElement('p');
        locationField.setAttribute('id', fieldId);
        descriptionContainer.appendChild(locationField);
    }

    this.addNewTaskDescription = function (fieldId, text) {
        let field = document.querySelector(fieldId);
        field.innerHTML = text;
    }




}

function FormController(formModel, formView) {
    this.formModel = formModel;
    this.formView = formView;


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
            this.formView.addNewTaskDescription('#service_type', "I need a " + serviceName.toLowerCase())
            this.formView.addNewTaskDescription('#task_type', '');
            this.listenTaskButtons();
            cleanField('#task_description_input');
            cleanField('#task_description_output');
        }

    }

    function cleanField(fieldId) {
        let elem = document.querySelector(fieldId);
        if (elem.tagName === 'INPUT') { elem.value = ''; }
        else if (elem.tagName === 'SPAN') {
            console.log(elem);
            elem.innerText = '';
        }
    }

    this.listenTaskButtons = function (className) {
        let elem = document.querySelector('.tasks');
        elem.addEventListener('click', this.handelTaskBtn.bind(this));

    }

    this.handelTaskBtn = function () {
        if (event.target.tagName === 'BUTTON') {
            this.formView.addNewTaskDescription('#task_type', " to " + event.target.innerText.toLowerCase() + ". ");
            cleanField('#task_description_input');
            cleanField('#task_description_output');
        }

    }

    this.listenTexField = function (textFieldId, outputFieldId) {
        let field = document.querySelector(textFieldId);
        field.addEventListener('input', () => {
            this.formView.addNewTaskDescription(outputFieldId, " " + field.value);
        }
        );
    }


}


function FormModel(services) {
    this.services = services;

    this.getTaskList = function (serviceName) {
        return this.services.find((elem) => elem.name === serviceName);
    }

}


function Task(serviceType, taskType, description, location) {
    this.serviceType = serviceType;
    this.taskType = taskType;
    this.description = description;
    this.location = location;
    this.date = new Date();

    this.getTaskContent = function () {
        return this.serviceType
            + this.taskType + this.description + this.location;
    }
}


function TaskView(mainContainerId, tasksContainerId, newTaskBtnId) {
    this.mainContainerId = mainContainerId;
    this.tasksContainerId = tasksContainerId;
    this.newTaskBtnId = newTaskBtnId;


    this.showTasksContainer = function () {
        let mainContainer = createContainer(this.mainContainerId);
        let tasksContainer = createContainer(this.tasksContainerId);
        let newTaskBtn = createButton('+NEW TASK', this.newTaskBtnId);
        mainContainer.appendChild(newTaskBtn);
        mainContainer.appendChild(tasksContainer);
        document.body.appendChild(mainContainer);
    }

    function createButton(btnName, btnId) {
        let newTaskBtn = document.createElement('button');
        newTaskBtn.innerHTML = btnName;
        newTaskBtn.setAttribute('id', btnId);
        return newTaskBtn;
    }

    function createContainer(containerId) {
        let container = document.createElement('div');
        container.setAttribute('id', containerId);
        return container;
    }

    this.showTask = function (task) {
        let taskElem = document.createElement('div');
        taskElem.setAttribute('class', 'task');
        let date = document.createElement('p');
        date.innerHTML = task.date;
        date.setAttribute('id', 'date');
        let description = document.createElement('p');
        description.innerHTML = task.getTaskContent();
        description.setAttribute('id', 'description');
        taskElem.appendChild(date);
        taskElem.appendChild(description);
        addButton(taskElem, 'edit_btn', 'EDIT');
        addButton(taskElem, 'del_btn', 'DELETE');
        let tasksContainer = document.querySelector('#task_container');
        tasksContainer.appendChild(taskElem);
    }

    function addButton(mainContainer, btnClass, btnName) {
        let btn = document.createElement('button');
        btn.innerHTML = btnName;
        console.log(mainContainer);
        btn.setAttribute('class', btnClass);
        mainContainer.appendChild(btn);

    }


}

function TaskController(taskModel, taskView) {
    this.taskModel = taskModel;
    this.taskView = taskView;

    this.listenNewTaskBtn = function (btnId) {
        let button = document.body.querySelector(btnId);
        button.addEventListener('click', () => {
            $("form").toggle(1000);
        });
    }


    this.listenCreateTaskBtn = function (btnId) {
        let btn = document.querySelector(btnId);
        btn.addEventListener('click', this.addTask.bind(this));
    }



    function getTask() {
        let serviceType = document.querySelector('#service_type').innerHTML;
        let taskType = document.querySelector('#task_type').innerHTML;
        let taskDescr = document.querySelector('#task_description_output').innerHTML;
        let taskLocation = document.querySelector('#task_location').innerHTML;
        let task = new Task(serviceType, taskType, taskDescr, taskLocation);
        return task;
    }

    this.addTask = function () {
        let task = getTask();
        this.taskView.showTask(task);
    }

    this.listenDeleteBtn = function (btnId) {
        let btn = document.querySelector(btnId);
        btn.addEventListener('click', () => {
           if (event.target.innerText === 'DELETE')
                 event.target.parentElement.remove();

        }

        );
    }

}

function TaskModel(taskList) {
    this.taskList = taskList;

    this.addTask = function (task) {
        this.taskList.putsh(task);
    }
}


let taskView = new TaskView('main_container', 'task_container', 'new_task_btn');
taskView.showTasksContainer();
taskView.showTask(new Task('I need a plumber ', 'to fix a sink.', 'Something stucked inside pipe. ', 'Dnipro, Mechnikova 10'));

let taskModel = new TaskModel();

let taskController = new TaskController(taskModel, taskView);
taskController.listenNewTaskBtn('#new_task_btn');
taskController.listenCreateTaskBtn('#create_task');
taskController.listenDeleteBtn('#main_container');





