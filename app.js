const taskList = document.getElementById("taskList");
let tasks = [];
let taskId = 0;
const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", function () {
  let name = document.getElementById("taskInput").value;
  let category = document.getElementById("category").value;
  let deadline = document.getElementById("deadline").value;
  let status = document.getElementById("status").value;

  if (name && category && deadline && status) {
    taskId++;
    let task = {
      id: taskId,
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
    console.log(tasks);
  } else {
    alert("Please fill out the fields");
  }
});

function renderTask() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let today = new Date();
    let taskDate = new Date(task.deadline);
    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);
    // console.log(today);
    // console.log(taskDate);
    if (today > taskDate && task.status !== "Completed") {
      task.status = "Overdue";
    }

    const li = document.createElement("li");
    li.innerHTML = `<strong>Name:</strong> ${task.name} | <strong>Category:</strong> ${task.category} | <strong>Deadline:</strong> ${task.deadline} | <strong>Status:</strong> `;

    const select = document.createElement("select");
    select.innerHTML = `
    <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
    <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
    <option value="Overdue" ${task.status === "Overdue" ? "selected" : ""}>Overdue</option>`;

    select.classList.add("task_select_status");
    select.dataset.taskId = task.id;
    li.append(select);
    taskList.append(li);
    setSelectColor(select, task.status);
  }
  addSelectListeners();
}

function addSelectListeners() {
  const selects = document.querySelectorAll(".task_select_status");
  for (let i = 0; i < selects.length; i++) {
    selects[i].addEventListener("change", function () {
      const newStatus = this.value;
      const taskUpdate = tasks.find(
        (t) => t.id === parseInt(this.dataset.taskId),
      );
      if (taskUpdate) {
        taskUpdate.status = newStatus;
        // console.log(`Task ${taskId} updated to ${newStatus}`);
      }
      setSelectColor(this, newStatus);
    });
  }
}

function setSelectColor(select, status) {
  if (status === "In Progress") {
    select.style.backgroundColor = "blue";
  } else if (status === "Completed") {
    select.style.backgroundColor = "green";
    console.log("CHANGED", this.value);
  } else if (status === "Overdue") {
    select.style.backgroundColor = "red";
  }
}
