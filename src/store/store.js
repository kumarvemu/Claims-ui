import { configureStore } from "@reduxjs/toolkit";

const emptyClaim = {
    id: 0, policyNumber: "", status: { id: 0, detail: "", open: true }, insuranceType: { id: 0, detail: "Property"}, createdDate: "",
    claimStartedDate: "", customerFirstName: "", customerSurname: "", estimatedClaimValue: "", claimReason: "",
    incidentDescription: "", affectedAddress: "", relatedIncidentDate: "", anyFurtherDetails: "",
    amountPaid: "", make: "", model: "", modelYear: "", animalType: "", animalBreed: ""
};

const initialState = { claims: [], lastFetch: null, searchTerm: "", searchType: "claimNumber", currentClaim : emptyClaim, insuranceTypes : [], claimStatuses : [], taskStatuses : []};

const claimsReducer = (state = initialState, action) => {
    if (action.type === "clear-down") {
        return initialState;
    }
    // else if (action.type === "update-username") {
    //     return { ...state, userName: action.value}
    // }
    else if (action.type === "set-search-type") {
        return { ...state, searchType: action.value}
    }
    else if (action.type === "set-search-term") {
        return { ...state, searchTerm: action.value}
    }
    else if (action.type === "save-claims") {
        return { ...state, claims: action.value, lastFetch: new Date().getTime()}
    }
    else if (action.type === "set-current-claim") {
        return { ...state, currentClaim: action.value}
    }
    else if (action.type === "set-insurance-types") {
        return { ...state, insuranceTypes: action.value}
    }
    else if (action.type === "set-claim-statuses") {
        return { ...state, claimStatuses: action.value}
    }
    else if (action.type === "set-task-statuses") {
        return { ...state, taskStatuses: action.value}
    }
    else {
        console.log("unknown redux action" + action.type);
        return state;
    }

}

const claimsStore = configureStore({ reducer: claimsReducer });

export default claimsStore;