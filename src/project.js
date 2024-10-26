import { TodoItem } from "./todoitem";

export class Project {
  constructor(title, number) {
    this.title = title;
    this.projectNumber = number;
  }

  projectList = [];
}

