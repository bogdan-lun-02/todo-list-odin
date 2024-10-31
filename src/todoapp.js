import { format, isFuture, isPast, isToday, parse } from "date-fns";
import { app } from ".";
import { Project } from "./project";
import { TodoItem } from "./todoitem";

export class TodoApp {
  constructor() {
  }

  allProjects = JSON.parse(localStorage.getItem('allProjects')) || [];
  generalProjects = JSON.parse(localStorage.getItem('generalProjects')) || [];
  sortedByDateProjects = [];

  number = parseInt(localStorage.getItem("number")) || 0;
  projectNumber = parseInt(localStorage.getItem("projectNumber")) || 0;


  firstLoad() {
    if (!localStorage["alertdisplayed"]) {
      app.addProject('Default', ++app.projectNumber);
      localStorage.setItem("projectNumber", app.projectNumber);
      localStorage.setItem("alertdisplayed", true)
    }
  }

  save() {
    localStorage.setItem('allProjects', JSON.stringify(this.allProjects));
    localStorage.setItem('generalProjects', JSON.stringify(this.generalProjects))
  }

  addProject(title, number) {
    const project = new Project(title, number);
    this.allProjects.push(project);
    console.log(this.allProjects);
    this.save();
  }

  updateProject(target, title) {
    target.title = title;
    this.save();
  }

  addItem(target, title, description, dueDate, priority, project, status, number) {
    const todo = new TodoItem(title, description, dueDate, priority, project, status, number);
    target.projectList.push(todo);
    this.save();
  }

  updateItem(target, title, description, dueDate, priority, project, status) {
    target.title = title;
    target.description = description;
    target.dueDate = dueDate;
    target.priority = priority;
    target.project = project;
    target.status = status;

    this.save();
  }

  completeItem(target) {
    target.status = 'complete';
    this.save();
  }

  checkTime() {
    app.generalProjects.forEach(element => {
      const parsed = parse(element.dueDate, 'yyyy-MM-dd', new Date());
      if (isToday(parsed) === true) element.dueToday = true;
      else if (isPast(parsed) === true) element.outdated = true;
      else {
        element.dueToday = false;
        element.outdated = false;
      }
    });
    app.save();
  }
}

