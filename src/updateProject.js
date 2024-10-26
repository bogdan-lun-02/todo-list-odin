import { app } from "./index";
import { domControl } from "./dom-control";

export function toggleUpdateProjectForm(e) {
  e.preventDefault();
  const formDom = document.querySelector('#form-popup4');
  let form = document.forms.updateProject;
  formDom.classList.toggle('show-form');
  let projectNumber = e.currentTarget.dataset.projectnumber;

  const label = document.querySelector('#upd-project-label');
  label.style.color = 'aliceblue';
  label.textContent = 'Enter Name'

  let targetProject = app.allProjects.find(element => element.projectNumber === Number(projectNumber));
  form.elements.title.value = targetProject.title;

  const updateProjectBtn = document.querySelector('#update-project');
  updateProjectBtn.setAttribute('data-target', projectNumber);

  updateProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateProjectBtn.setAttribute('data-newtitle', form.elements.title.value);
    updateProjectForm(e);
  })
}

export function updateProjectForm(e) {
  e.preventDefault();
  let projectNumber = e.currentTarget.dataset.target;
  let newTitle = e.currentTarget.dataset.newtitle;
  const label = document.querySelector('#upd-project-label');
  if (app.allProjects.find(element => element.title === newTitle)) {
    label.style.color = 'red';
    label.textContent = 'Project with this name already exists';
    return;
  } else if (newTitle === '') {
    label.style.color = 'red';
    label.textContent = 'Enter name!';
  }
  else {
    let updatedProject = app.allProjects.find(element => element.projectNumber === Number(projectNumber));
    updatedProject.update(newTitle);
    domControl.updateProjectList();
    document.querySelector('#form-popup4').classList.toggle('show-form');
    domControl.displayProject(updatedProject);
  }
}