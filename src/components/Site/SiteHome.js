import { Fragment } from "react";
import { Link } from "react-router-dom";

const SiteHome = (props) => {
  return (
    <Fragment>
      <div className="container my-3" >
        <div className="row p-1 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow">
          <div className="col-lg-4 p-3 p-lg-5 pt-lg-3" >
            <div className="d-flex flex-column align-items-center my-2 my-lg-0 me-lg-auto text-decoration-none text-allstate-blue menu-link">
              <Link to="/new" className="text-decoration-none text-allstate-blue menu-link">
                <p><b>Register New Claim</b></p>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 p-3 p-lg-5 pt-lg-3" >
            <div className="d-flex flex-column align-items-center my-2 my-lg-0 me-lg-auto text-decoration-none text-allstate-blue menu-link">
              <Link to="/list" className="text-decoration-none text-allstate-blue menu-link">
               <p><b> View Existing Claims</b></p>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 p-3 p-lg-5 pt-lg-3 text-white" >
            <div className="d-flex flex-column align-items-center my-2 my-lg-0 me-lg-auto text-decoration-none text-allstate-blue menu-link">
              <Link to="/Search" className="text-decoration-none text-allstate-blue menu-link">
                <p><b>Search Claim</b></p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SiteHome;