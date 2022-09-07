import axios from "axios";

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

// const taskStatuses = [
//     { id: 101, value: 1, detail: "Open" },
//     { id: 102, value: 2, detail: "Closed" }
// ];

// const statuses = [
//     { id: 1, open: true, detail: "Awaiting Assessment" },
//     { id: 2, open: true, detail: "In Progress" },
//     { id: 3, open: true, detail: "Awaiting Payment" },
//     { id: 4, open: false, detail: "Accepted & Paid" },
//     { id: 5, open: false, detail: "Transferred to Main Claims" },
//     { id: 6, open: false, detail: "Rejected" }
// ];

// const insuranceTypes = [
//     { id: 101, value: 1, type: "Property" },
//     { id: 102, value: 2, type: "Motor" },
//     { id: 103, value: 3, type: "Pet" },
// ];

// const claims = [
//     {
//         id: 101, number: "1234567890",  policyNumber: "156725657625", status: 1,  insuranceType: "Property",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "John",  customerSurname: "Doe",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "1 Main Street, Main Town", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "Skoda", model: "Fabia", modelYear: "1990", animalType: "horse", animalBreed: "big"
//     },
//     {
//         id: 102, number: "9234567890",  policyNumber: "156725657625", status: 6,  insuranceType: "Motor",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "Tom",  customerSurname: "Doe",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "1 Main Street, Main Town", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "Skoda", model: "Fabia", modelYear: "1990", animalType: "horse", animalBreed: "big"
//     },
//     {
//         id: 103, number: "5555678901",  policyNumber: "987625657625", status: 2,  insuranceType: "Motor",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "Mary",  customerSurname: "Jones",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "1 Main Street, Main Town", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "Skoda", model: "Fabia", modelYear: "1990", animalType: "", animalBreed: ""
//     },
//     {
//         id: 104, number: "7774567890",  policyNumber: "54625657625", status: 1,  insuranceType: "Pet",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "Colin",  customerSurname: "O'Neill",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "1 Main Street, Main Town", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "", model: "", modelYear: "", animalType: "horse", animalBreed: "big"
//     },
//     {
//         id: 105, number: "14524567890",  policyNumber: "234725657625", status: 6,  insuranceType: "Property",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "Andrea",  customerSurname: "Green",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "1 Main Street, Main Town", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "", model: "", modelYear: "", animalType: "horse", animalBreed: "big"
//     },
//     {
//         id: 106, number: "3689567890",  policyNumber: "153455657625", status: 1,  insuranceType: "Property",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "John",  customerSurname: "Smith",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "1 Main Street, Main Town", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "", model: "", modelYear: "", animalType: "horse", animalBreed: "big"
//     },
//     {
//         id: 107, number: "3454567890",  policyNumber: "157895657625", status: 6,  insuranceType: "Pet",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "Emma",  customerSurname: "White",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "1 Main Street, Main Town", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "", model: "", modelYear: "", animalType: "horse", animalBreed: "big"
//     },
//     {
//         id: 108, number: "6984567890",  policyNumber: "567725657625", status: 2,  insuranceType: "Pet",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "Steven",  customerSurname: "Jones",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "1 Main Street, Main Town", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "", model: "", modelYear: "", animalType: "horse", animalBreed: "big"
//     },
//     {
//         id: 109, number: "9874567890",  policyNumber: "156725657625", status: 3,  insuranceType: "Pet",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "Tom",  customerSurname: "Smith",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "1 Main Street, Main Town", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "", model: "", modelYear: "", animalType: "horse", animalBreed: "big"
//     },
//     {
//         id: 110, number: "2454567890",  policyNumber: "156725657625", status: 4,  insuranceType: "Motor",  createdDate: "2017-01-31",
//         claimStartedDate: "2017-01-31",  customerFirstName: "Michael",  customerSurname: "Smith",  estimatedClaimValue: "100", claimReason: "It broke",
//         incidentDescription: "Something went wrong", affectedAddress: "", relatedIncidentDate: "2017-01-31", anyFurtherDetails: "None",
//         amountPaid: "100", make: "Mercedes", model: "A Class", modelYear: "2021", animalType: "", animalBreed: ""
//     }
// ];

// let notes = [
//     { id: 101, claim_id: 103, detail: "Everything Looks good", date: "2022-01-31" },
//     { id: 102, claim_id: 102, detail: "Great Claim", date: "2022-01-31" },
//     { id: 103, claim_id: 108, detail: "Unlikely to be processed", date: "2022-01-31" },
//     { id: 104, claim_id: 108, detail: "Good Note", date: "2022-01-22" },
//     { id: 105, claim_id: 101, detail: "Best Claim ever", date: "2022-01-23" },
//     { id: 106, claim_id: 101, detail: "Full Note details", date: "2022-01-24" },
//     { id: 107, claim_id: 109, detail: "This is the first note on this claim", date: "2022-01-25" },
//     { id: 108, claim_id: 103, detail: "Just test data note", date: "2022-01-31" },
//     { id: 109, claim_id: 105, detail: "More details", date: "2022-01-31" },
//     { id: 110, claim_id: 104, detail: "Do something else", date: "2022-01-30" },
//     { id: 111, claim_id: 107, detail: "Do something else", date: "2022-04-29" }
// ];

