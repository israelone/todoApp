import { projects } from "./index.js";

const addTask = (name, status, number, project) => {
  projects[project].tasksArray.push(new Task(name, status, number));
  projects[project].tasksList.innerHTML = "";
  renderTasks(project);
};

const renderTasks = (project) => {
  let projectTaskArray = projects[project].tasksArray;
  if (projects[project].tasksList.innerHTML == "") {
    for (let x = 0; x < projectTaskArray.length; x++) {
      let checkBox = document.createElement("input");
      let taskItem = document.createElement("li");
      let text = document.createElement("span");
      let optionsList = document.createElement("ul");
      let options = ["far fa-edit", "far fa-trash-alt"];
      let taskNumber = projectTaskArray[x].taskNumber;
      if (projectTaskArray[x].taskStatus === "Yes") {
        updateText(text);
        checkBox.checked = "true";
      }
      checkBox.setAttribute("type", "checkbox");
      checkBox.onclick = function () {
        updateText(text);
      };
      optionsList.className = "taskOptions";
      text.innerText = projectTaskArray[x].taskName;
      taskItem.className = "task";
      taskItem.append(checkBox);
      taskItem.append(text);
      taskItem.append(optionsList);
      projects[project].tasksList.append(taskItem);
      for (let i = 0; i < options.length; i++) {
        let option = document.createElement("li");
        let icon = document.createElement("i");
        icon.className = options[i];
        option.append(icon);
        optionsList.append(option);
        icon.addEventListener("click", function () {
          updateTaskArray(taskItem, icon, taskNumber, projectTaskArray);
        });
      }
    }
  }
};

const updateText = (text) => {
  text.classList.toggle("done");
};

const updateProjectList = (projectNumber) => {
  for (let x = projectNumber; x < projects.length; x++) {
    projects[x].projectNumber = projects[x].projectNumber - 1;
  }
  projects.splice(projectNumber, 1);
};

class Task {
  constructor(name, status, number) {
    this.taskName = name;
    this.taskStatus = status;
    this.taskNumber = number;
  }
}

const updateTaskArray = (item, icon, taskNumber, tasksArray) => {
  if (icon.className == "far fa-trash-alt") {
    item.remove();
    for (let x = taskNumber; x < tasksArray.length; x++) {
      tasksArray[x].taskNumber = tasksArray[x].taskNumber - 1;
    }
    tasksArray.splice(taskNumber, 1);
  } else if (icon.className == "far fa-edit") {
    item.childNodes[1].contentEditable = true;
    icon.className = "far fa-check-square";
  } else if (icon.className == "far fa-check-square") {
    item.childNodes[1].contentEditable = false;
    icon.className = "far fa-edit";
  }
};

export { addTask, renderTasks, updateProjectList };
