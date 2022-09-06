import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import {getClaimsByOpenStatus}  from  "../../Data/DataFunctions";
import {Fragment, useEffect,useState } from "react";
import ClaimRow from "./ClaimRow";
import { useSearchParams } from "react-router-dom";


const ClaimSearch = (props) => {


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [valid, setValid] = useState(false);
    const [touched, setTouched] = useState(false);
    const [typeOfStatus, setTypeOfStatus] = useState(true);
    

    // const searchTerm = useSelector(state => state.searchTerm);
    const searchType = useSelector(state => state.searchType);
    // const [allClaims, setAllClaims] = useState(getAllClaims);
    console.log(searchTerm);

    const [allClaims, setAllClaims] = useState([]);

    useEffect(() => {
        getClaimsByOpenStatus(typeOfStatus)
            .then(
                (response) => {
                    if (response.status === 200) {
                        setAllClaims(response.data);
                    }
                    else {
                        console.log("Something went wrong with the response returning Claims.", response.status)
                    }
                }
            )
            .catch(
                (error) => {
                    console.log("Server error returning Claims: ", error);
                }
            );
    }, [typeOfStatus]);

    // const handleChange = (event) => {
    //     const value = event.target.value;
    //     setTouched(true);
    //     setSearchTerm(value);
    //     setValid (value.trim().length > 0);
    // }



    
        
        /* if(document.getElementById('optionClaimID').checked) {

            //ClaimID radio button is checked
          }else if(document.getElementById('optionPolicyNumber').checked) {
            //Policy Number radio button is checked
          }else if(document.getElementById('optionSurname').checked)
 */
    //       const displayClaims = searchedClaims.map((claim, index) => ((claim.status === selectedStatus || selectedStatus === "All")
    //       && (claim.insurance_type === selectedInsurnceType || selectedInsurnceType === "All")) &&
    //       <ClaimRow key={index} claim={claim} />
    //   );
    // people.filter(person => person.age < 60).map(filteredPerson => (
        // const displayClaims = "";
        // id: 101, number: "1234567890", policy_number: "156725657625", status: 1, insurance_type: "Property", created_date: "2017-01-31",
        // claim_started_date: "2017-01-31", customer_first_name: "John", customer_surname: "Doe", estimated_claim_value: "100", claim_reason: "It broke",
        // incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        // amount_paid: "100", make: "Skoda", model: "Fabia", modelYear: "1990", animal_type: "horse", animal_breed: "big"
        
        
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
        
   

    

    const submitSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            dispatch({ type: "set-search-term", value: e.target.value });
            console.log(e.target.value);
            navigate("searchType=" + searchType + "&searchTerm=" + searchTerm);
        }
    }

    const searchTextChange = (e) => {
        dispatch({ type: "set-search-term", value: e.target.value });
        navigate("searchType=" + searchType + "&searchTerm=" + e.target.value);
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
                            {/* <input type="search" className="form-control" placeholder="Search Claims..." ={submitSearch} onChange={searchTextChange} value={searchTerm} />  */}
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