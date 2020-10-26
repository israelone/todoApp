import { Project } from "./createProject.js";
import { renderTasks } from "./methods.js";

const content = document.getElementById("content");
const table = document.createElement("div");
const formContainer = document.createElement("div");
const projectsListContainer = document.createElement("div");
const projects = [];

projects.push(
  new Project(
    "Learn Vue.js",
    "Find course on Udemy",
    "2020-11-28",
    "High",
    projects.length,
    [
      { taskName: "Read Documentation", taskNumber: 0, taskStatus: "Yes" },
      { taskName: "Setup", taskNumber: 1, taskStatus: "No" },
      {
        taskName: "Implementation",
        taskNumber: 2,
        taskStatus: "No",
      },
    ]
  )
);

projects.push(
  new Project(
    "Learn React",
    "Continue TOP Curriculum",
    "2020-11-28",
    "Low",
    projects.length,
    [
      { taskName: "Read Documentation", taskNumber: 0, taskStatus: "No" },
      { taskName: "Setup", taskNumber: 1, taskStatus: "No" },
      {
        taskName: "Implementation",
        taskNumber: 2,
        taskStatus: "No",
      },
    ]
  )
);

const tableBuilder = () => {
  const headerContainer = document.createElement("div");
  const headerTitle = document.createElement("h3");
  const addProjectButton = document.createElement("button");
  table.id = "table";
  headerContainer.id = "headerContainer";
  addProjectButton.id = "addProjectButton";
  addProjectButton.innerText = "+";
  headerTitle.innerText = "Projects";
  addProjectButton.onclick = function () {
    formContainer.style.display = "block";
    document.getElementById("table").classList.toggle("blurred");
  };
  table.append(headerContainer);
  projectsListContainer.id = "projectsContainer";
  table.append(projectsListContainer);
  headerContainer.append(headerTitle);
  headerContainer.append(addProjectButton);
  content.append(table);
};

const addProjectForm = () => {
  const form = document.createElement("form");
  const formHeader = document.createElement("h2");
  const submitButton = document.createElement("button");
  const priorityLabel = document.createElement("label");
  const selectPriority = document.createElement("select");
  const cancelButton = document.createElement("i");
  const labels = [
    { for: "name", placeholder: "Project Name", type: "text", name: "pname" },
    {
      for: "pdescription",
      placeholder: "Project Description",
      type: "text",
      name: "pdescription",
    },
    { for: "duedate", placeholder: "Due Date", type: "date", name: "duedate" },
  ];
  const selectPriorityOptions = ["High", "Medium", "Low"];
  cancelButton.id = "cancelButton";
  cancelButton.className = "far fa-times-circle";
  formContainer.id = "formContainer";
  submitButton.type = "button";
  submitButton.id = "addProject";
  submitButton.innerText = "Add";
  submitButton.value = "Add Project";
  submitButton.onclick = () => {
    addProject(form);
  };
  cancelButton.onclick = () => {
    formContainer.style.display = "none";
    document.getElementById("table").classList.toggle("blurred");
  };
  formHeader.innerText = "Add Project";
  formContainer.append(form);
  form.append(formHeader);
  for (let x = 0; x < labels.length; x++) {
    let label = document.createElement("label");
    let input = document.createElement("input");
    label.for = labels[x].for;
    input.placeholder = labels[x].placeholder;
    input.type = labels[x].type;
    input.name = labels[x].name;
    label.append(input);
    form.append(label);
  }
  priorityLabel.for = "priority";
  form.append(priorityLabel);
  selectPriority.name = "priority";
  selectPriority.id = "priority";
  priorityLabel.append(selectPriority);
  for (let i = 0; i < selectPriorityOptions.length; i++) {
    let option = document.createElement("option");
    option.id = selectPriorityOptions[i].toLowerCase() + "Priority";
    option.value = selectPriorityOptions[i];
    option.innerText = selectPriorityOptions[i];
    selectPriority.append(option);
  }
  form.append(submitButton);
  form.append(cancelButton);
  content.append(formContainer);
};

tableBuilder();
addProjectForm();

const addProject = (projectInfo) => {
  document.getElementById("table").classList.toggle("blurred");
  document.getElementById("formContainer").style.display = "none";
  projects.push(
    new Project(
      projectInfo.childNodes[1].childNodes[0].value,
      projectInfo.childNodes[2].childNodes[0].value,
      projectInfo.childNodes[3].childNodes[0].value,
      projectInfo.childNodes[4].childNodes[0].value,
      projects.length
    )
  );
  renderProjects();
};

const renderProjects = () => {
  projectsListContainer.innerHTML = "";
  projects[projects.length - 2].projectContainer.classList.remove("lastProject");
  projects[projects.length - 2].projectContainer.classList.remove("lastProject");
  for (let x = 0; x < projects.length; x++) {
    projectsListContainer.append(projects[x].projectContainer);
    projectsListContainer.append(projects[x].tasksListContainer);
    renderTasks(x);
  }
  projects[projects.length - 1].projectContainer.classList.add("lastProject");
  projects[projects.length - 1].projectContainer.classList.add("lastProject");
};

renderProjects();

export { projects };
