import { useDispatch, useSelector } from 'react-redux';
import {getClaimsByOpenStatus}  from  "../../Data/DataFunctions";
import {Fragment, useEffect,useState } from "react";
import ClaimRow from "./ClaimRow";


const ClaimSearch = (props) => {


    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [valid, setValid] = useState(false);
    const [touched, setTouched] = useState(false);
    const [typeOfStatus, setTypeOfStatus] = useState(true);

    const searchType = useSelector(state => state.searchType);

    const [allClaims, setAllClaims] = useState([]);

    useEffect(() => {
        getClaimsByOpenStatus(typeOfStatus)
            .then(
                (response) => {
                    if (response.status === 200) {
                        setAllClaims(response.data);
                    }
                    else {
                        console.log("Oops Something went wrong with the response returning Claims.", response.status)
                    }
                }
            )
            .catch(
                (error) => {
                    console.log("Server error returning Claims: ", error);
                }
            );
    }, [typeOfStatus]);

            
        let displayClaims;
        if(searchType==="claimNumber"){
            console.log(allClaims);
        
            displayClaims = allClaims.filter(claim => claim.id.toString() === searchTerm)
            .map( (filteredclaim,index) => 
            <ClaimRow key={index} claim={filteredclaim} />)
        }

        if(searchType==="policyNumber"){
            displayClaims = allClaims.filter(claim => claim.policyNumber === searchTerm)
            .map( (filteredclaim,index) => 
            <ClaimRow key={index} claim={filteredclaim} />)
        }

        if(searchType==="surname"){
            displayClaims = allClaims.filter(claim => claim.customerSurname === searchTerm)
            .map( (filteredclaim,index) => 
            <ClaimRow key={index} claim={filteredclaim} />)
        }

         const handleChange = (event) => {
            const value = event.target.value;
            console.log(event.target.value);
            setTouched(true);
            setSearchTerm(value);
            setValid (value.trim().length > 0);

        }      

    const searchTypeChange = (e) => {
        dispatch({ type: "set-search-type", value: e.target.value });
    //     navigate("searchType=" + e.target.value + "&searchTerm=" + searchTerm);
    }

    return (
        <Fragment>
        <div className="px-3 py-2 border-bottom mb-2 background-allstate-blue">
            <div className="container d-flex flex-wrap justify-content-center">
                <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search">
                    <div className="row text-white">
                        <div className="col-sm-4 mb-1">
                              <input onChange={handleChange} value={searchTerm}  type="text" /> 
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

export default ClaimSearch;