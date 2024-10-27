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

const general = document.querySelector('#general');
general.addEventListener('click', domControl.showGeneral);

const date = document.querySelector('#date');
date.addEventListener('click', domControl.showDate);


// app.addItem(defaultProject, 'project', 'project-desc', '2024-10-20', 'top', 'Default', 'in progress', app.number++);
// app.addItem(defaultProject, 'another', 'project-desc', '2024-11-30', 'low', 'Default', 'in progress', app.number++);
// app.addItem(defaultProject, 'third', 'project-desc', '2024-12-30', 'medium', 'Default', 'in progress', app.number++);

// domControl.displayProject(defaultProject);






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


