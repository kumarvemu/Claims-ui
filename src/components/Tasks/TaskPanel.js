import { Fragment, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, getAllOpenTasks, updateTask } from "../../Data/DataFunctions";
import TaskRow from "./TaskRow";
import swal from "sweetalert";

const TaskPanel = (props) => {
  const currentClaim = useSelector(state => state.currentClaim);

  const claimStatus = props.claimStatus != null ? props.claimStatus : "";
  const claimID = currentClaim != null ? currentClaim.id : "";

  const emptyTask = {
    id: 0, claimId: claimID, detail: "", status: { id: 1, detail: "Open" }, date: ""
  };

  const [claimTasks, setClaimTasks] = useState(claimStatus !== "showAll" ? currentClaim.tasks : []);

  useEffect(() => {
    if (claimStatus === "showAll") {
      getAllOpenTasks()
        .then(
          (response) => {
            if (response.status === 200) {
              setClaimTasks(response.data);
            }
            else {
              console.log("Something went wrong with the response returning all Open Tasks.", response.status)
            }
          }
        )
        .catch(
          (error) => {
            console.log("Server error returning all Open Tasks: ", error);
          }
        );
    }
  }, );


  const newTaskReducer = (existingState, data) => {
    return { ...existingState, [data.field]: data.value };
  }

  const [newTask, dispatch] = useReducer(newTaskReducer, emptyTask);

  const { detail, status } = newTask;

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const storeDispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("Please wait - saving");

    let newTaskObj = { ...newTask, taskStatusId: newTask.status.id };
    const { id, date, createdDate, status, ...newTaskDTO } = newTaskObj;

    const response = addNewTask(newTaskDTO);
    response.then(result => {
      if (result.status === 200) {
        swal({
          title:"Thank You!",
          text: "Task added successfully.",
          icon:"success",
          button:"OK",
      })

        // setMessage("Task added");
        setClaimTasks(result.data);
        const updatedClaim = {...currentClaim, tasks: result.data};
        storeDispatch({ type: "set-current-claim", value: updatedClaim });
        setTimeout(() => setMessage(""), 3000);
      }
      else {
        setMessage("Error when adding Task: ", result.statusText)
      }
    })
      .catch(error => {
        setMessage("Error when adding Task: ", error);
        setSaving(false);
      });

    dispatch({ field: "detail", value: "" });
    dispatch({ field: "status", value: { id: 1, detail: "Open" } });
    setSaving(false);
  }

  const updateTaskStatuses = (taskId, newStatus) => {

    const response = updateTask(taskId, { status: newStatus });
    response.then(result => {
      if (result.status === 200) {
        setMessage("Task updated");
        setClaimTasks(result.data);
        const updatedClaim = {...currentClaim, tasks: result.data};
        storeDispatch({ type: "set-current-claim", value: updatedClaim });
        setTimeout(() => setMessage(""), 3000);
      }
      else {
        setMessage("Error when updating Task: ", result.statusText)
      }
    })
      .catch(error => {
        setMessage("Error when updating Task: ", error);
        setSaving(false);
      });
  }

  const taskStatuses = useSelector(state => state.taskStatuses);
  const taskStatusesOptions = taskStatuses.map(taskStatus => <option key={taskStatus.id} value={taskStatus.id}>{taskStatus.detail}</option>);

  //Create the task rows - matching on selected claim ID
  const displayTasks = claimTasks.map((task) => <TaskRow key={task.id} task={task} taskStatusesOptions={taskStatusesOptions} claimStatus={claimStatus} updateStatus={updateTaskStatuses} />);

  const handleChange = (e) => {
    let dataToChange = { field: e.target.id, value: e.target.value };

    if (e.target.id === "status") {
      dataToChange = { field: "status", value: { id: e.target.value, detail: e.target.options[e.target.selectedIndex].text } }
    }

    dispatch(dataToChange);
    setMessage("");
  }

  return (<Fragment>
    <div className="container mb-0 mt-3 text-left" >
      <div className="row p-1 pb-0 pe-lg-0 pt-lg-2 align-items-center rounded-3 border shadow-sm ">
        <div className="col-lg-12 p-1 p-lg-2 pt-lg-1 text-white" >
          <h5> {claimStatus === "showAll" && "Open "}<b>Tasks</b></h5>
        </div>
      </div>
    </div>
    <div className="container my-1 text-left" >
      <div className="row p-1 pb-0 pe-lg-0 pt-lg-3 align-items-center rounded-3 border shadow-sm">
        <table className="table1">
          <thead>
            <tr className="table-light">
              {claimStatus === "showAll" && <th className="col-2" scope="col">Claim No.</th>}
              <th className="col-10" scope="col"><b>Task</b></th>
              {claimStatus !== "showAll" && <th className="col-2" scope="col">Status</th>}
            </tr>
          </thead>
          <tbody>
            {displayTasks}
            {claimTasks.length === 0 && <tr><td colSpan="2">None</td></tr>}
          </tbody>
        </table>
        <hr />
        <form onSubmit={submitForm} className={`row ${claimStatus === "archived" || claimStatus === "showAll" ? "d-none" : ""}`}>
          <div className="row gx-3 gy-2">
            <div className="col-md-9">
              <label htmlFor="inputAddTask" className="form-label"><b>Task</b></label>
              <input type="text" className="form-control mb-3" id="detail" name="detail" onChange={handleChange} value={detail} required />
            </div>
            <div className="col-md-3">
              <label htmlFor="selectAddTaskStatus" className="form-label">Status </label>
              <select className="form-select" id="status" name="status" onChange={handleChange} value={status.id} required>
                <option value="" disabled>-- Select --</option>
                {taskStatusesOptions}
              </select>
            </div>
          </div>
          <div className="row gx-3 gy-2 mb-2">
            <div className="col-md-12">
              <button type="submit" className="btn btn-allstate-blue" disabled={saving}>Add Task</button>
              <p>{message}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Fragment>
  );
}

export default TaskPanel;