import { Fragment,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import allstateLogo from '../../resources/AllstateLogo.svg';
import SiteIcons from '../../resources/SiteIcons';
import { getAllClaimStatuses, getAllTaskStatuses, getInsuranceTypes } from '../../Data/DataFunctions';

const SiteHeader = (props) => {
    const dispatch = useDispatch();
  
    //Get Insurance Types
    const insuranceTypes = useSelector(state => state.insuranceTypes);
    useEffect(() => {
      if (insuranceTypes.length === 0) {
        getInsuranceTypes()
          .then(
            (response) => {
              if (response.status === 200) {
                dispatch({ type: "set-insurance-types", value: response.data });
              }
              else {
                console.log("Oops something went wrong with the response returning Insurance Types.", response.status)
              }
            }
          )
          .catch(
            (error) => {
              console.log("Server error returning Insurance Types: ", error);
            }
          );
      }
    });
  
    
    //Get Task Statuses
    const taskStatuses = useSelector(state => state.taskStatuses);
    useEffect(() => {
      if (taskStatuses.length === 0) {
        getAllTaskStatuses()
          .then(
            (response) => {
              if (response.status === 200) {
                dispatch({ type: "set-task-statuses", value: response.data });
              }
              else {
                console.log("Oops Something went wrong with the response returning Task Statuses.", response.status)
              }
            }
          )
          .catch(
            (error) => {
              console.log("Server error returning Task Statuses: ", error);
            }
          );
      }
    });
    
    //Get Claim Statuses
    const claimStatuses = useSelector(state => state.claimStatuses);
    useEffect(() => {
      if (claimStatuses.length === 0) {
        getAllClaimStatuses()
          .then(
            (response) => {
              if (response.status === 200) {
                dispatch({ type: "set-claim-statuses", value: response.data });
              }
              else {
                console.log("Oops Something went wrong with the response returning Claim Statuses.", response.status)
              }
            }
          )
          .catch(
            (error) => {
              console.log("Server error returning Claim Statuses: ", error);
            }
          );
      }
    });
  


    return (
        <Fragment>
            <SiteIcons />

            <div className="px-5 py-2 text-dark background-allstate-green">
                <div className="container">
                    <div className="row p-1 pb-0 pe-lg-0 pt-lg-2 align-items-center justify-content-center justify-content-lg-start">
                          <div className="align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none font-weight-bold"> 
                            {/* <img src={allstateLogo} alt="Allstate" />*/} &nbsp; <b>Demo - Quick Claims Application</b>  
                        </div>
                        </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SiteHeader;