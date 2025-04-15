class TaskView {
    constructor() {
      this.taskListElement = document.getElementById("task-list");
      this.taskFormContainer = document.getElementById("task-form");
    }
  
    renderTasks(tasks) {
      this.taskListElement.innerHTML = "";
      tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        this.taskListElement.appendChild(li);
      });
    }
  
    renderForm(onSubmit) {
      const form = document.createElement("form");
  
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Nouvelle tâche";
  
      const button = document.createElement("button");
      button.type = "submit";
      button.textContent = "Ajouter";
  
      form.appendChild(input);
      form.appendChild(button);
      this.taskFormContainer.appendChild(form);
  
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = input.value;
        if (value) {
          onSubmit(value);
          input.value = "";
        }
      });
    }
  }
  
  const view = new TaskView();
  