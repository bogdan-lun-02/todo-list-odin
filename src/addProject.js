import { app } from "./index";
import { domControl } from "./dom-control";

export function toggleProjectForm() {
  const formDom = document.querySelector('#form-popup3');
  formDom.classList.toggle('show-form');
}

export function addProjectForm(e) {
  e.preventDefault();

  let form = document.forms.addProject;

  let title = form.elements.title;
  if (title.value === '') {
    let label = document.querySelector('label[for="title"]');
    label.style.color = 'red';
    label.textContent = 'Введи название!'
    return;
  }

  if (app.allProjects.find(element => element.title === title.value)) {
    alert('Name already taken');
  } else {
    app.addProject(title.value, app.projectNumber++);
  }
  toggleProjectForm();
  domControl.updateProjectList();
}