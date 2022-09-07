import { Fragment, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { addNoteToClaim } from "../../Data/DataFunctions";
import NoteRow from "./NoteRow";

const NotesPanel = (props) => {
    const currentClaim = useSelector(state => state.currentClaim);

    const claimStatus = props.claimStatus != null ? props.claimStatus : "";
    const claimID = currentClaim != null ? currentClaim.id : "";
    
    //Empty Note
    const emptyNote = {
        id: 0, claimId: claimID, detail: "", date: ""
    };

    const newNoteReducer = (existingState, data) => {
        return { ...existingState, [data.field]: data.value };
    }

    const [newNote, dispatch] = useReducer(newNoteReducer, emptyNote);

    const { detail } = newNote;

    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    const [claimNotes, setClaimNotes] = useState(currentClaim.notes);

    const submitForm = (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage("Please wait - saving");
 
        const response = addNoteToClaim(newNote);
            response.then(result => {
                if (result.status === 200) {
                    setClaimNotes(result.data);
                    setMessage("Note added.")
                    setTimeout(() => setMessage(""), 3000);
                }
                else {
                    setMessage("Error when adding Note ", result.statusText)
                }
            })
                .catch(error => {
                    setMessage("Error when adding Note ", error);
                    setSaving(false);
                });

        dispatch({ field: "detail", value: "" });
        setSaving(false);
    }

    const handleChange = (e) => {
        const dataToChange = { field: e.target.id, value: e.target.value };
        dispatch(dataToChange);
        setMessage("");
    }

    //Create the note rows - matching on selected claim ID
    const displayNotes = claimNotes.map((note) => <NoteRow key={note.id} note={note} />);

    return (<Fragment>
        <div className="container mb-0 mt-3 text-left" >
            <div className="row p-1 pb-0 pe-lg-0 pt-lg-2 align-items-center rounded-3 border shadow-sm background-allstate-blue">
                <div className="col-lg-12 p-1 p-lg-2 pt-lg-1 text-white" >
                    <h5>Notes</h5>
                </div>
            </div>
        </div>
        <div className="container my-1 text-left" >
            <div className="row p-1 pb-0 pe-lg-0 pt-lg-3 align-items-center rounded-3 border shadow-sm">
                <table className="table">
                    <thead>
                        <tr className="table-light">
                            <th className="col-2 col-lg-1" scope="col">Date</th>
                            <th className="col-10 col-lg-11" scope="col">Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claimNotes.length === 0 ? <tr><td colSpan="2">None</td></tr> : displayNotes}
                    </tbody>
                </table>
                <hr />
                <form onSubmit={submitForm} className={`row ${claimStatus === "archived" ? "d-none" : ""}`}>
                    <div className="row gx-3 gy-2 mb-2">
                        <div className="col-md-12">
                            <label htmlFor="inputAddNote" className="form-label">Note</label>
                            <input type="text" className="form-control mb-3" id="detail" name="detail" onChange={handleChange} value={detail} required />
                            <button type="submit" className="btn btn-allstate-blue" disabled={saving}>Add Note</button>
                            <p>{message}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
    );
}

export default NotesPanel;