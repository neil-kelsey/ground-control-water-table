"use client"; // This is a client component

import Image from "next/image";
import Link from 'next/link';
import { TbWorld } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";

const Header = (props) => {
    const pathname = props.pathname;
    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h1>
                            <a href="https://www.groundcontrol.com/">
                                <Image
                                    src="/site-logo.png"
                                    alt="Ground Control - Water Table"
                                    width={30}
                                    height={30}
                                    priority
                                />
                            </a>
                            Water table
                        </h1>
                    </div>
                    <div className="col-md-6 text-align-center">
                        <ul className="main-menu">
                            <li className={pathname === "/table" ? "selected" : ""}><Link key={"/table"} href={"/table"}>Home</Link></li>
                            <li className={pathname === "/map" ? "selected" : ""}><Link key={"/map"} href={"/map"}>Map</Link></li>
                            <li className={pathname === "/contact" ? "selected" : ""}><Link key={"/contact"} href={"/contact"}>Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 text-align-right">
                        <TbWorld size={25} className="header-icons margin-right-sm" />
                        <MdAccountCircle size={25} className="header-icons"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
