import { app } from ".";
import { Project } from "./project";
import { TodoItem } from "./todoitem";

export class TodoApp {
  constructor() {
  }

  allProjects = JSON.parse(localStorage.getItem('allProjects')) || [];
  number = parseInt(localStorage.getItem("number")) || 0;
  projectNumber = parseInt(localStorage.getItem("projectNumber")) || 0;


  // firstLoad() {
  //   if (!localStorage["alertdisplayed"]) {
  //     app.addProject('Default', ++app.projectNumber);
  //     localStorage.setItem("projectNumber", this.projectNumber);
  //     localStorage.setItem("alertdisplayed", true)
  //   }
  // }

  save() {
    localStorage.setItem('allProjects', JSON.stringify(this.allProjects));
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
}

