import { app } from "./index";
import { domControl } from "./dom-control";

export function toggleTodoForm() {
  const form = document.querySelector('#form-popup');
  form.classList.toggle('show-form');
  domControl.updateProjectSelection(todoForm);
}

export function readForm(e) {
  e.preventDefault();
  let form = document.forms.todoForm;

  let title = form.elements.title;
  if (title.value === '') {
    let label = document.querySelector('label[for="title"]');
    label.style.color = 'red';
    label.textContent = 'Введи название!'
    return;
  }
  let desc = form.elements.desc;
  let date = form.elements.date;
  let priority = form.elements.priority;
  let project = form.elements.projects;

  let target = app.allProjects.find(element => element.title === project.value);
  app.addItem(target, title.value, desc.value, date.value, priority.value, project.value, 'in progress', app.number++);
  localStorage.setItem("number", app.number);
  domControl.displayProject(target);
  toggleTodoForm();
  console.log(app);
}
