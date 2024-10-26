import { TodoItem } from "./todoitem";

export class Project {
  constructor(title, number) {
    this.title = title;
    this.projectNumber = number;
  }

  projectList = [];

  addItem(title, description, dueDate, priority, project, status, number) {
    const todo = new TodoItem(title, description, dueDate, priority, project, status, number);
    this.projectList.push(todo);
  }

  update(title) {
    this.title = title;
  }
}

