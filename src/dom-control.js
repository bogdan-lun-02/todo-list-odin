import { toggleUpdateForm } from "./updateItem";
import { updateForm } from "./updateItem";
import { addProjectForm } from "./addProject";
import { updateProjectForm } from "./updateProject";
import { toggleUpdateProjectForm } from "./updateProject";
import { app } from "./index";
import { compareAsc, compareDesc, format, parse, parseISO } from 'date-fns'

export const domControl = {

  checkLocation() {
    if (app.location === 'general') {
      domControl.showGeneral();
      app.location = 'general'
      return true;
    }
    else if (app.location === 'date') {
      domControl.showDate();
      app.location = 'date';
      return true;
    }
    else return false;
  },

  displayProject(target, name) {
    let main = document.querySelector('.main-tasks');
    main.innerHTML = '';
    main.appendChild(document.createElement('h1')).textContent = `${name}`
    app.checkTime();
    target.forEach(element => {
      const item = document.createElement('div');
      item.classList.add('item');
      if (element.priority === 'top') {
        item.innerHTML = '<i class="bx bxs-chevrons-up"></i>';
      } else if (element.priority === 'medium') {
        item.innerHTML = '<i class="bx bxs-chevron-up"></i>';
      } else { item.innerHTML = '<i class="empty-space">' }

      item.setAttribute('data-project', element.project);
      item.setAttribute('data-number', element.number);
      item.appendChild(document.createElement('p')).textContent = element.title;
      item.appendChild(document.createElement('p')).textContent = element.description;

      if (element.dueToday) {
        item.appendChild(document.createElement('p')).textContent = 'Due Today!';
        item.lastChild.style.color = 'red'
      }
      else if (element.outdated) {
        item.appendChild(document.createElement('p')).textContent = `${element.dueDate} (outdated)`
      } else {
        item.appendChild(document.createElement('p')).textContent = element.dueDate;
      }
      item.appendChild(document.createElement('p')).textContent = element.status;
      if (element.status === 'complete') item.lastChild.style.color = '#04AA6D';

      item.appendChild(document.createElement('p')).innerHTML = '<i class="bx bx-check markComplete"></i>'
      item.appendChild(document.createElement('p')).innerHTML = '<i class="bx bx-x markDelete"></i>'
      main.appendChild(item);
    });

    const tasks = document.querySelectorAll('.item');
    tasks.forEach(element => {
      if (element.lastChild.previousSibling.previousSibling.textContent !== 'complete') {
        element.addEventListener('dblclick', toggleUpdateForm);
      }
      else return null;
    });

    const checkSigns = document.querySelectorAll('.markComplete');
    checkSigns.forEach(element => {
      element.addEventListener('click', domControl.completeTask)
    });

    const deleteSigns = document.querySelectorAll('.markDelete');
    deleteSigns.forEach(element => {
      element.addEventListener('click', domControl.deleteTask)
    });
  },


  updateProjectSelection(target) {
    let projectSelection = '';
    if (target === todoForm) {
      projectSelection = document.forms.todoForm.projects;
    } else {
      projectSelection = document.forms.updateForm.projects;
    }

    projectSelection.innerHTML = '';
    app.allProjects.forEach(element => {
      projectSelection.appendChild(document.createElement('option')).textContent = element.title;
    })
  },

  updateProjectList() {
    let projectFolder = document.querySelector('#projectsFolder');
    projectFolder.innerHTML = '';
    projectFolder.textContent = 'Project list (dbl click to change)';
    projectFolder.classList.add('ul-list-head');
    app.allProjects.forEach(element => {
      projectFolder.appendChild(document.createElement('li')).textContent = element.title;
      projectFolder.lastChild.setAttribute('data-projectNumber', element.projectNumber);
    })

    let listItems = document.querySelectorAll('li');
    listItems.forEach(element => {
      element.classList.add('project-list-item');
      element.style.paddingLeft = '20px'
      element.style.height = '40px'
      element.addEventListener('click', domControl.navigateToProject);
      element.addEventListener('dblclick', toggleUpdateProjectForm);
    });
  },

  navigateToProject(e) {
    let indexOfProject = e.currentTarget.dataset.projectnumber;
    let project = app.allProjects.find(element => element.projectNumber === Number(indexOfProject));
    let main = document.querySelector('.main-tasks');
    main.innerHTML = '';
    app.checkTime();
    domControl.displayProject(project.projectList, project.title);
    app.location = '';
  },

  closeFormByClickOutside(e) {
    const formsToClose = document.querySelectorAll('.form-popup');
    if (e.target.parentElement.classList.contains('form-container') ||
      e.target.parentElement.classList.contains('form-popup')) {
      return;
    } else {
      formsToClose.forEach(element => {
        if (element.classList.contains('show-form')) {
          element.classList.toggle('show-form');
        } else return;
      });
    }
  },

  completeTask(e) {
    let projectTitle = e.currentTarget.parentElement.parentElement.dataset.project;
    let itemNumber = e.target.parentElement.parentElement.dataset.number;

    let targetProject = app.allProjects.find(element => element.title === projectTitle);
    let targetItem = targetProject.projectList.find(element => element.number === Number(itemNumber));

    app.completeItem(targetItem);

    if (!domControl.checkLocation()) {
      domControl.displayProject(targetProject.projectList, targetProject.title);
    }
  },

  deleteTask(e) {
    let projectTitle = e.currentTarget.parentElement.parentElement.dataset.project;

    let itemNumber = e.target.parentElement.parentElement.dataset.number;
    console.log(itemNumber);

    let projectTarget = app.allProjects.find(element => element.title === projectTitle);
    let numberTarget = projectTarget.projectList.findIndex(element => element.number === Number(itemNumber));

    projectTarget.projectList.splice(numberTarget, 1);
    app.save();

    if (!domControl.checkLocation()) {
      domControl.displayProject(projectTarget.projectList, projectTarget.title);
    }
  },

  showGeneral() {

    let main = document.querySelector('.main-tasks');


    app.generalProjects = [];
    app.allProjects.forEach(project => {
      project.projectList.forEach(item => app.generalProjects.push(item))
    })

    app.save();
    main.classList.toggle('showGeneral');

    domControl.displayProject(app.generalProjects, 'All')
    app.location = 'general';
  },

  showDate() {
    app.sortedByDateProjects = [];
    app.allProjects.forEach(project => {
      project.projectList.forEach(item => app.sortedByDateProjects.push(item))
    })

    app.sortedByDateProjects.sort(function (a, b) {
      return compareAsc(a.dueDate, b.dueDate)
    });

    domControl.displayProject(app.sortedByDateProjects, 'Sorted by urgency');
    app.location = 'date';
  }
}
