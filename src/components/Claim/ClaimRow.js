import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";


const ClaimRow = (props) => {

  const claim = props.claim;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editClicked = (e) => {
    dispatch({ type: "set-current-claim", value: claim });
    navigate("/view/" + claim.id);
  }

  //Set Row Colour based on Status
  let rowColourClass = "success";
  if (claim.status.detail === "Awaiting Assessment")
    rowColourClass = "danger";

  if (claim.status.detail === "In Progress" || claim.status.detail === "Awaiting Payment")
    rowColourClass = "warning";

  const claimTasks = claim.tasks; //getAllTasks().filter((task) => task.claim_id === claim.id);
  const openClaimTasks = claimTasks.filter((task) => task.status.detail === "Open");

  return (
    <Fragment>
      {/* <tr className={`table-${rowColourClass}`}> */}
      <tr className=''>
        {/* <td className="claim-table-link"  onClick={editClicked}><svg width="24" height="24" alt="View Claim"><use xlinkHref="#view-claim" /></svg></td>*/}
        <td className="claim-table-link"  onClick={editClicked}><p><b><a href="#view-claim">Edit</a></b></p></td>
        <th>{claim.id}</th>
        <td>{claim.claimStartedDate}</td>
        <td>{claim.policyNumber}</td>
        <td title={claim.insuranceType.detail}>{claim.insuranceType.detail}</td>
        <td>{claim.customerFirstName} {claim.customerSurname}</td>
        <td>{claim.status.detail}</td>
        <td className=''>{claimTasks.length}</td>
      </tr>
    </Fragment>
  );
}

export default ClaimRow;