"use client"; // This is a client component

import Header from '../components/header';
import Footer from '../components/footer';
import { usePathname } from 'next/navigation';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export default function ContatPage() {
    const pathname = usePathname();
	return (
        <div>
            <Header pathname={pathname} />
            <div className="container margin-top-xxl">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Contact page</h1>
                        <p>This is a proof of concept project built by Neil Kelsey in 2024 for Ground Control</p>
                        <p>If you've got any questions about how I put this together, the design choices I made or anything else</p>
                        <p>I'd love to hear from you</p>
                        <h2>Get in touch</h2>
                        <p><strong><MdEmail size={15} /> Email</strong> neil.kelsey@gmail.com</p>
                        <p><strong><FaPhoneAlt size={15} /> Telephone</strong> 07814555319</p>
                    </div>
                </div>
            </div>
            <Footer pathname={pathname} />
        </div>
	);
}