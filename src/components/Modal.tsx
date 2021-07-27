import React, { useState, useContext, useEffect } from "react";

import { FirebaseContext ,db } from "../Firebase";
import { TaskIdContext } from "../pages/TaskCalendar";
import DatePicker from "react-datepicker";
import Moment from "moment";
import { uuid } from 'uuidv4';

interface Props {
  modalOn: boolean;
  startDate: Date;
  setStartDate: Function;
  modalSet: Function;
}

const Modal: React.FC<Props> = (props) => {
  let taskId = useContext(TaskIdContext);

  const { userId } = useContext(FirebaseContext);
  const [title, setTitle] = useState("");
  const [complete, setComplete] = useState("false");
  const [detail, setDetail] = useState("");

  const handleDateChange = (date: Date) => {
    props.setStartDate(date);
  }

  useEffect(() => {
    if (!taskId) {
      setTitle("");
      setComplete("false");
      setDetail("");
      return;
    } 

    db.collection(`users/${userId}/tasks`)
      .doc(`${taskId}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          setTitle(doc.data().title);
          setComplete(doc.data().complete.toString());
          setDetail(doc.data().detail);
        }
      });
  }, [taskId]);

  const setTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) {
      taskId = uuid();
    }

    const task = {
      title: title? title : "",
      complete: complete.toLowerCase() === "true",
      date: Moment(props.startDate).format("YYYY/MM/DD"),
      detail: detail? detail : ""
    }
    
    db.collection(`users/${userId}/tasks`).doc(`${taskId}`)
      .set(task)
      .then(() => {
        props.modalSet(null, false);
      });
  }

  const deleteTask = () => {
    if (window.confirm("Are you sure delete?")) {
      db.collection(`users/${userId}/tasks`).doc(`${taskId}`)
        .delete()
        .then(() => {
          props.modalSet(null, false);
        });
    }
  }

  return (
    <>
      {props.modalOn &&
        <div>
          <div className="modal" onClick={() => props.modalSet("", false)}></div>
          <div className="modal_content">
              <div className="modal_content_close" onClick={() => props.modalSet("", false)}>
                <span className="modal_content_close_button">×</span>
              </div>
              <div className="modal_form_area">
                <form className="modal_content_form" onSubmit={e => setTask(e)}>
                  <div className="modal_content_form_title">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)}/>
                  </div>
                  <div>
                    <label htmlFor="complete">Complete</label>
                    <input type="checkbox" id="complete" onClick={() => setComplete(`${!(complete === "true")}`)} checked={complete === "true"}/>
                  </div>
                  <div className="modal_content_form_date">
                    <label htmlFor="date">Date</label>
                    <DatePicker
                      selected={props.startDate}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="modal_content_form_details">
                    <label htmlFor="description">Detail</label>
                    <textarea name="description" id="description" 
                      value={detail} 
                      onChange={e => setDetail(e.target.value)}>
                    </textarea>
                  </div>
                  <div className="modal_button_area">
                    {taskId? <button className="delete_button" type="button" onClick={deleteTask}>Delete</button> : null}
                    <button className="modal_content_from_button" type="submit">
                      {taskId? "Edit" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
      }
    </>
  );
};

export default Modal;