import axios from "axios";

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

const taskStatuses = [
    { id: 101, value: 1, detail: "Open" },
    { id: 102, value: 2, detail: "Closed" }
];

const statuses = [
    { id: 1, open: true, detail: "Awaiting Assessment" },
    { id: 2, open: true, detail: "In Progress" },
    { id: 3, open: true, detail: "Awaiting Payment" },
    { id: 4, open: false, detail: "Accepted & Paid" },
    { id: 5, open: false, detail: "Transferred to Main Claims" },
    { id: 6, open: false, detail: "Rejected" }
];

const insuranceTypes = [
    { id: 101, value: 1, type: "Property" },
    { id: 102, value: 2, type: "Motor" },
    { id: 103, value: 3, type: "Pet" },
];

const claims = [
    {
        id: 101, number: "1234567890", policy_number: "156725657625", status: 1, insurance_type: "Property", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "John", customer_surname: "Doe", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "Skoda", model: "Fabia", modelYear: "1990", animal_type: "horse", animal_breed: "big"
    },
    {
        id: 102, number: "9234567890", policy_number: "156725657625", status: 6, insurance_type: "Motor", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "Tom", customer_surname: "Doe", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "Skoda", model: "Fabia", modelYear: "1990", animal_type: "horse", animal_breed: "big"
    },
    {
        id: 103, number: "5555678901", policy_number: "987625657625", status: 2, insurance_type: "Motor", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "Mary", customer_surname: "Jones", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "Skoda", model: "Fabia", modelYear: "1990", animal_type: "", animal_breed: ""
    },
    {
        id: 104, number: "7774567890", policy_number: "54625657625", status: 1, insurance_type: "Pet", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "Colin", customer_surname: "O'Neill", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "", model: "", modelYear: "", animal_type: "horse", animal_breed: "big"
    },
    {
        id: 105, number: "14524567890", policy_number: "234725657625", status: 6, insurance_type: "Property", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "Andrea", customer_surname: "Green", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "", model: "", modelYear: "", animal_type: "horse", animal_breed: "big"
    },
    {
        id: 106, number: "3689567890", policy_number: "153455657625", status: 1, insurance_type: "Property", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "John", customer_surname: "Smith", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "", model: "", modelYear: "", animal_type: "horse", animal_breed: "big"
    },
    {
        id: 107, number: "3454567890", policy_number: "157895657625", status: 6, insurance_type: "Pet", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "Emma", customer_surname: "White", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "", model: "", modelYear: "", animal_type: "horse", animal_breed: "big"
    },
    {
        id: 108, number: "6984567890", policy_number: "567725657625", status: 2, insurance_type: "Pet", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "Steven", customer_surname: "Jones", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "", model: "", modelYear: "", animal_type: "horse", animal_breed: "big"
    },
    {
        id: 109, number: "9874567890", policy_number: "156725657625", status: 3, insurance_type: "Pet", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "Tom", customer_surname: "Smith", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "1 Main Street, Main Town", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "", model: "", modelYear: "", animal_type: "horse", animal_breed: "big"
    },
    {
        id: 110, number: "2454567890", policy_number: "156725657625", status: 4, insurance_type: "Motor", created_date: "2017-01-31",
        claim_started_date: "2017-01-31", customer_first_name: "Michael", customer_surname: "Smith", estimated_claim_value: "100", claim_reason: "It broke",
        incident_description: "Something went wrong", affected_address: "", related_claim_date: "2017-01-31", any_further_details: "None",
        amount_paid: "100", make: "Mercedes", model: "A Class", modelYear: "2021", animal_type: "", animal_breed: ""
    }
];

let notes = [
    { id: 101, claim_id: 103, detail: "Everything Looks good", date: "2022-01-31" },
    { id: 102, claim_id: 102, detail: "Great Claim", date: "2022-01-31" },
    { id: 103, claim_id: 108, detail: "Unlikely to be processed", date: "2022-01-31" },
    { id: 104, claim_id: 108, detail: "Good Note", date: "2022-01-22" },
    { id: 105, claim_id: 101, detail: "Best Claim ever", date: "2022-01-23" },
    { id: 106, claim_id: 101, detail: "Full Note details", date: "2022-01-24" },
    { id: 107, claim_id: 109, detail: "This is the first note on this claim", date: "2022-01-25" },
    { id: 108, claim_id: 103, detail: "Just test data note", date: "2022-01-31" },
    { id: 109, claim_id: 105, detail: "More details", date: "2022-01-31" },
    { id: 110, claim_id: 104, detail: "Do something else", date: "2022-01-30" },
    { id: 111, claim_id: 107, detail: "Do something else", date: "2022-04-29" }
];

