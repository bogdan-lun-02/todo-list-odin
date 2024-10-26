import { Project } from "./project";
import { TodoItem } from "./todoitem";

export class TodoApp {
  constructor() {
  }

  allProjects = [];
  number = 0;
  projectNumber = 0;

  addProject(title, number) {
    const project = new Project(title, number);
    this.allProjects.push(project);
    console.log(this.allProjects);
    return project;
  }

  // getProjects() {
  //   this.allProjects = [];
  //   for (let i = 0; i < localStorage.length; i++) {
  //     let key = localStorage.key(i);
  //     let project = JSON.parse(localStorage.getItem(key));
  //     this.allProjects.push(project);
  //   }
  // }
}

