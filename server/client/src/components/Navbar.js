import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import Img from "./images/Growceries.PNG";

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [button, setButton] = useState(true);
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    window.addEventListener("resize", showButton);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Navbar Logo */}
                    <Link to="/" className="img">
                        <img
                            src={Img}
                            alt="./images/Growceries"
                            width="220"
                            height="220"
                        />
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