let tasks =
    [
        { id: 101, claim_id: 103, claim_number: "5555678901", detail: "Contact Customer", status: "Open", date: "2017-01-01" },
        { id: 102, claim_id: 110, claim_number: "2454567890", detail: "Complete form", status: "Closed", date: "2019-01-08" },
        { id: 103, claim_id: 110, claim_number: "2454567890", detail: "Check details", status: "Open", date: "2018-01-07" },
        { id: 104, claim_id: 101, claim_number: "1234567890", detail: "Return form", status: "Open", date: "2017-04-07" },
        { id: 105, claim_id: 102, claim_number: "9234567890", detail: "Need to open a new claim", status: "Closed", date: "2022-01-31" },
        { id: 106, claim_id: 104, claim_number: "7774567890", detail: "First task of this claim", status: "Open", date: "2022-01-31" },
        { id: 107, claim_id: 102, claim_number: "9234567890", detail: "Close all these tasks", status: "Closed", date: "2022-05-31" },
        { id: 108, claim_id: 103, claim_number: "5555678901", detail: "Another task", status: "Open", date: "2019-01-31" },
        { id: 109, claim_id: 103, claim_number: "5555678901", detail: "Complete form", status: "Open", date: "2018-01-31" }
    ];

//Claims
export const getAllClaims = () => {
    return claims;
}

export const getStatusDetail = (status) => statuses.find(it => it.id === parseInt(status));

export const getClaim = (claimId) => {
    return claims.find(it => it.id === parseInt(claimId));
}

export const getClaimsByOpenStatus = (status) => {
    return claims.filter(claim => getStatusDetail(claim.status).open === status);
}

export const registerNewClaim = (newClaim) => {
    const claimIds = claims.map(claim => claim.id);
    const maxClaimId = Math.max(...claimIds) + 1;

    const claimNumbers = claims.map(claim => claim.number);
    const maxClaimNumber = Math.max(...claimNumbers) + 1;

    const claimToAdd = {
        ...newClaim,
        id: maxClaimId,
        number: maxClaimNumber.toString(),
        status: 1,
        created_date: Date.now()
    };

    //claims.push(claimToAdd);

    const claimPromise = axios({
        url: "http://localhost:8080/api/claim",
        method: "POST", headers: headers, data: claimToAdd
    }
    );

    return claimPromise;
}

// export const addNewPayment = (payment) => {
//     const paymentsPromise = axios({url: "http://localhost:8080/api/claim",
//          method: "POST", headers: headers, data : payment }
//     );

//     return paymentsPromise;
// }

export const updateClaim = (newData) => {
    const position = claims.findIndex(it => it.id === +newData.id);
    const updatedClaim = { ...claims[position], ...newData };
    claims[position] = updatedClaim;
}

export const getInsuranceTypes = () => {
    return insuranceTypes;
}

export const getAllClaimStatuses = () => {
    return statuses;
}

//Tasks
export const getAllTasks = () => {
    return tasks;
}

export const getAllTaskStatuses = () => {
    return taskStatuses;
}

export const getTasksForClaim = (claimId) => {
    return tasks.filter(it => it.claim_id === claimId);
}

export const addTaskToClaim = (task) => {

    const highestTaskId = Math.max(...tasks.map(it => it.id)) + 1;

    const taskToAdd = {
        ...task,
        id: highestTaskId,
        claim_number: getClaim(task.claim_id).number,
        date: new Date().toISOString().substring(0, 10)
    };

    tasks.push(taskToAdd);

    return taskToAdd;
}

export const updateTaskStatus = (id, newStatus) => {
    tasks = tasks.map(it => it.id === id ? { ...it, status: newStatus } : it);
}

//Notes
export const getAllNotes = () => {
    return notes;
}

export const getNotesForClaim = (claimId) => {
    return notes.filter(it => it.claim_id === claimId);
}

export const addNoteToClaim = (note) => {
    const highestNoteId = Math.max(...notes.map(it => it.id)) + 1;

    const noteToAdd = {
        ...note,
        id: highestNoteId,
        date: new Date().toISOString().substring(0, 10)
    };

    notes.push(noteToAdd);

    return noteToAdd;
}