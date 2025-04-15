class TaskModel {
    constructor() {
      this.tasks = [];
    }
  
    addTask(taskText) {
      if (taskText.trim() !== "") {
        this.tasks.push({ text: taskText });
      }
    }
  
    getTasks() {
      return this.tasks;
    }
  }
  
  const model = new TaskModel();
  