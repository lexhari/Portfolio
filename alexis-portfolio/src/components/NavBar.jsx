import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "./Button";

function Navbar() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // scroll down & scrolled past 100px
            setShow(false);
        } else { // scroll up
            setShow(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    return (
        <nav className={`fixed top-0 left-0 right-0 w-full flex flex-row justify-between items-center px-12 py-6 z-[100] transition-transform duration-300 ${
            show ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <Link to="/" className="text-navy text-xl font-extrabold font-norwige">ahgc</Link>
            <div className="flex flex-row gap-10 items-center font-dm-sans">
                <div className="flex flex-row gap-4 items-center text-navy text-sm">
                    <Button href="/projects" variant="link" className="text-navy no-underline font-semibold">Projects</Button>
                    <Button href="/about" variant="link" className="text-navy no-underline font-semibold">About</Button>
                </div>
                <Button href="/resume.pdf" download={true} variant="primary" className="text-navy">Resume</Button>
            </div>
        </nav>
    );
}

export default Navbar;
