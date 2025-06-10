import { Link } from "react-router-dom";
import Button from "./Button";
import { ArrowUpRight } from "lucide-react";

function Footer() {
    return (
        <footer className="h-screen bg-gradient-to-b from-navy to-[#001D31] text-creamBG font-bricolage-grotesque flex flex-row justify-between items-center px-horizontal py-20">
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col text-6xl gap-4">
                    <Button href="/" variant="link2" className="no-underline">Home</Button>
                    <Button href="/about" variant="link2" className="no-underline">About me</Button>
                    <Button href="/projects" variant="link2" className="no-underline">Projects</Button>
                    <Button href="/resume.pdf" download={true} variant="link2" className=" no-underline">Resume</Button>
                </div>
                <p className="text-xs font-norwige">© 2025 ALEXIS HARRIET CARDENAS. All rights reserved.</p>
            </div>
            <div className="flex flex-col text-right justify-between h-full">
                <div>
                    <h1 className="text-8xl font-norwige font-extrabold">Contact me!</h1>
                    <Button href="mailto:cardenas.alexisharriet@gmail.com" variant="link" className="text-5xl">cardenas.alexisharriet@gmail.com</Button>
                </div>
                <div className="flex flex-col items-end gap-4">
                    <Button href="https://www.linkedin.com/in/lexharriet/" variant="outlined" newTab={true} className="flex flex-row gap-2">LinkedIn <ArrowUpRight className="w-auto h-auto"/></Button>
                    <Button href="https://github.com/lexhari" variant="outlined" newTab={true} className="flex flex-row gap-2">GitHub <ArrowUpRight className="w-auto h-auto"/></Button>
                    <Button href="https://www.instagram.com/lexharriet/" variant="outlined" newTab={true} className="flex flex-row gap-2">Instagram <ArrowUpRight className="w-auto h-auto"/></Button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;