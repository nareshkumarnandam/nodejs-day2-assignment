const fs = require("node:fs");
const { dirname } = require("node:path");
const path = require("path");
const readline = require("readline");

const todoFilePath = path.join(__dirname, "todo.txt");
const tasks = "1. Complete dsa,\n2. Complete oops\n";

function createTodoFile() {
  fs.writeFile(todoFilePath, "Tasks:" + "\n\n" + tasks, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File created successfully!");
  });
}

fs.access(todoFilePath, fs.constants.F_OK, (err) => {
  if (err) {
    createTodoFile();
  } else {
    console.log("File already exists!!");
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function addTask(task) {
  fs.appendFile(todoFilePath, task + "\n", (err) => {
    if (err) throw err;
    console.log("Task added successfully!");
    rl.close();
  });
}

rl.question("Enter the task: ", (task) => {
  addTask(task);
});

function viewTasks() {
  fs.readFile(todoFilePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Tasks:\n");
    console.log(data);
    // rl.close();
  });
}

viewTasks();

function taskComplete(taskIndex) {
  fs.readFile(todoFilePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const tasks = data.split("\n");
    if (taskIndex < 0 || taskIndex >= tasks.length) {
      console.log("Invalid task index");
      rl.close();
      return;
    }
    tasks[taskIndex] = "[x] " + tasks[taskIndex];
    fs.writeFile(todoFilePath, tasks.join("\n"), (err) => {
      if (err) {
        console.error("Error marking task as complete:", err);
        return;
      }
      console.log("Task marked as complete!");
      rl.close();
    });
  });
}
rl.question("Enter the index of the task to mark as complete: ", (index) => {
  taskComplete(parseInt(index));
});


function taskDelete(taskIndex) {
    fs.readFile(todoFilePath, {encoding: 'utf-8'}, (err,data)=>{
        if(err){
            console.error(err);
            return;
        }
        let tasks = data.split('\n');
        if(taskIndex < 0 || taskIndex >= tasks.length){
            console.error(err);
            rl.close();
            return;
        }
        tasks.splice(taskIndex, 1);
        fs.writeFile(todoFilePath, tasks.join('\n') , (err)=>{
            if(err){
                console.error(err);
                rl.close();
                return;
            }
            console.log("Task removed successfully!!");
            rl.close();
        })
    })

}

rl.question("Enter the index number of the task to be deleted: ", (index)=>{
    taskDelete(parseInt(index));
})