"use client"; // This is a client component

import Image from "next/image";
import Link from 'next/link';

const Footer = (props) => {
    const pathname = props.pathname;
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-align-center">
                        <ul className="footer-menu">
                            <li className={pathname === "/contact" ? "selected" : ""}><Link key={"/contact"} href={"/contact"}>Contact</Link></li>
                            <li>© Ground Control 2024</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
