import { TodoApp } from "./todoapp";
import { Project } from './project';
import { TodoItem } from "./todoitem";
import { domControl } from "./dom-control";
import { toggleTodoForm } from "./addItem";
import { readForm } from "./addItem";
import { toggleUpdateForm } from "./updateItem";
import { updateForm } from "./updateItem";
import { toggleProjectForm } from "./addProject";
import { addProjectForm } from "./addProject";
import { updateProjectForm } from "./updateProject";
import './style.css'
import 'boxicons'



export const app = new TodoApp();
app.firstLoad();
window.addEventListener('load', domControl.showGeneral)
window.addEventListener('load', app.checkTime)

const general = document.querySelector('#general');
general.addEventListener('click', domControl.showGeneral);

const date = document.querySelector('#date');
date.addEventListener('click', domControl.showDate);

const btn1 = document.getElementById('addTodo');
btn1.addEventListener('click', toggleTodoForm);

const addTaskBtn = document.getElementById('add-task');
addTaskBtn.addEventListener('click', readForm);


const tasks = document.querySelectorAll('.item');
tasks.forEach(element => {
  element.addEventListener('dblclick', toggleUpdateForm);
});

const updateTaskBtn = document.getElementById('update-task');
updateTaskBtn.addEventListener('click', updateForm);

console.log(app);
domControl.updateProjectList();

const addProjectBtn = document.querySelector('#addProject');
addProjectBtn.addEventListener('click', toggleProjectForm);

const addProjectBtnSubmit = document.querySelector('#add-project');
addProjectBtnSubmit.addEventListener('click', addProjectForm);

const main = document.querySelector('.main');
main.addEventListener('click', domControl.closeFormByClickOutside)


