"use client"; // This is a client component

import Image from "next/image";
import Link from 'next/link';
import { TbWorld } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import { useToggle } from "../functions/useToggle";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = (props) => {
    const pathname = props.pathname;
    const [visible, toggle] = useToggle(false);
    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <h1 className="mobile-display-block mobile-text-align-center">
                            <a className="mobile-display-block mobile-text-align-center" href="https://www.groundcontrol.com/">
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
                    <div className="col-md-6 col-sm-12 text-align-center">
                        <div onClick={toggle} className="burger-menu">
                            {visible ? <IoClose size={30} /> : <RxHamburgerMenu size={30} />}
                        </div>
                        <ul className={visible ? "main-menu" : "mobile-invisible main-menu"}>
                            <li className={pathname === "/" ? "selected" : ""}><Link key={"/"} href={"/"}>Home</Link></li>
                            <li className={pathname === "/map" ? "selected" : ""}><Link key={"/map"} href={"/map"}>Map</Link></li>
                            <li className={pathname === "/contact" ? "selected" : ""}><Link key={"/contact"} href={"/contact"}>Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 text-align-right mobile-invisible">
                        <TbWorld size={20} className="header-icons margin-right-sm" />
                        <MdAccountCircle size={20} className="header-icons"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
