import { Link, useNavigate } from "react-router-dom";
import React, { useReducer } from "react";
import { Dropdown } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import useAuth from "../hooks/useAuth";


interface HeaderProps {
    themeMode?: string; // Define the type for themeMode
    changeThemeMode?: any;
    toogleSidebarHide?: () => void;
    toogleMobileSidebarHide?: () => void;
    handleOffcanvasToggle?: () => void;
}


const Navbar = ({ handleOffcanvasToggle, changeThemeMode, toogleSidebarHide, toogleMobileSidebarHide }: HeaderProps) => {

    const {logout}=useAuth();
    const navigate=useNavigate();
    
    const handleLogout = (e:any) => {
        logout();
        navigate("/login");
    }

    return (
        <React.Fragment>
            <header className="pc-header" style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
                <div className="header-wrapper">
                    <div className="me-auto pc-mob-drp">
                        <ul className="list-unstyled">
                            <li className="pc-h-item pc-sidebar-collapse">
                                <h4 style={{marginRight:"25px"}}>Dream <h6><small>güzellik merkezi</small></h6> </h4>
                            </li>
                            <Dropdown as="li" className="pc-h-item d-inline-flex d-md-none">
                                <Dropdown.Toggle as="a" className="pc-head-link arrow-none m-0" data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    <i className="ph-duotone ph-magnifying-glass"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="pc-h-dropdown drp-search">
                                    <form className="px-3">
                                        <div className="form-group mb-0 d-flex align-items-center">
                                            <input type="search" className="form-control border-0 shadow-none" placeholder="Search here. . ." />
                                            <button className="btn btn-light-secondary btn-search">Search</button>
                                        </div>
                                    </form>
                                </Dropdown.Menu>
                            </Dropdown>
                            <li className="pc-h-item d-none d-md-inline-flex">
                                <form className="form-search">
                                    <i className="ph-duotone ph-magnifying-glass icon-search"></i>
                                    <input type="search" className="form-control" placeholder="Arama yap..." />
                                    <button className="btn btn-search" style={{ padding: "0" }}><kbd>ctrl+k</kbd></button>
                                </form>
                            </li>
                        </ul>
                    </div>

                    <div className="ms-auto">
                        <ul className="list-unstyled">
                            <Dropdown as="li" className="pc-h-item">
                                <Dropdown.Toggle as="a" className="pc-head-link arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    <i className="ph-duotone ph-diamonds-four"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end pc-h-dropdown">
                                    <Dropdown.Item>
                                        <i className="ph-duotone ph-user"></i>
                                        <span>My Account</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e: any) => handleLogout(e)}>
                                        <i className="ph-duotone ph-power"></i>
                                        <span>Çıkış yap</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown as="li" className="pc-h-item header-user-profile">
                                <Dropdown.Toggle className="pc-head-link arrow-none me-0" data-bs-toggle="dropdown" href="#"
                                    aria-haspopup="false" data-bs-auto-close="outside" aria-expanded="false" style={{ border: "none" }}>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                                    <div className="dropdown-header d-flex align-items-center justify-content-between">
                                        <h4 className="m-0">Profile</h4>
                                    </div>
                                    <div className="dropdown-body">
                                        <SimpleBar className="profile-notification-scroll position-relative" style={{ maxHeight: "calc(100vh - 225px)" }}>
                                            <ul className="list-group list-group-flush w-100">
                                                <li className="list-group-item">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                        </div>
                                                        <div className="flex-grow-1 mx-3">
                                                            <h5 className="mb-0">Carson Darrin</h5>
                                                            <a className="link-primary" href="mailto:carson.darrin@company.io">carson.darrin@company.io</a>
                                                        </div>
                                                        <span className="badge bg-primary">PRO</span>
                                                    </div>
                                                </li>
                                                
                                                <li className="list-group-item">
                                                    
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-bell"></i>
                                                            <span>Notifications</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-gear-six"></i>
                                                            <span>Settings</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                </li>
                                               
                                            </ul>
                                        </SimpleBar>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ul>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Navbar;