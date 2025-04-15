class Task {
  constructor(text) {
    this.text = text;
  }
}

class AdvancedTask extends Task {
  constructor(text, category) {
    super(text);
    this.category = category;
    this.id = Date.now();
  }
}

class TaskModel {
  constructor() {
    if (TaskModel.instance) return TaskModel.instance;

    const saved = localStorage.getItem("tasks");
    this.tasks = saved ? JSON.parse(saved) : [];

    TaskModel.instance = this;
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask(task) {
    this.tasks.push(task);
    this.save();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  updateTask(id, newText) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.text = newText;
    this.save();
  }

  getTasks(category = "all") {
    return category === "all" ? this.tasks : this.tasks.filter(t => t.category === category);
  }
}

const model = new TaskModel();
