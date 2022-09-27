import { Fragment, useEffect, useReducer, useState } from "react";
import NotesPanel from "../Notes/NotesPanel";
import TaskPanel from "../Tasks/TaskPanel";
import { getClaimById, registerNewClaim, updateClaim } from "../../Data/DataFunctions";
import { useLocation, useNavigate, useParams } from "react-router";
import ClaimNotFound from "../../ClaimNotFound";
import { useDispatch, useSelector } from "react-redux";
import { isFulfilled } from "@reduxjs/toolkit";
import swal from "sweetalert";


const ClaimDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const storeDispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

   
    const claimStatuses = useSelector(state => state.claimStatuses);

    const claimStatusOptions = claimStatuses.map(claimStatus =>
        <option key={claimStatus.id} value={claimStatus.id}>{claimStatus.detail}</option>
    );

    const insuranceTypes = useSelector(state => state.insuranceTypes);

    //Empty Claim values
    const emptyClaim = {
        // id: 0, policyNumber: "", status: { id: 0, detail: "", open: true }, insuranceType: insuranceTypes.filter(it => it.detail === "Property"), createdDate: "",
        id: 0, policyNumber: "", status: { id: 0, detail: "", open: true },insuranceType: { id: 1, detail: "Property"}, createdDate: "",

        claimStartedDate: "", customerFirstName: "", customerSurname: "", estimatedClaimValue: "", claimReason: "",
        incidentDescription: "", affectedAddress: "", relatedIncidentDate: "", anyFurtherDetails: "",
        amountPaid: "", make: "", model: "", modelYear: "", animalType: "", animalBreed: ""
    };
    console.log("insurance Type")

    //Get current Claim in store
    const claimInStore = useSelector(state => state.currentClaim);

    const [claimfound, setClaimFound] = useState(claimInStore == null ? false : claimInStore.id !== 0);

    const newClaimReducer = (existingState, data) => {
        if (data.field === "reset")
            return data.value;
        if (data.field === "insuranceTypeDetail")
            return { ...existingState, insuranceType: { ...existingState.insuranceType, detail: data.value } };
        if (data.field === "insuranceTypeId")
            return { ...existingState, insuranceType: { ...existingState.insuranceType, id: data.value } };
        else
            return { ...existingState, [data.field]: data.value };
    }
    const [newClaim, dispatch] = useReducer(newClaimReducer, claimInStore);

    useEffect(() => {   
        if (location.pathname !== "/new") {
            getClaimById(params.claimId)
                .then(response => {
                    if (response.status === 200) {
                        storeDispatch({ type: "set-current-claim", value: response.data });
                        dispatch({ field: "reset", value: response.data });
                        setClaimFound(true);
                    }
                    else {
                        console.log("Error when getting Claim from Database ", response.status);
                    }
                })
                .catch(
                    error => console.log("error occurred", error)
                );
        }
        else {
            setClaimFound(false);
            dispatch({ field: "reset", value: emptyClaim });
        }

    }, [location.pathname]);


    const { id, policyNumber, status, insuranceType, createdDate, claimStartedDate, customerFirstName, customerSurname, estimatedClaimValue, claimReason,
        incidentDescription, affectedAddress, relatedIncidentDate, anyFurtherDetails, amountPaid, make, model, modelYear, animalType, animalBreed } = newClaim;

    const pageAction = location.pathname === "/new" ? "Add" : "Update";

    //const claimStatus = claimInStore == null ? "open" : claimfound ? !claimInStore.status.open ? "archived" : "open" : "open";
    let claimStatus = "open";
    if( claimfound &&  !claimInStore.status.open ){
        claimStatus = "archived"
    }
    
    //TODO: Check Roles and disable if don't have access!
    const fieldDisabled = claimStatus === "archived";

    const constPageTitle = location.pathname === "/new" ? "Register  Claim" : "View / Update Claim Details";
        
    const handleChange = (e) => {
        let dataToChange = { field: e.target.id, value: e.target.value };

        if (e.target.id === "status") {
            dataToChange = { field: "status", value: { id: e.target.value, detail: e.target.options[e.target.selectedIndex].text, open: true } }
        }
        dispatch(dataToChange);
    }

    const insuranceTypeChange = (e) => {
        const changeInsuranceTypeDetail = { field: "insuranceTypeDetail", value: e.target.value };
        dispatch(changeInsuranceTypeDetail);

        const changeInsuranceTypeId = { field: "insuranceTypeId", value: e.target.getAttribute('data-value') };
        dispatch(changeInsuranceTypeId);
    }

    const ListClicked = (e) => {
        navigate("/list" );
  }

    const submitForm = (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage("Please wait - saving");      

        //Add Claim
        if (pageAction === "Add") {

            //Update object to be in correct format to add
            let newClaimObj = { ...newClaim, insuranceType: newClaim.insuranceType.id };
            const { id, amountPaid, createdDate, status, ...newClaimDTO } = newClaimObj;

            const response = registerNewClaim(newClaimDTO);
            response.then(result => {
                if (result.status === 200) {
                         swal({ 
                            title:"Thank You!",
                            text: "Claim added with id " + result.data.id + " successfully.",
                            icon:"success",
                            button: "OK",
                        })
                    // setMessage("Claim added with id " + result.data.id);
                    storeDispatch({ type: "set-current-claim", value: result.data });
                    navigate("/view/" + result.data.id);
                    setTimeout(() => setMessage(""), 3000);
                    setSaving(false);
                }
                else {
                    setMessage("Error when adding Claim", result.statusText)
                }
            })
                .catch(error => {
                    setMessage("Error when adding Claim", error);
                    setSaving(false);
                });
        }

        //Update Claim
        else {
            //Need to close all open tasks before changing to the two statuses - "Accepted - Awaiting Payment" and "Accepted & Paid"
            let valid = true;
            if ((status.detail === "Accepted & Paid" || status.detail === "Awaiting Payment") && claimInStore.tasks.length > 0) {
                const openTasks = claimInStore.tasks.filter((task) => task.status.detail === "Open");

                if (openTasks.length > 0) {
                    setMessage("Can not change to " + status.detail + " when tasks (" + openTasks.length + ") are still open.");
                    setSaving(false);
                    valid = false;
                }
            }

            //Amount Paid must be entered before Accepted & Paid can be selected.
            if (status.detail === "Accepted & Paid" && (amountPaid === "" || amountPaid == null)) {
                setMessage("Amount Paid must be entered before Claim can change status to Accepted & Paid.");
                setSaving(false);
                valid = false;
            }

            //Validate the currency entered
            let regex = /^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/;
            if (estimatedClaimValue != null) {
                if (!regex.test(estimatedClaimValue)) {
                    setMessage("Estimated Claim value must be a valid number with format of '123.34'");
                    setSaving(false);
                    valid = false;
                }
            }

            if (amountPaid != null) {
                if (!regex.test(amountPaid)) {
                    setMessage("Amount Paid must be a valid number with format of '123.34'");
                    setSaving(false);
                    valid = false;
                }
            }

            if (valid) {

                let data = {};

                if (policyNumber !== claimInStore.policyNumber) {
                    data = { ...data, policyNumber: policyNumber };
                }
                if (status.id !== claimInStore.status.id) {
                    data = { ...data, status: status.id };
                }
                if (insuranceType.id !== claimInStore.insuranceType.id) {
                    data = { ...data, insuranceType: insuranceType.id };
                }
                if (claimStartedDate !== claimInStore.claimStartedDate) {
                    data = { ...data, claimStartedDate: claimStartedDate };
                }
                if (customerFirstName !== claimInStore.customerFirstName) {
                    data = { ...data, customerFirstName: customerFirstName };
                }
                if (customerSurname !== claimInStore.customerSurname) {
                    data = { ...data, customerSurname: customerSurname };
                }
                if (estimatedClaimValue !== claimInStore.estimatedClaimValue) {
                    data = { ...data, estimatedClaimValue: estimatedClaimValue };
                }
                if (claimReason !== claimInStore.claimReason) {
                    data = { ...data, claimReason: claimReason };
                }
                if (incidentDescription !== claimInStore.incidentDescription) {
                    data = { ...data, incidentDescription: incidentDescription };
                }
                if (affectedAddress !== claimInStore.affectedAddress) {
                    data = { ...data, affectedAddress: affectedAddress };
                }
                if (relatedIncidentDate !== claimInStore.relatedIncidentDate) {
                    data = { ...data, relatedIncidentDate: relatedIncidentDate };
                }
                if (anyFurtherDetails !== claimInStore.anyFurtherDetails) {
                    data = { ...data, anyFurtherDetails: anyFurtherDetails };
                }
                if (amountPaid !== claimInStore.amountPaid) {
                    data = { ...data, amountPaid: amountPaid };
                }
                if (make !== claimInStore.make) {
                    data = { ...data, make: make };
                }
                if (model !== claimInStore.model) {
                    data = { ...data, model: model };
                }
                if (modelYear !== claimInStore.modelYear) {
                    data = { ...data, modelYear: modelYear };
                }
                if (animalType !== claimInStore.animalType) {
                    data = { ...data, animalType: animalType };
                }
                if (animalBreed !== claimInStore.animalBreed) {
                    data = { ...data, animalBreed: animalBreed };
                }

                const response = updateClaim(newClaim.id, data);
                response.then(result => {
                    if (result.status === 200) {
                        swal({
                            title:"Thank You!",
                            text: "Claim " + result.data.id + " updated successfully.",
                            icon:"success",
                            button: "OK",
                        })
                        // setMessage("Claim " + result.data.id + " updated successfully.");
                         storeDispatch({ type: "set-current-claim", value: result.data });
                         setSaving(false);
                         setTimeout(() => setMessage(""), 5000);
                    }
                    else {
                        setMessage("Error when updating Claim", result.statusText)
                    }
                })
                    .catch(error => {
                        setMessage("Error when updating Claim", error);
                        setSaving(false);
                    });

                // setMessage("Claim " + newClaim.id + " updated successfully")
            }
        }
    }

    //Create the Insurance Type radio buttons
    const insuranceTypeOptions = insuranceTypes.map(it =>
        <div key={it.id} className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inputInsuranceType" data-value={it.id} id={`option${it.detail}`} defaultValue={it.detail} defaultChecked={insuranceType.detail === it.detail} required disabled={fieldDisabled} />
            <label className="form-check-label" htmlFor={`option${it.detail}`}> {it.detail}</label>
        </div>
    );

    return (
        <Fragment>
            <div className="container my-1" >
                {/* <div className="row p-1 pb-0 pe-lg-0 pt-lg-2 align-items-center rounded-3 border shadow-sm"> */}
                    {/* <div className="col-lg-3 p-1 p-lg-2 pt-lg-1 text-white" > */}
                        <h5>{constPageTitle}</h5>
                    </div>
                {/* </div> */}
            
            {(!claimfound && location.pathname !== "/new") &&
                <ClaimNotFound />
            }
            {(claimfound || location.pathname === "/new") &&
                <div className="container my-1 text-left" >
                    <div className="row p-1 pb-0 pe-lg-0 pt-lg-3 align-items-center rounded-3 border shadow-sm">
                        <form onSubmit={submitForm} className="row">
                            <div className={`row gx-3 gy-2 ${location.pathname === "/new" ? "d-none" : ""}`}>
                                <div className="col-md-12">
                                {/* <button type="subbmit" className="btn bbutton-82-pushable" onClick={homeClicked}><p><b><a href="list">Claims List</a></b></p></button> */}
                                <button type="subbmit" className="btn claims-list-btn" onClick={ListClicked}>Claims List</button>

                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputClaimNumber" className="form-label"><b>Claim Number</b></label>
                                    <input type="text" className="form-control" id="inputClaimNumber" name="inputClaimNumber" value={id} readOnly />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputClaimCreatedDate" className="form-label"><b>Claim Created</b></label>
                                    <input type="text" className="form-control" id="inputClaimCreatedDate" name="inputClaimCreatedDate" value={createdDate} readOnly />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="selectClaimStatus" className="form-label"><b>Claim Status</b> </label>
                                    <select className="form-select" id="status" name="status" onChange={handleChange} value={status.id} disabled={fieldDisabled}>
                                        <option value="" disabled >-- Select --</option>
                                        {claimStatusOptions}
                                    </select>
                                </div>
                            </div>
                            <div className="row gx-3 gy-2">
                                <div className="col-md-6" onChange={insuranceTypeChange}>
                                    <label htmlFor="inputInsuranceType" className="form-label"><b>Insurance Type</b></label> <br />
                                    {insuranceTypeOptions}
                                </div>
                            </div>
                            <div className="row gx-3 gy-2">
                                <div className="col-md-3">
                                    <label htmlFor="policyNumber" className="form-label"><b>Policy Number</b></label>
                                    <input type="number" className="form-control" onChange={handleChange} id="policyNumber" name="policyNumber" maxLength="8" max="9999999999" placeholder="i.e. 10 digit number" value={policyNumber} required disabled={fieldDisabled} />
                                </div>
                            {/* </div> */}
                            {/* <div className="row gx-3 gy-2"> */}
                                <div className="col-md-3">
                                    <label htmlFor="customerFirstName" className="form-label"><b>First Name</b></label>
                                    <input type="text" className="form-control" onChange={handleChange} id="customerFirstName" name="customerFirstName" placeholder="First Name" value={customerFirstName} required disabled={fieldDisabled} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="customerSurname" className="form-label"><b>Surname</b></label>
                                    <input type="text" className="form-control" onChange={handleChange} id="customerSurname" name="customerSurname" placeholder="Surname" value={customerSurname} required disabled={fieldDisabled} />
                                </div>
                            </div>
                            <div className="row gx-3 gy-2">
                                <div className="col-md-3">
                                    <label htmlFor="claimStartedDate" className="form-label"><b>Claim Start Date</b></label>
                                    <input type="date" className="form-control" onChange={handleChange} id="claimStartedDate" name="claimStartedDate" value={claimStartedDate} required disabled={fieldDisabled} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="estimatedClaimValue" className="form-label"><b>Estimated Claim Value</b></label>
                                    <input type="number" className="form-control" onChange={handleChange} id="estimatedClaimValue" name="estimatedClaimValue" max="499.99" placeholder="$0.00" value={estimatedClaimValue} required disabled={fieldDisabled} />
                                </div>
                            {/* </div>
                            <div className="row gx-3 gy-2"> */}
                                <div className="col-md-3">
                                    <label htmlFor="claimReason" className="form-label"><b>Claim Reason</b></label>
                                    <input type="text" className="form-control" onChange={handleChange} id="claimReason" name="claimReason" placeholder="Reason for the claim" value={claimReason} required disabled={fieldDisabled} />
                                </div>
                            </div>
                            <div className="row gx-3 gy-2">
                                <div className="col-md-6">
                                    <label htmlFor="incidentDescription" className="form-label"><b>Incident Description</b></label>
                                    <textarea className="form-control" onChange={handleChange} id="incidentDescription" name="incidentDescription" rows="4" placeholder="Description of the incident leading to the claim" value={incidentDescription} required disabled={fieldDisabled}></textarea>
                                </div>
                            </div>
                            {insuranceType.detail === "Property" &&
                            
                                <div id="divPropertyFields" className="row gx-3 gy-2">    
                                    <div className="col-md-6">
                                        <label htmlFor="affectedAddress" className="form-label"><b>Affected Address</b></label>
                                        <textarea className="form-control" onChange={handleChange} id="affectedAddress" name="affectedAddress" rows="4" placeholder="Address of property affected" value={affectedAddress || ""} required disabled={fieldDisabled}></textarea>
                                    </div>
                                </div>
                               
                               
                            }
                            {insuranceType.detail === "Motor" &&
                                <div id="divMotorFields" className="row gx-3 gy-2">
                                    <div className="col-md-4">
                                        <label htmlFor="make" className="form-label"><b>Make</b></label>
                                        <input type="text" className="form-control" onChange={handleChange} id="make" name="make" placeholder="Vehicle Make" value={make || ""} disabled={fieldDisabled} />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="model" className="form-label"><b>Model</b></label>
                                        <input type="text" className="form-control" onChange={handleChange} id="model" name="model" placeholder="Vehicle Model" value={model || ""} disabled={fieldDisabled} />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="modelYear" className="form-label"><b>Year</b></label>
                                        <input type="number" className="form-control" onChange={handleChange} id="modelYear" name="modelYear" min="1900" max="2099" value={modelYear || ""} disabled={fieldDisabled} />
                                    </div>
                                </div>
                            }
                            {insuranceType.detail === "Pet" &&
                                <div id="divPetFields" className="row gx-3 gy-2">
                                    <div className="col-md-6">
                                        <label htmlFor="animalType" className="form-label"><b>Animal Type</b></label>
                                        <input type="text" className="form-control" onChange={handleChange} id="animalType" name="animalType" placeholder="Type of Animal" value={animalType || ""} disabled={fieldDisabled} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="animalBreed" className="form-label"><b>Animal Breed</b></label>
                                        <input type="text" className="form-control" onChange={handleChange} id="animalBreed" name="animalBreed" placeholder="Breed of Animal" value={animalBreed || ""} disabled={fieldDisabled} />
                                    </div>
                                </div>
                            }
                            <div id="divOptionalFields" className="row gx-3 gy-2">
                                <div className="col-md-3">
                                    <label htmlFor="relatedIncidentDate" className="form-label"><b>Related Claim Incident Date</b> <span className="text-muted">(Optional)</span></label>
                                    <input type="date" className="form-control" onChange={handleChange} id="relatedIncidentDate" name="relatedIncidentDate" disabled={fieldDisabled} value={relatedIncidentDate || ""} />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="anyFurtherDetails" className="form-label"><b>Any Further Details</b> <span className="text-muted">(Optional)</span></label>
                                    <textarea className="form-control" onChange={handleChange} id="anyFurtherDetails" name="anyFurtherDetails" rows="2" placeholder="Any additional details" value={anyFurtherDetails || ""} disabled={fieldDisabled}></textarea>
                                </div>
                            </div>
                            {location.pathname !== "/new" &&
                                <Fragment>
                                    <div className="row gx-3 gy-2">
                                        <div className="col-md-3">
                                            <label htmlFor="amountPaid" className="form-label"><b>Amount Paid</b> <span className="text-muted">(Optional)</span></label>
                                            <input type="number" className="form-control" onChange={handleChange} id="amountPaid" name="amountPaid" placeholder="$0.00" max="499.99" disabled={fieldDisabled} value={amountPaid || ""} /> {/* {...requiredAmount} */}
                                        </div>
                                    </div>
                                </Fragment>
                            }
                            <div className="row gx-3 gy-2 mb-2">
                                <div className={`col-6 ${fieldDisabled ? "d-none" : ""}`}>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-allstate-blue" disabled={saving}>{pageAction}</button>
                                        <p>{message}</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {(location.pathname !== "/new" && claimfound) &&
                <Fragment>
                    <NotesPanel claimStatus={claimStatus} claimID={location.pathname === "/new" ? "" : claimInStore.id} />
                    <TaskPanel claimStatus={claimStatus} claimID={location.pathname === "/new" ? "" : claimInStore.id} />
                </Fragment>
            }
        </Fragment>
    );
}

export default ClaimDetails;