import React, { useState, useEffect, useContext } from "react";

import { FirebaseContext, db } from "../Firebase";
import Task  from "../components/Task";
import Modal from "../components/Modal";
import Moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TaskIdContext = React.createContext("");

const TaskCalender: React.FC = () => {
  const initialDate: Date = new Date();
  
  const { userId } = useContext(FirebaseContext);
  const [taskId, setTaskId] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const [startDate, setStartDate] = useState(initialDate);
  const [tasks, setTasks] = useState([]);

  const handleDateChange = (date: Date) => {
    setStartDate(date);
  };

  const modalSet = (taskId: string, modalOn: boolean) => {
    setTaskId(taskId);
    setModalOn(modalOn);
  };

  useEffect(() => {
    let mounted = true;
    const fetchTasks = [];

    db.collection(`users/${userId}/tasks`)
      .where("date", "==", Moment(startDate).format("YYYY/MM/DD"))
      .get()
      .then((snapShot) => {
        if (!mounted) {
          return;
        };
        if (snapShot && snapShot.docs) {
          snapShot.forEach(doc => {
            fetchTasks.push(
              <Task
                key={doc.id}
                taskData={{
                  taskId: doc.id,
                  task: {
                    title: doc.data().title,
                    date: doc.data().date,
                    complete: doc.data().complete,
                    detail: doc.data().detail
                  }
                }}
                modalSet={modalSet}
              />
            );
          });
          setTasks([fetchTasks]);
        }
      });
    return () => {
      mounted = false;
    };
  }, [startDate, taskId]);

  return (
    <TaskIdContext.Provider value={taskId}>
      <div className="content">
        <div className="content_left">
          <div className="content_left_head">
            <span className="content_left_list">List</span>
            <button className="content_left_add" onClick={() => modalSet("", true)}>
              Add+
            </button>
          </div>
          <div className="content_left_tasks_area">
            {tasks}
          </div>
        </div>
        <div className="content_right">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            inline
          />
        </div>
        <Modal
          modalOn={modalOn}
          startDate={startDate}
          setStartDate={setStartDate}
          modalSet={modalSet}
        />
      </div>
    </TaskIdContext.Provider>
  );
};

export default TaskCalender;