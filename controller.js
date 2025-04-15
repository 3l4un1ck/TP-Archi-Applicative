class TaskController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.view.renderForm(this.handleAddTask.bind(this));
      this.view.renderTasks(this.model.getTasks());
    }
  
    handleAddTask(taskText) {
      this.model.addTask(taskText);
      this.view.renderTasks(this.model.getTasks());
    }
    
  }
  
  const controller = new TaskController(model, view);
  