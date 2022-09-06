import { Fragment, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
import { getAllClaimStatuses, getInsuranceTypes, getAllClaims } from "../../Data/DataFunctions";
import ClaimRow from "./ClaimRow";

const ViewClaims = (props) => {
    const [selectedClaimType, setSelectedClaimType] = useState("Open");
    // const [typeOfStatus, setTypeOfStatus] = useState(true);

    const [allClaims, setAllClaims] = useState([]);

    useEffect(() => {
        getAllClaims()
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
    }, []);

    const [allClaimStatuses, setAllClaimStatuses] = useState([]);

    useEffect(() => {
        getAllClaimStatuses()
            .then(
                (response) => {
                    if (response.status === 200) {
                        setAllClaimStatuses(response.data);
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
    }, []);

    const [insuranceTypes, setInsuranceTypes] = useState([]);

    useEffect(() => {
        getInsuranceTypes()
            .then(
                (response) => {
                    if (response.status === 200) {
                        setInsuranceTypes(response.data);
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
    }, []);


    const claimStatuses = allClaimStatuses.filter((claimStatus) => claimStatus.open === (selectedClaimType === "Open"));
   // const insuranceTypes = getInsuranceTypes();
    const claimTypes = [
        { id: 4, value: 2, type: "Archived" }
    ];
    const claimTypesOptions = claimTypes.map(claimType => <option key={claimType.id} value={claimType.value}>{claimType.type}</option>);


    // const [searchParams, setSearchParams] = useSearchParams();

    
    const insuranceTypesOptions = insuranceTypes.map(insuranceType => <option key={insuranceType.id} value={insuranceType.id}>{insuranceType.detail}</option>);
    
    const [selectedStatus, setSelectedStatus] = useState("All");
    
    const [selectedInsurnceType, setSelectedInsurnceType] = useState("All");


    //Create the option tags for status
    const claimStatusOptions = claimStatuses.map(claimStatus => <option key={claimStatus.id} value={claimStatus.id}>{claimStatus.detail}</option>);
    

    // const searchText = searchParams.get("searchTerm") != null ? searchParams.get("searchTerm") : "";
    // const searchType = searchParams.get("searchType") != null ? searchParams.get("searchType") : "claimNumber";

    // const searchedClaims = searchText === "" ? allClaims : allClaims.filter((claim) => (searchType === "claimNumber" && claim.number.startsWith(searchText.toUpperCase())) ||
    //     (searchType === "policyNumber" && claim.policy_number.startsWith(searchText.toUpperCase())) || (searchType === "surname" && (claim.customer_surname.toUpperCase().startsWith(searchText.toUpperCase())))
    // );


    console.log(selectedClaimType);
    

    const openCloseClaims = allClaims.filter((claim, index) => {
        
    return selectedClaimType==="Open" ? claim.status.id <=3 : claim.status.id >3;
    });

    console.log("open",openCloseClaims);
    console.log("all",allClaims);
    console.log("selectedStatus",selectedStatus);

    const searchedClaims = openCloseClaims;

    //Create the table rows 
    const displayClaims = searchedClaims.map((claim, index) => 
        ((claim.status.id === selectedStatus || selectedStatus === "All")
        && (claim.insuranceType.detail === selectedInsurnceType || selectedInsurnceType === "All")) &&
        <ClaimRow key={index} claim={claim} />
    );

    const changeStatus = (e) => {
        const option = e.target.options.selectedIndex;
        option === 0 ? setSelectedStatus("All") : setSelectedStatus(claimStatuses[option - 1].id);
        }

    const changeInsurnceType = (e) => {
        const option = e.target.options.selectedIndex;
        option === 0 ? setSelectedInsurnceType("All") : setSelectedInsurnceType(insuranceTypes[option - 1].detail);
    }

    const changeClaimType = (e) => {
        const option = e.target.options.selectedIndex;
        option === 0 ? setSelectedClaimType("Open") : setSelectedClaimType(claimTypes[option - 1].type);
        setSelectedStatus("All");
    }

    /* const changeTab = (e) => {
        e.preventDefault();
        setTypeOfStatus(!typeOfStatus);
        setAllClaims(getClaimsByOpenStatus(!typeOfStatus));
        setSelectedStatus("All");
    } */

    return (
        <Fragment>
            <div className="container my-1" >
                <div className="row p-1 pb-0 pe-lg-0 pt-lg-2 align-items-center rounded-3 border shadow-sm">
                    <div className="col-lg-12 p-1 p-lg-2 pt-lg-1" >
                        <h5>View Claims</h5>
                    </div>
                </div>
            </div>
             <div className="container my-1" >
                <div className={`row p-1 pb-0 pe-lg-0 pt-lg-3 align-items-center rounded-3 border shadow-sm `}>
                {/* <div className={`row p-1 pb-0 pe-lg-0 pt-lg-3 align-items-center rounded-3 border shadow-sm ${!typeOfStatus ? "tab-archived" : ""}`}> */}
   
                    <div className="col-lg-1 col-2 mb-4">
                        <label htmlFor="selectClaimStatus" className="form-label">Filter by: </label>
                    </div> 
                    <div className="col-lg-3 col-4 mb-4">
                        <select className="form-select" id="selectClaimStatus" name="selectClaimStatus" onChange={changeStatus}>
                            <option key="All" value="All">-- All Claim Status --</option>
                            {claimStatusOptions}
                        </select>
                    </div>
                    <div className="col-lg-3 col-4 mb-4">
                        <select className="form-select" id="selectPolicyType" name="selectPolicyType" onChange={changeInsurnceType}>
                            <option key="All" value="All">-- All Types --</option>
                            {insuranceTypesOptions}
                        </select>
                    </div>
                    <div className="col-lg-3 col-4 mb-4">
                        <select className="form-select" id="selectClaimType" name="selectClaimType" onChange={changeClaimType}>
                            <option key="Open" value="1">Open</option>
                            {claimTypesOptions}
                        </select>
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
                </div> 
             </div>
        </Fragment>
    );
}

export default ViewClaims;