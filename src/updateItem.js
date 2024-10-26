import { app } from "./index";
import { domControl } from "./dom-control";

export function toggleUpdateForm(e) {
  const toggleForm = document.querySelector('#form-popup2');
  toggleForm.classList.toggle('show-form');
  domControl.updateProjectSelection(updateForm);

  let itemNumber = e.currentTarget.dataset.number;
  toggleForm.setAttribute('data-number', itemNumber);
  toggleForm.setAttribute('data-project', e.currentTarget.dataset.project);
  toggleForm.setAttribute('data-status', e.currentTarget.lastChild.previousSibling.previousSibling.textContent);

  let projectTitle = e.currentTarget.dataset.project;

  let projectTarget = app.allProjects.find(element => element.title === projectTitle);
  let itemTarget = projectTarget.projectList.find(element => element.number === Number(itemNumber));

  let form = document.forms.updateForm;
  form.elements.title.value = itemTarget.title;
  form.elements.desc.value = itemTarget.description;


  form.elements.date.value = itemTarget.dueDate;

  form.elements.priority.value = itemTarget.priority;
  form.elements.projects.value = itemTarget.project;
}

export function updateForm(e) {
  e.preventDefault();
  let form = document.forms.updateForm;
  let updateForm = document.querySelector('#form-popup2');
  let targetNumber = updateForm.dataset.number;
  let targetProject = updateForm.dataset.project;

  let title = form.elements.title.value;
  if (title === '') {
    let label = document.querySelector('label[for="title"]');
    label.style.color = 'red';
    label.textContent = 'Введи название!'
    return;
  }
  let desc = form.elements.desc.value;
  let date = form.elements.date.value;
  let priority = form.elements.priority.value;
  let project = form.elements.projects.value;
  let status = updateForm.dataset.status;


  let target = app.allProjects.find(element => element.title === targetProject);
  let newTarget = app.allProjects.find(element => element.title === project);

  if (project !== targetProject) {

    target.projectList.splice(target.projectList.findIndex(element => element.number === Number(targetNumber)), 1);
    app.addItem(newTarget, title, desc, date, priority, project, status, app.number++);
  } else if (project === targetProject) {
    let updatedItem = target.projectList.find(element => element.number === Number(targetNumber));
    app.updateItem(updatedItem, title, desc, date, priority, project, status);
  }

  domControl.displayProject(target);
  updateForm.classList.toggle('show-form');
  console.log(app);
}