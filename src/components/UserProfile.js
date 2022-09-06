import { Fragment } from "react";
import TaskPanel from "./Tasks/TaskPanel";

const UserProfile = (props) => {
    return (
        <Fragment>
            <div className="container mb-0 mt-3" >
                <div className="row p-1 pb-0 pe-lg-0 pt-lg-2 align-items-center rounded-3 border shadow-sm background-allstate-blue">
                    <div className="col-lg-12 p-1 p-lg-2 pt-lg-1 text-white" >
                        <h5>Log in</h5>
                    </div>
                </div>
            </div>
            <div className="container my-1 text-left" >
                <div className="row p-1 pb-2 pe-lg-0 pt-lg-3 align-items-center rounded-3 border shadow-sm">
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputUserName">User Name</label>
                            <input type="email" className="form-control col-4" id="inputUserName" name="inputUserName" placeholder="Enter NTID" />
                        </div>
                        <div className="form-group  mt-2">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" name="inputPassword" placeholder="Password" />
                        </div>
                        <div className="form-group  mt-3">
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container my-1" >
                <div className="row p-1 pb-0 pe-lg-0 pt-lg-2 align-items-center rounded-3 border shadow-sm background-allstate-blue">
                    <div className="col-lg-12 p-1 p-lg-2 pt-lg-1 text-white" >
                        <h5>User Profile</h5>
                    </div>
                </div>
            </div>
            <div className="container my-1 text-left" >
                <div className="row p-1 pb-0 pe-lg-0 pt-lg-3 align-items-center rounded-3 border shadow-sm">
                    <div className="row gx-3 gy-2 mb-3">
                        <div className="col-md-4">
                            <label htmlFor="inputUserName" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="inputUserName" name="inputUserName" value="John Doe" disabled />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputUserDepartment" className="form-label">User Department</label>
                            <input type="text" className="form-control" id="inputUserDepartment" name="inputUserDepartment" value="Quick Claims" disabled />
                        </div>
                    </div>
                </div>
            </div>
            <TaskPanel claimStatus="showAll" />
        </Fragment>
    );
}

export default UserProfile;