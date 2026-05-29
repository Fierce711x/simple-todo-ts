import { useState, type ChangeEvent } from "react";
import "./style.css";
type Task = {
  task: string;
  checked: boolean;
};
const tasksCache: Task[] = JSON.parse(localStorage.getItem("tasks") ?? "[]");
function App(): React.ReactNode {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>(tasksCache);
  const addTask = () => {
    if (!input) return;
    const newTasks: Task[] = [...tasks, { task: input, checked: false }];
    setTasks(newTasks);
    setInput("");
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  return (
    <>
      <div id="app">
        <h1>Tasks</h1>
        <div className="task-input">
          <div>
            <input
              type="text"
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInput(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
            />
          </div>
          <button className="add-task" onClick={addTask}>
            Add Task
          </button>
        </div>
        <div className="tasks">
          {tasks.map((taskDetails: Task) => (
            <div className="task" key={taskDetails.task}>
              <span>{taskDetails.task}</span>
              <div className="delete-checkbox">
                <input
                  type="checkbox"
                  checked={taskDetails.checked}
                  onChange={(e) => {
                    const newTasks: Task[] = tasks.map((task) =>
                      task.task === taskDetails.task
                        ? { ...task, checked: e.target.checked }
                        : task,
                    );
                    setTasks(newTasks);
                    localStorage.setItem("tasks", JSON.stringify(newTasks));
                  }}
                />
                <button
                  onClick={() => {
                    const newTasks: Task[] = tasks.filter(
                      (task) => task.task !== taskDetails.task,
                    );
                    setTasks(newTasks);
                    localStorage.setItem("tasks", JSON.stringify(newTasks));
                  }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default App;
