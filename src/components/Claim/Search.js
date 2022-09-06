import { Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import ClaimRow from "./ClaimRow";
import { getAllClaimStatuses, getClaimsByOpenStatus, getInsuranceTypes, getAllClaims } from "../../Data/DataFunctions";


const Search = (props) => {

    let searchText="";
    let searchType="";
    let searchedClaims=[];
    let displayClaims ="";
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submitSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log(searchedClaims);
        }
    }

    const searchTextChange = (e) => {
        searchText = e.target.value;
        doSearch();
        console.log(searchedClaims);

    }

    const searchTypeChange = (e) => {
        searchType = e.target.value;
        doSearch();
        console.log(searchedClaims);
    }

    const [allClaims, setAllClaims] = useState(getAllClaims());

    const doSearch=()=>{  
         searchedClaims = searchText === "" ? allClaims : allClaims.filter((claim) => (searchType === "claimNumber" && claim.number.startsWith(searchText.toUpperCase())) ||
        (searchType === "policyNumber" && claim.policy_number.startsWith(searchText.toUpperCase())) || (searchType === "surname" && (claim.customer_surname.toUpperCase().startsWith(searchText.toUpperCase())))
        );
        
        displayClaims = searchedClaims.map((claim, index) => ((claim.status === "All")
        && (claim.insurance_type === "All")) &&
        <ClaimRow key={index} claim={claim} />
        );
    };



    return (
        <Fragment>
            <div className="container my-3" >
              <div className="row p-1 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow">
              <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search">
                    <div className="row ">
                        <div className="col-sm-4 mb-1">
                            <input type="search" className="form-control" placeholder="Search Claims..." onKeyDown={submitSearch} onChange={searchTextChange} />
                        </div>
                        <div className="col-sm-8" onChange={searchTypeChange}>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inputSearchType" id="optionClaimID" value="claimNumber" defaultChecked />
                                <label className="form-check-label" htmlFor="optionClaimID"> Claim ID</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inputSearchType" id="optionPolicyNumber" value="policyNumber" />
                                <label className="form-check-label" htmlFor="optionPolicyNumber"> Policy Number</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inputSearchType" id="optionSurname" value="surname" />
                                <label className="form-check-label" htmlFor="optionSurname"> Surname</label>
                            </div>
                        </div>
                    </div>
                </form>
              </div>
            </div>
            <div>
                Search Results
            </div>
            <table className="table claim-table">
                        <thead>
                            <tr className="table-light">
                                <th scope="col"></th>
                                <th scope="col">Claim #</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Policy #</th>
                                <th scope="col">Type</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Tasks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayClaims}
                        </tbody>
                    </table>
          </Fragment>
    );
}

export default Search;