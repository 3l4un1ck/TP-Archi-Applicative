class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentFilter = "all";

    this.view.renderForm(this.handleAddTask.bind(this));
    this.view.renderFilter(this.handleFilterChange.bind(this));
    this.renderTaskList();
  }

  handleAddTask(text, category) {
    const task = new AdvancedTask(text, category);
    this.model.addTask(task);
    this.renderTaskList();
  }

  handleDeleteTask(taskId) {
    const confirmation = confirm("Es-tu sûr de vouloir supprimer cette tâche ?");
    if (confirmation) {
      this.model.deleteTask(taskId);
      this.renderTaskList();
    }
  }

  handleEditTask(id, newText) {
    this.model.updateTask(id, newText);
    this.renderTaskList();
  }

  handleFilterChange(category) {
    this.currentFilter = category;
    this.renderTaskList();
  }

  renderTaskList() {
    const tasks = this.model.getTasks(this.currentFilter);
    this.view.renderTasks(tasks, this.handleDeleteTask.bind(this), this.handleEditTask.bind(this));
  }
}

const controller = new TaskController(model, view);
