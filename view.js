class TaskRenderer {
  render(task, onDelete, onEdit) {
    throw new Error("Méthode abstraite non implémentée");
  }

  createBaseElement(task, color, onDelete, onEdit) {
    const row = document.createElement("tr");

    // Couleur
    const colorCell = document.createElement("td");
    const colorBox = document.createElement("span");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = color;
    colorCell.appendChild(colorBox);

    // Label
    const labelCell = document.createElement("td");
    labelCell.textContent = task.text;

    // Catégorie
    const categoryCell = document.createElement("td");
    categoryCell.textContent = task.category;

    // Actions
    const actionsCell = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
      const newText = prompt("Modifier la tâche :", task.text);
      if (newText !== null && newText.trim() !== "") {
        onEdit(task.id, newText.trim());
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = () => {
      if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
        onDelete(task.id);
      }
    };

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);

    // Ajout au tableau
    row.appendChild(colorCell);
    row.appendChild(labelCell);
    row.appendChild(categoryCell);
    row.appendChild(actionsCell);

    return row;
  }
}

class TravailRenderer extends TaskRenderer {
  render(task, onDelete, onEdit) {
    return this.createBaseElement(task, "red", onDelete, onEdit);
  }
}

class MaisonRenderer extends TaskRenderer {
  render(task, onDelete, onEdit) {
    return this.createBaseElement(task, "blue", onDelete, onEdit);
  }
}

class DiversRenderer extends TaskRenderer {
  render(task, onDelete, onEdit) {
    return this.createBaseElement(task, "green", onDelete, onEdit);
  }
}

class TaskView {
  constructor() {
    this.taskListElement = document.getElementById("task-list");
    this.taskFormContainer = document.getElementById("task-form");
    this.filterContainer = document.getElementById("category-filter");

    this.renderers = {
      travail: new TravailRenderer(),
      maison: new MaisonRenderer(),
      divers: new DiversRenderer(),
    };
  }

  renderTasks(tasks, onDelete, onEdit) {
    this.taskListElement.innerHTML = "";
    tasks.forEach(task => {
      const renderer = this.renderers[task.category];
      const li = renderer.render(task, onDelete, onEdit);
      this.taskListElement.appendChild(li);
    });
  }

  renderForm(onSubmit) {
    const form = document.createElement("form");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nouvelle tâche";

    const select = document.createElement("select");
    ["travail", "maison", "divers"].forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      select.appendChild(option);
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Ajouter";

    form.appendChild(input);
    form.appendChild(select);
    form.appendChild(button);
    this.taskFormContainer.appendChild(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      const category = select.value;
      if (text) {
        onSubmit(text, category);
        input.value = "";
      }
    });
  }

  renderFilter(onFilterChange) {
    const select = document.createElement("select");

    ["all", "travail", "maison", "divers"].forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat === "all" ? "Toutes les catégories" : cat;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      onFilterChange(select.value);
    });

    this.filterContainer.appendChild(select);
  }
}

const view = new TaskView();
