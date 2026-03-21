let taskList = document.getElementById("task");
let tasks = [];

document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.getElementById("addTaskBtn");
  addTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let name = document.getElementById("taskInput").value;
    let category = document.getElementById("category").value;
    let deadline = document.getElementById("deadline").value;
    let status = document.getElementById("status").value;
    if (name && category && deadline && status) {
      let task = {
        name: name,
        category: category,
        deadline: deadline,
        status: status,
      };
      tasks.push(task);
      document.getElementById("taskInput").value = "";
      document.getElementById("category").value = "";
      document.getElementById("deadline").value = "";
      renderTask();
      // console.log(tasks);
    } else {
      alert("Please fill out the fields");
    }
  });
});

function renderTask() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let li = document.createElement("li");
    li.innerText = `Name: ${task.name}, Category: ${task.category}, Deadline: ${task.deadline}, Status: ${task.status}`;
    taskList.append(li);
  }
}
