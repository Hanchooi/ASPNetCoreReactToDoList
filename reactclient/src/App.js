import React, { useState } from "react";
import Constants from "./utilities/Constants";
import TaskCreateForm from "./components/TaskCreateForm";
import TaskUpdateForm from "./components/TaskUpdateForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showingCreateNewTaskForm, setShowingCreateNewTaskForm] = useState(false);
  const [taskCurrentlyBeingUpdated, setTaskCurrentlyBeingUpdated] = useState(null);

  function getTasks() {
    const url = Constants.API_URL_GET_ALL_TASKS;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(TasksFromServer => {
        setTasks(TasksFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deleteTask(taskId) {
    const url = `${Constants.API_URL_DELETE_TASK_BY_ID}/${taskId}`;
    console.log("BEFORE FETCH");

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log("GOT RESPONSE");
        console.log(responseFromServer);
        onTaskDeleted(taskId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewTaskForm === false && taskCurrentlyBeingUpdated === null) && (
            <div>
              <h1>ASP.NET Core React To Do List</h1>

              <div className="mt-5">
                <button onClick={getTasks} className="btn btn-dark btn-lg w-100">Get Tasks from server</button>
                <button onClick={() => setShowingCreateNewTaskForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Create New Task</button>
              </div>
            </div>
          )}

          {(tasks.length > 0 && showingCreateNewTaskForm === false && taskCurrentlyBeingUpdated === null) && renderTasksTable()}

          {showingCreateNewTaskForm && <TaskCreateForm onTaskCreated={onTaskCreated} />}

          {taskCurrentlyBeingUpdated !== null && <TaskUpdateForm task={taskCurrentlyBeingUpdated} onTaskUpdated={onTaskUpdated} />}
        </div>
      </div>
    </div>
  );

  function renderTasksTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">TaskId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.taskId}>
                <th scope="row">{task.taskId}</th>
                <td>{task.title}</td>
                <td>{task.content}</td>
                <td>
                  <button onClick={() => setTaskCurrentlyBeingUpdated(task)} className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button onClick={() => { if(window.confirm(`Are you sure you want to delete the Task titled "${task.title}"?`)) deleteTask(task.taskId) }} className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => setTasks([])} className="btn btn-dark btn-lg w-100">Empty React Tasks array</button>
      </div>
    );
  }

  function onTaskCreated(createdTask) {
    setShowingCreateNewTaskForm(false);

    if (createdTask === null) {
      return;
    }

    alert(`Task successfully created. After clicking OK, your new Task tilted "${createdTask.title}" will show up in the table below.`);

    getTasks();
  }

  function onTaskUpdated(updatedTask) {
    setTaskCurrentlyBeingUpdated(null);

    if (updatedTask === null) {
      return;
    }

    let tasksCopy = [...tasks];

    const index = tasksCopy.findIndex((tasksCopyTask, currentIndex) => {
      if (tasksCopyTask.taskId === updatedTask.taskId) {
        return true;
      }
    });

    if (index !== -1) {
      tasksCopy[index] = updatedTask;
    }

    setTasks(tasksCopy);

    alert(`Task successfully updated. After clicking OK, look for the Task with the title "${updatedTask.title}" in the table below to see the updates.`);
  }

  function onTaskDeleted(deletedTaskTaskId) {
    let tasksCopy = [...tasks];

    const index = tasksCopy.findIndex((tasksCopyTask, currentIndex) => {
      if (tasksCopyTask.taskId === deletedTaskTaskId) {
        return true;
      }
    });

    if (index !== -1) {
      tasksCopy.splice(index, 1);
    }

    setTasks(tasksCopy);

    alert('Task successfully deleted. After clicking OK, look at the table below to see your Task disappear.');
  }
}
