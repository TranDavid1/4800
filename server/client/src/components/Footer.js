import React from 'react'
import './css/Footer.css'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    {/*Column 1 */}
                    <div className="column">
                        <h4>Column 1</h4>
                        <ul className="list">
                            <li><Link to="/" className="link">link</Link></li>
                            <li><Link to="/" className="link">link</Link></li>
                            <li><Link to="/" className="link">link</Link></li>
                        </ul>
                    </div>
                    {/*Column 2 */}
                    <div className="column">
                        <h4>Column 2</h4>
                        <ul className="list">
                            <li><Link to="/" className="link">link</Link></li>
                            <li><Link to="/" className="link">link</Link></li>
                            <li><Link to="/" className="link">link</Link></li>
                        </ul>
                    </div>
                    {/*Column 3 */}
                    <div className="column">
                        <h4>Column 3</h4>
                        <ul className="list">
                            <li><Link to="/" className="link">link</Link></li>
                            <li><Link to="/" className="link">link</Link></li>
                            <li><Link to="/" className="link">link</Link></li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="column2">
                        &copy;{new Date().getFullYear()} Wiggly Worms LLC | All rights reserved | Terms Of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Footer;