import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 w-full bg-creamBG flex flex-row justify-between items-center px-12 py-4 z-[100]">
            <Link to="/" className="text-[#EA7DA5] text-xl font-extrabold font-norwige">Alexis Cardenas</Link>
            <div className="flex flex-row gap-10 items-center font-dm-sans">
                <div className="flex flex-row gap-4 items-center text-offBlack text-sm">
                    <Link to="/about">About</Link>
                    <Link to="/projects">Projects</Link>
                </div>
                <Button href="/resume.pdf" download={true} variant="primary">Resume</Button>
            </div>
        </nav>
    );
}

export default Navbar;
