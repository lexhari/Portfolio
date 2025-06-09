import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 w-full flex flex-row justify-between items-center px-12 py-6 z-[100]">
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
