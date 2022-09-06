import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const SiteMenu = (props) => {
    const navClassName = "nav-link menu-link";
    const nonSelectedClassName = " text-white";
    const selectedClassName = "selected-link";

    const location = useLocation().pathname;

    const homeNavClassName = location === "/" ? selectedClassName : nonSelectedClassName;
    const newNavClassName = location === "/new" ? selectedClassName : nonSelectedClassName;
    const listNavClassName = location === "/list" ? selectedClassName : nonSelectedClassName;
    const userNavClassName = location === "/user" ? selectedClassName : nonSelectedClassName;

    return (
        <Fragment>
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                    <Link to="/" className={`${navClassName} ${homeNavClassName}`}>
                        <svg className="bi d-block mx-auto mb-1" width="24" height="24"><use xlinkHref="#Property" /></svg>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/new" className={`${navClassName} ${newNavClassName}`}>
                        <svg className="bi d-block mx-auto mb-1" width="24" height="24"><use xlinkHref="#newclaim" /></svg>
                        New Claim
                    </Link>
                </li>
                <li>
                    <Link to="/list" className={`${navClassName} ${listNavClassName}`}>
                        <svg className="bi d-block mx-auto mb-1" width="24" height="24"><use xlinkHref="#grid" /></svg>
                        View Claims
                    </Link>
                </li>
                <li>
                    <Link to="/user" className={`${navClassName} ${userNavClassName}`}>
                        <svg className="bi d-block mx-auto mb-1" width="24" height="24"><use xlinkHref="#people-circle" /></svg>
                        User
                    </Link>
                </li>
            </ul>
        </Fragment>
    );
}

export default SiteMenu;