// let tasks =
//     [
//         { id: 101, claim_id: 103, claim_number: "5555678901", detail: "Contact Customer", status: "Open", date: "2017-01-01" },
//         { id: 102, claim_id: 110, claim_number: "2454567890", detail: "Complete form", status: "Closed", date: "2019-01-08" },
//         { id: 103, claim_id: 110, claim_number: "2454567890", detail: "Check details", status: "Open", date: "2018-01-07" },
//         { id: 104, claim_id: 101, claim_number: "1234567890", detail: "Return form", status: "Open", date: "2017-04-07" },
//         { id: 105, claim_id: 102, claim_number: "9234567890", detail: "Need to open a new claim", status: "Closed", date: "2022-01-31" },
//         { id: 106, claim_id: 104, claim_number: "7774567890", detail: "First task of this claim", status: "Open", date: "2022-01-31" },
//         { id: 107, claim_id: 102, claim_number: "9234567890", detail: "Close all these tasks", status: "Closed", date: "2022-05-31" },
//         { id: 108, claim_id: 103, claim_number: "5555678901", detail: "Another task", status: "Open", date: "2019-01-31" },
//         { id: 109, claim_id: 103, claim_number: "5555678901", detail: "Complete form", status: "Open", date: "2018-01-31" }
//     ];

// //Claims
// export const getAllClaims = () => {
//     return claims;
// }

export const getAllClaims = () => { 
    const headers = {'Accept': 'application/json' };

    const claimPromise = axios({
        url: "http://localhost:8080/api/claim",
        method: "GET", headers: headers
    }
    );

    return claimPromise;
}

export const getClaimsByOpenStatus = (status) => {
    const headers = {'Accept': 'application/json' };

    const claimPromise = axios({
        url: "http://localhost:8080/api/claim?open=" + status,
        method: "GET", headers: headers
    }
    );

    return claimPromise;
}

export const getClaimById = (id) => {
    const headers = {'Accept': 'application/json' };

    const claimPromise = axios({
        url: "http://localhost:8080/api/claim/" + id,
        method: "GET", headers: headers
    }
    );
    return claimPromise;
}


export const registerNewClaim = (newClaim) => {
    //const claimToAdd = newClaim.map(({ id, amountPaid, createdDate, status, ...rest }) => rest)
debugger
    const claimPromise = axios({
        url: "http://localhost:8080/api/claim",
        method: "POST", headers: headers, data: newClaim
    }
    );

    return claimPromise;
}


export const updateClaim = (id, data) => {
    
    const claimPromise = axios({
        url: "http://localhost:8080/api/claim/" + id,
        method: "PUT", headers: headers, data: data
    }
    );

    return claimPromise;
}

export const getInsuranceTypes = () => {
    const headers = {'Accept': 'application/json' };

    const insuranceTypePromise = axios({
        url: "http://localhost:8080/api/insurance-type",
        method: "GET", headers: headers
    }
    );

    return insuranceTypePromise;
}

// export const getAllClaimStatuses = () => {
//     return statuses;
// }

export const getAllClaimStatuses = () => {
    const headers = {'Accept': 'application/json' };

    const claimStatusPromise = axios({
        url: "http://localhost:8080/api/claim-status",
        method: "GET", headers: headers
    }
    );

    return claimStatusPromise;
}

//Tasks
// export const getAllTasks = () => {
//     return tasks;
// }

    export const getAllOpenTasks = () => {
        const headers = {'Accept': 'application/json' };
    
        const taskPromise = axios({
            url: "http://localhost:8080/api/task?open=true",
            method: "GET", headers: headers
        }
        );
    
        return taskPromise;
    }

    export const addNewTask = (task) => {
    debugger
        const taskPromise = axios({
            url: "http://localhost:8080/api/task",
            method: "POST", headers: headers, data: task
        }
        );
    
        return taskPromise;
    }

    export const updateTask = (id, data) => {
    debugger
        const taskPromise = axios({
            url: "http://localhost:8080/api/task/" + id,
            method: "PUT", headers: headers, data: data
        }
        );
    
        return taskPromise;
    }

// export const getAllTaskStatuses = () => {
//     return taskStatuses;
// }

export const getAllTaskStatuses = () => {
    const headers = {'Accept': 'application/json' };

    const taskStatusPromise = axios({
        url: "http://localhost:8080/api/task-status",
        method: "GET", headers: headers
    }
    );

    return taskStatusPromise;
}


export const addNoteToClaim = (note) => {
    debugger
    const notePromise = axios({
        url: "http://localhost:8080/api/claim/"+note.claimId+"/note",
        method: "POST", headers: headers, data: {"detail" : note.detail}
    }
    );

    return notePromise;
}
