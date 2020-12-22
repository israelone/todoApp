import { addTask, updateProjectList } from "./methods.js";
import { projects } from "./index.js";

//This create a new Project, it includes its methods and its html code
class Project {
  constructor(name, description, date, priority, numberInList, tasks = []) {
    this.projectName = name;
    this.projectDescription = description;
    this.dueDate = date;
    this.projectPriority = priority;
    this.tasksArray = tasks;
    this.projectNumber = numberInList;    
    this.projectContainer = document.createElement("div");
    this.projectContainer.className = "project";
    this.titleContainer = document.createElement("div");
    this.titleHeader = document.createElement("span");
    this.tasksListContainer = document.createElement("div");
    this.tasksList = document.createElement("ul");

    this.init = function () {
      this.renderHeader();
      this.projectOptions();
      this.renderTasksList();
      this.setPriority(this.projectPriority);
    };

    this.renderHeader = function () {
      const description = document.createElement("p");
      const projectDueDateSpan = document.createElement("span");
      projectDueDateSpan.id = "projectDueDate";
      projectDueDateSpan.innerText = this.dueDate;
      this.titleHeader.innerText = this.projectName;
      this.titleHeader.id = "title";
      description.innerText = this.projectDescription;
      this.titleContainer.classList = "projectTitle";
      this.titleContainer.append(this.titleHeader);
      this.titleContainer.append(description);
      this.titleContainer.append(projectDueDateSpan);
      description.className = "projectDescription";
      this.projectContainer.append(this.titleContainer);
    };

    //Renders tasks belong to this project
    this.renderTasksList = function () {
      const selectPriorityOptions = ["High", "Medium", "Low"];
      const priorityLabel = document.createElement("label");
      const selectPriority = document.createElement("select");
      const statusOptions = ["Yes", "No"];
      const taskStatusInputContainer = document.createElement("div");
      const taskInputContainer = document.createElement("div");
      const taskNameInput = document.createElement("input");
      const addTaskButton = document.createElement("button");
      const taskStatusSpan = document.createElement("span");
      const cancelButton = document.createElement("button");
      const buttonsContainer = document.createElement("div");
      buttonsContainer.id = "buttonsContainer";
      priorityLabel.id = "prioritySelector";
      selectPriority.addEventListener("change", () => {
        this.setPriority(selectPriority.value);
      });
      this.tasksList.id = "tasksList";
      priorityLabel.for = "priority";
      priorityLabel.innerText = "Priority";
      this.tasksListContainer.append(priorityLabel);
      priorityLabel.append(selectPriority);
      priorityLabel.for = "priority";
      for (let i = 0; i < selectPriorityOptions.length; i++) {
        let option = document.createElement("option");
        option.id = selectPriorityOptions[i].toLowerCase() + "Priority";
        option.value = selectPriorityOptions[i];
        option.innerText = selectPriorityOptions[i];
        selectPriority.append(option);
      }
      taskStatusInputContainer.id = "taskStatusInput";
      taskStatusSpan.innerText = "Complete?";
      taskNameInput.placeholder = "TaskName";
      this.tasksListContainer.style.display = "none";
      taskInputContainer.style.display = "none";
      addTaskButton.innerText = "+ Add Task";
      addTaskButton.id = "addTaskButton";
      cancelButton.innerText = "Cancel";
      cancelButton.id = "cancelTaskButton";
      cancelButton.addEventListener("click", () => {
        cancelButton.style.display = "none";
        taskInputContainer.style.display = "none";
      });
      taskStatusInputContainer.append(taskStatusSpan);
      taskInputContainer.id = "taskInputContainer";
      this.tasksListContainer.className = "tasksListContainer";
      this.tasksListContainer.append(this.tasksList);
      this.tasksListContainer.append(taskInputContainer);
      taskInputContainer.append(taskNameInput);
      for (let x = 0; x < statusOptions.length; x++) {
        const taskStatus = document.createElement("input");
        const taskStatusLabel = document.createElement("label");
        taskStatus.type = "radio";
        taskStatus.id = statusOptions[x];
        taskStatus.name = "status";
        taskStatus.value = statusOptions[x];
        taskStatusLabel.innerText = statusOptions[x];
        taskStatusLabel.for = statusOptions[x];
        taskStatusInputContainer.append(taskStatus);
        taskStatusInputContainer.append(taskStatusLabel);
      }
      addTaskButton.addEventListener("click", () => {
        taskNameInput.style.display = "block";
        taskStatusInputContainer.style.display = "block";
        taskInputContainer.style.display = "grid";
        cancelButton.style.display = "inline-block";
        if (taskNameInput.value != "") {
          addTask(
            taskNameInput.value,
            document.querySelector("input[name='status']:checked").value,
            this.tasksArray.length,
            this.projectNumber
          );
          taskNameInput.value = "";
          taskNameInput.style.display = "none";
          taskStatusInputContainer.style.display = "none";
          cancelButton.style.display = "none";
        }
      });
      taskInputContainer.append(taskStatusInputContainer);
      buttonsContainer.append(addTaskButton);
      buttonsContainer.append(cancelButton);
      this.tasksListContainer.append(buttonsContainer);
    };

    //Creates the project options, Delete, Extend (see tasks) and Edit
    this.projectOptions = () => {
      const optionsList = document.createElement("ul");
      optionsList.className = "options";
      const projectOptions = [
        { class: "far fa-trash-alt", name: "Delete" },
        { class: "fas fa-angle-down", name: "Menu" },
        {
          class: "far fa-edit",
          name: "Edit",
        },
      ];
      for (let x = 0; x < projectOptions.length; x++) {
        let option = document.createElement("li");
        let icon = document.createElement("i");
        icon.className = projectOptions[x].class;
        optionsList.append(option);
        option.append(icon);
        icon.addEventListener("click", () => this.projectUpdate(icon));
      }
      this.titleContainer.append(optionsList);
    };

    this.projectUpdate = (icon) => {
      if (
        icon.className == "fas fa-angle-down" ||
        icon.className == "fas fa-angle-down rotate"
      ) {
        this.displayTasks(icon);
      } else if (icon.className == "far fa-trash-alt") {
        this.removeSelf();
      } else {
        this.editText(icon);
      }
    };

    //Toggles Tasks Container from display:grid to display:none and viceversa
    this.displayTasks = (icon) => {
      icon.classList.toggle("rotate");
      if (
        projects[this.projectNumber].tasksListContainer.style.display == "grid"
      ) {
        projects[this.projectNumber].tasksListContainer.style.display = "none";
      } else if (
        projects[this.projectNumber].tasksListContainer.style.display == "none"
      ) {
        projects[this.projectNumber].tasksListContainer.style.display = "grid";
      }
    };

    //When the trash button is pressed, this project is deleted
    this.removeSelf = () => {
      updateProjectList(this.projectNumber);
      this.projectContainer.remove();
    };

    
    this.editText = (icon) => {
      if (icon.className === "far fa-edit") {
        this.titleHeader.contentEditable = true;
        this.titleHeader.nextSibling.contentEditable = true;
        this.titleHeader.nextSibling.nextSibling.contentEditable = true;
        icon.className = "far fa-check-square";
      } else if (icon.className === "far fa-check-square") {
        this.titleHeader.contentEditable = false;
        this.titleHeader.nextSibling.contentEditable = false;
        this.titleHeader.nextSibling.nextSibling.contentEditable = false;
        icon.className = "far fa-edit";
      }
    };

    //Depending on the level of priority each project gets a different color
    this.setPriority = (currentPriority) => {
      if (currentPriority == "High") {
        this.projectContainer.style.backgroundColor = "#F75C03";
      } else if (currentPriority == "Medium") {
        this.projectContainer.style.backgroundColor = "#FFD50C";
      } else {
        this.projectContainer.style.backgroundColor = "#01C8EF";
      }
      this.projectPriority = currentPriority;
    };

    this.init();
  }
}
export { Project };
