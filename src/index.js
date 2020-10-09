import {Project} from "./createProject.js";

let projects = [];
const contentContainer = document.getElementById("content");
const projectsList = document.createElement("div");

const tableElements = () =>{
  const table = document.createElement("div");
  const header = document.createElement("div");
  const headerName = document.createElement("h3");
  const addProjectButton = document.createElement("button");
  
  table.id = "table";
  header.id = "header";
  projectsList.id = "projects";
  addProjectButton.id = "addProject";
  addProjectButton.innerText = "+";
  headerName.innerText = "Projects";
  addProjectButton.onclick = function(){
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("table").classList.toggle("blurred");
  }
  
  table.append(header);
  table.append(projectsList);
  header.append(headerName);
  header.append(addProjectButton);
  
  contentContainer.append(table);
  console.log(contentContainer);
}


projects.push(new Project("Learn React", "Continue TOP Curriculum"));
projects.push(new Project("Learn Angular"));



const addProjectForm = () => {
  const formContainer = document.createElement("div");
  const form = document.createElement("form");
  const formTitle = document.createElement("h2");
  const submitButton = document.createElement("button");
  const priorityLabel = document.createElement("label");
  const select = document.createElement("select");
  const cancelButton = document.createElement("button");
  const labels = [
    { for: "name", placeholder: "Project Name", type: "text", name: "pname" },
    { for: "pdescription", placeholder: "Project Description", type: "text", name: "pdescription" },
    { for: "duedate", placeholder:"Due Date", type: "date", name: "duedate" }
  ];
  const selectOptions = ["High", "Medium", "Low"];
  cancelButton.innerText = "X";
  cancelButton.id = "cancelButton"
  formContainer.id = "formContainer";
  submitButton.type = "button";
  submitButton.innerText = "Add";
  submitButton.value = "Add Project";
  submitButton.onclick = function(){
    addProject(form);
  }
  cancelButton.onclick = function(){
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("table").classList.toggle("blurred");
  }
  formTitle.innerText = "Add Project";
  formContainer.append(form);
  form.append(formTitle);
  for(let x = 0; x < labels.length; x++){
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
  form.append(priorityLabel)
  select.name = "priority";
  select.id = "priority";
  priorityLabel.append(select);
  for(let i = 0; i < selectOptions.length; i++){
    let option = document.createElement("option");
    option.value = selectOptions[i];
    option.innerText = selectOptions[i];
    select.append(option);
  }
  form.append(submitButton);
  form.append(cancelButton);
  contentContainer.append(formContainer);
};

// projectsList.append(addProjectForm());

function addProject(project) {
  document.getElementById("table").classList.toggle("blurred");
  document.getElementById("formContainer").style.display = "none";
 projects.push(new Project(project.childNodes[1].childNodes[0].value, project.childNodes[2].childNodes[0].value));
 renderProjects();
}

const renderProjects = () =>{
  projectsList.innerHTML = "";
  for(let x = 0; x < projects.length; x++){    
    projectsList.append(projects[x].htmlDom())
  }
}


tableElements();
renderProjects();
addProjectForm();
export {tableElements};

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible
// collapsible menu
