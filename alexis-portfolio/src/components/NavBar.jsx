import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
    return (
        <nav className="bg-creamBG">
            <Link to="/">Alexis Cardenas</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Button text="Resume" href="/resume.pdf" download={true} />
        </nav>

    );
}

export default Navbar;
