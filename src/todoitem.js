export class TodoItem {
  constructor(title, description, dueDate, priority, project, status, number) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.status = status;
    this.number = number
  }

  update(title, description, dueDate, priority, project, status) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.status = status;
  }

  complete() {
    this.status = 'complete'
  }
}