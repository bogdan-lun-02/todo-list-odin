import { app } from "./index";
import { domControl } from "./dom-control";
import { format, isPast, isToday, parse } from "date-fns";

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
  if (date.value !== '' && !isToday(parse(date.value, 'yyyy-MM-dd', new Date())) && isPast(parse(date.value, 'yyyy-MM-dd', new Date()))) {
    let label2 = document.querySelector('label[for="date"]');
    label2.style.color = 'red';
    label2.textContent = 'Input valid date!'
    return;
  }

  document.querySelector('label[for="date"]').textContent = 'Due Date';
  document.querySelector('label[for="date"]').style.color = 'aliceblue';
  document.querySelector('label[for="title"]').textContent = 'Name';
  document.querySelector('label[for="title"]').style.color = 'aliceblue';

  let priority = form.elements.priority;
  let project = form.elements.projects;

  let target = app.allProjects.find(element => element.title === project.value);
  app.addItem(target, title.value, desc.value, date.value, priority.value, project.value, 'in progress', app.number++);
  localStorage.setItem("number", app.number);
  app.checkTime();
  domControl.displayProject(target.projectList, target.title);
  title.value = '';
  desc.value = '';
  date.value = '';
  toggleTodoForm();
}
