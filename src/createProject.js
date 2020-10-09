import {addTask} from "./methods.js";

const Project = function (name, description, date, priority, numberInList) {
    let taskList = [];
    const tasksList = document.createElement("ul");
    const tasksListContainer = document.createElement("div");
  
    const htmlDom = () => {
      const projectTitleContainer = document.createElement("div");
      const projectContainer = document.createElement("div");
      const projectTitle = document.createElement("span");
      const projectOptions = [
        { class: "far fa-trash-alt", name: "Delete" },
        { class: "fas fa-angle-down", name: "Menu" },
        {
          class: "far fa-edit",
          name: "Edit",
        },
      ];
      const optionsList = document.createElement("ul");
      const taskNameInput = document.createElement("input");
      const addTaskButton = document.createElement("button");
      const taskInputContainer = document.createElement("div");
      const projectDescription = document.createElement("p");
      const projectOptionsContainer = document.createElement("div");
      projectDescription.innerText = description;
      optionsList.className = "options";
      addTaskButton.innerText = "+ Add Task";
      addTaskButton.id = "addTask";
      tasksList.id = "tasksList";
      taskNameInput.placeholder = "Task Name";
      projectContainer.className = "project";
      projectTitle.innerText = name;
      projectTitleContainer.className = "projectTitle";
      projectOptionsContainer.className = "projectOptions";
      projectDescription.className = "projectDescription";
      taskInputContainer.id = "taskInputContainer";
      taskNameInput.style.display = "none";
      tasksListContainer.style.display = "none";
      taskInputContainer.style.display = "none";
      tasksListContainer.className = "tasksListContainer";
      projectContainer.append(projectTitleContainer);
      projectTitleContainer.append(projectTitle);
      projectTitleContainer.append(projectDescription);
      projectOptionsContainer.append(optionsList);
      tasksListContainer.append(tasksList);
      tasksListContainer.append(taskInputContainer);
      taskInputContainer.append(taskNameInput);
      taskInputContainer.append(addTaskButton);
      projectContainer.append(projectOptionsContainer);
      projectContainer.append(tasksListContainer);
      // projectContainer.append(taskInputContainer);
  
      addTaskButton.addEventListener("click", function () {
        addTask(taskNameInput);
      });
      for (let x = 0; x < projectOptions.length; x++) {
        let option = document.createElement("li");
        let icon = document.createElement("i");
        icon.className = projectOptions[x].class;
        optionsList.append(option);
        option.append(icon);
        icon.addEventListener("click", function () {
          console.log(this);
          if (this.className === "far fa-trash-alt") {
            projectContainer.remove();
          } else if (this.className === "fas fa-angle-down") {
            if (tasksListContainer.style.display === "none") {
              tasksListContainer.style.display = "block";
              taskInputContainer.style.display = "grid";
            } else {
              tasksListContainer.style.display = "none";
              taskInputContainer.style.display = "none";
            }
            projectContainer.classList.toggle("active");
          } else if (this.className === "far fa-edit") {
            projectTitle.contentEditable = true;
            this.className = "far fa-check-square";
          } else if (this.className === "far fa-check-square") {
            projectTitle.contentEditable = false;
            this.className = "far fa-edit";
          }
        });
      }
  
      return projectContainer;
    };
  
    const renderTasks = () => {
      for (let x = 0; x < taskList.length; x++) {
        let checkBox = document.createElement("input");
        let taskItem = document.createElement("li");
        let text = document.createElement("span");
        let optionsList = document.createElement("ul");
        let options = ["far fa-edit", "far fa-trash-alt"];
        let taskNumber = taskList.length - 1;
        checkBox.setAttribute("type", "checkbox");
        checkBox.onclick = function () {
          updateText(text);
        };
        optionsList.className = "taskOptions";
        text.innerText = taskList[x];
        taskItem.className = "task";
        taskItem.append(checkBox);
        taskItem.append(text);
        taskItem.append(optionsList);
        tasksList.append(taskItem);
        for (let i = 0; i < options.length; i++) {
          let option = document.createElement("li");
          let icon = document.createElement("i");
          icon.className = options[i];
          option.append(icon);
          optionsList.append(option);
          icon.addEventListener("click", function () {
            console.log(icon.parentNode);
            if (this.className == "far fa-trash-alt") {
              console.log(tasksList.childNodes);
              optionsList.parentNode.remove();
              // taskList.splice(taskNumber, 1);
            } else if (this.className == "far fa-edit") {
              text.contentEditable = true;
              this.className = "far fa-check-square";
            } else if (this.className == "far fa-check-square") {
              text.contentEditable = false;
              this.className = "far fa-edit";
            }
          });
        }
      }
    };
  
    const addTask = (input) => {
      input.style.display = "block";
      if (input.value != "") {
        taskList.push(input.value);
        tasksList.innerHTML = "";
        renderTasks();
        input.value = "";
        input.style.display = "none";
      }
    };
  
    const updateText = (text) => {
      text.classList.toggle("done");
      console.log("checked");
    };
    renderTasks();
    return { htmlDom };
  };
  
export {Project};