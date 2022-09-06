import { Fragment } from "react";

const TaskRow = (props) => {
  const claimStatus = props.claimStatus;

  //Set Row Colour based on Status
  let rowColourClass = "success";
  if (props.task.status === "Open")
    rowColourClass = "danger";

  const changeTaskStatus = (e) => {
    props.updateStatus(props.task.id, e.target.value);
  }

  return (
    <Fragment>
      <tr className={`table-${rowColourClass}`}>
        {claimStatus === "showAll" && <td>{props.task.claim_number}</td>}
        <td>{props.task.detail}</td>
        <td>
          <select className="form-select" id="selectTaskStatus" name="selectTaskStatus" onChange={changeTaskStatus} defaultValue={props.task.status} disabled={claimStatus === "archived" || claimStatus === "showAll"}>
            {props.taskStatusesOptions}
          </select>
        </td>
      </tr>
    </Fragment>
  );
}

export default TaskRow;