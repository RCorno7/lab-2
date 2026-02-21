//Task maker
// Instructions say that Update and Delete wll need a parameter
document.addEventListener("DOMContentLoaded", readTasks);
document.getElementById("task-form").addEventListener("submit", createTask);

class Task {
    constructor({ text, date, done, id}) {
        this.text = text
        this.date = date
        this.done = done
        this.id = id;
    }

    toHTML() {
        //Defend against basic XXS because this is a cyber class
        const formattedInput = escapeHTML(this.text);
        //similar layout to HTML doc
        return `
        <li>
        <input type="checkbox" id="${this.id}" ${this.done ? "checked" : ""} 
        onchange="updateTask(${this.id})"> 
        <label for="${this.id}" class="task-label">${formattedInput}</label>
        <span class="right-align">${this.prettyDate()}</span>
        <button type="button" class="material-icons" onclick="deleteTask(${this.id})">delete</button>
        </li>
        `
    }

    prettyDate() {
        const date_str = new Date(this.date)
        return date_str.toLocaleDateString("en-US", {month: "2-digit", day: "2-digit", year: "numeric"})
    }

    toggle() {
        this.done = !this.done
    }
}

function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
}

function updateStorage(id) {
    let updateStr = localStorage.getItem("tasks");
    let stored;
    if(updateStr !== null){
        stored = JSON.parse(updateStr);
    }
    else{
        stored = [];
    }

    stored = stored.map(t => {
        if (t.id === id) t.done = !t.done;
        return t;
    });
    localStorage.setItem("tasks", JSON.stringify(stored));
    readTasks();
}

function createTask(e) {

    e.preventDefault();

    const text = document.getElementById("text").value.trim();
    if (text.length > 25) {
        alert("Task name is restricted to a max of 25 characters.");
        return;
    }

    const date = document.getElementById("date").value;
    if (!text || !date) return; // don’t allow empty tasks

    const newTask = new Task({
        text,
        date,
        done: false,
        id: Date.now()
    });

    let taskStr = localStorage.getItem("tasks");
    let stored;

    if (taskStr !== null) {
        stored = JSON.parse(taskStr);
    } 
    else {
        stored = [];
    }

    const dupli = stored.some(task => task.text === text);
    if (dupli){
        alert("Task already exists");
        return;
    }

    stored.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(stored));

    readTasks();
}

function readTasks() {
    const taskList = document.querySelector(".checkboxes ul");
    taskList.innerHTML = ""; 

    let read_tasks = localStorage.getItem("tasks")
    let stored;
    if (read_tasks !== null) {
        stored = JSON.parse(read_tasks);
    } 
    else {
        stored = [];
    }

    if (stored.length === 0) {
        taskList.innerHTML = `
            <li>
              <label class="task-label">[+] Add a Task!</label>
            </li>`;
        return;
    }

  //update
  let tasks = stored.map(task => new Task(task));

  //Apparently this is still XSS risky
  for (let task of tasks) {taskList.insertAdjacentHTML("beforeend", task.toHTML());}
}

function updateTask(id) {
    updateStorage(id)
    readTasks()
}

function deleteTask(id) {
    //Grabbing storage info
    let storedData = localStorage.getItem("tasks")
    let stored;
    if (storedData) {
        stored = JSON.parse(storedData);
    } 
    else {
        stored = [];
    }
    //delete part
    stored = stored.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(stored));
    readTasks();
}

// Extra credit (?)

const checkbox = document.getElementById("Sort-by-date");
const checkbox2 = document.getElementById("Filter-completed-tasks");

function sortDate() {
    if (!checkbox.checked) {
        readTasks();
        return;
    }
    else{
        // Sort by date
    }
}

function sortTask() {
    if (!checkbox.checked) {
        readTasks();
        return;
    }
    else{
    }
}