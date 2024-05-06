"use client"; // This is a client component

import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { usePathname } from 'next/navigation'

export default function NotFound() {
    const pathname = usePathname();
    return (
        <div>
            <Header pathname={pathname} />
            <div className="container">
                <h1 className="text-align-center margin-top-xxl">404 - Page not found</h1>
            </div>
            <Footer pathname={pathname} />
        </div>
    )
}