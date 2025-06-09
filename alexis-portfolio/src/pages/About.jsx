import Badge from "../components/Badge";

function About() {
    return (
        <div className="bg-creamBG">
            <section className="flex flex-row w-full h-screen bg-creamBG px-horizontal py-[100px] gap-12">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-full h-full bg-slate-300 rounded-xl">
                    </div>
                </div>
                <div className="w-full h-full flex flex-col justify-center gap-20">
                    <Badge>My name is Alexis...</Badge>
                    <p className="text-navy text-4xl font-medium font-bricolage-grotesque">
                        A Computer Science student at University of the Philippines. Specializing in UI/UX design and front-end development. Actively upskilling while open to freelance design work.
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-20 px-horizontal py-20">
                <Badge>Some things I can do</Badge>

                <div className="grid grid-cols-2 grid-rows-3 gap-10">
                    <div className="col-start-2 row-start-3 text-sm font-dm-sans text-offBlack">
                        <ul>
                            <li>Microsoft 365</li>
                            <li>Google Workspace</li>
                            <li>Notion</li>
                        </ul>
                    </div>
                    <div className="col-start-1 row-start-3 text-navy font-medium font-bricolage-grotesque">Productivity and Collaboration</div>
                    <div className="col-start-1 row-start-2 text-navy font-medium font-bricolage-grotesque">Design & Creation</div>
                    <div className="col-start-2 row-start-2 text-sm font-dm-sans text-offBlack">
                        <ul>
                            <li>Figma</li>
                            <li>Canva</li>
                            <li>Adobe Photoshop, Illustrator, InDesign, Premiere Pro</li>
                            <li>Wordpress</li>
                        </ul>
                    </div>
                    <div className="col-start-2 row-start-1 text-sm font-dm-sans text-offBlack">
                        <ul>
                            <li>HTML, Css, JavaScript</li>
                            <li>React JS, Svelte</li>
                            <li>Git</li>
                            <li>Java, Python, C++</li>
                        </ul>
                    </div>
                    <div className="col-start-1 row-start-1 text-navy font-medium font-bricolage-grotesque">Tech & Development</div>
                </div>

            </section>

            <section className="sticky top-0 w-full h-screen bg-creamBG ">
                <div className="sticky top-0 w-full h-[50%] bg-slate-300 ">
                </div>
                <div className="absolute bottom-0 w-full h-[55%] bg-navy rounded-t-2xl px-horizontal">
                    <Badge>The game changer</Badge>

                    <div className="flex flex-row gap-10">
                        <div>a</div>
                        <div>b</div>
                    </div>
                    <div>c</div>
                </div>
            </section>

            <section className="sticky top-0 w-full h-screen bg-creamBG ">
                <div className="sticky top-0 w-full h-[50%] bg-slate-300 ">
                </div>
                <div className="absolute bottom-0 w-full h-[55%] bg-navy rounded-t-2xl px-horizontal">
                    <Badge>The game changer</Badge>

                    <div className="flex flex-row gap-10">
                        <div>a</div>
                        <div>b</div>
                    </div>
                    <div>c</div>
                </div>
            </section>
        </div>
    )
}
export default About;
