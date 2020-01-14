import React from "react";

interface Task {
  taskId: string | null;
  task: {
    title: string;
    date: Date;
    complete: boolean;
    detail: string;
  }
}

interface Props {
  key: string,
  taskData: Task,
  modalSet: Function
}
  
const Task: React.FC<Props> = (props) => {
  
  const task: Task = {
    taskId: props.taskData.taskId,
    task: props.taskData.task
  };
  
  const taskElement = 
    <div className={task.task.complete? "content_left_taskcomp" : "content_left_taskincomp"}
      onClick={ () => props.modalSet(task.taskId) }
    >
      <span className="content_left_taskcomp_dot">・</span>
      <span className="content_left_taskcomp_description"> {task.task.title}</span>
      <span className={task.task.complete? "content_left_taskcomp_check" : "content_left_taskincomp_check"}>
        {task.task.complete? "\u2714" : "\u2716"}
      </span>
    </div>;
  
  return taskElement;
}

export default Task;