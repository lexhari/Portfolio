import Badge from "../components/Badge";

function About() {
    return (
        <div className="bg-creamBG">
            <section className="flex flex-row w-full h-screen bg-creamBG px-horizontal py-[100px] gap-12">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-full h-full bg-slate-300 rounded-xl hover:scale-110 hover:rotate-[3deg] transition-all duration-300">
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

            <section className="sticky top-0 w-full h-screen bg-slate-300">
                <img src="src/assets/images/placeholder.jpg" alt="about-1" className="w-full h-full object-cover" />
            </section>

            <section className="w-full h-fit bg-creamBG">
                <div className="relative flex flex-col gap-20 rounded-t-2xl px-horizontal py-14 bg-creamBG">
                    <Badge>The game changer</Badge>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-row gap-40 text-navy font-normal ">
                            <div className="w-1/2">
                                <p className="text-2xl font-bricolage-grotesque">In 2024, COMSCI@UP.BAG was left with 25 members graduating (a projected 47% drop in our active base); my team and I recognized the urgency to revitalize recruitment. </p>
                            </div>
                            <div className="w-1/2">
                                <p className="text-md font-dm-sans">Welcoming 56 participants during the Mass Orientation and achieving a 98% application confirmation rate. This became a notable increase from previous years.</p>
                            </div>
                        </div>
                        <div className="text-navy font-bricolage-grotesque text-4xl">
                            <p>We’re a growing, student-centered community—far from perfect, but driven by solutions. If there’s only one value I can take from this experience, it’s that <span className="font-bold">success is definitely a team game.</span></p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="sticky top-0 w-full h-screen bg-slate-300">
                <img src="src/assets/images/placeholder.jpg" alt="about-1" className="w-full h-full object-cover" />
            </section>

            <section className="w-full h-fit bg-creamBG">
                <div className="relative flex flex-col gap-20 rounded-t-2xl px-horizontal py-14 bg-creamBG">
                    <Badge>Everything else in between</Badge>

                    <div className="flex flex-row gap-40 font-bricolage-grotesque text-xl text-navy rounded-t-2xl">
                        <div className="flex flex-col gap-10">
                            <p>I’m a self-taught artist with a strong love for painting. This is where my spark for graphic visual design came from.</p>
                            <p>I enjoy playing video games, weight training, and hitting the golf driving range to unwind. I've also dabbled in producing music and playing instruments, though that passion is currently on pause (thanks to a student budget!).</p>
                        </div>
                        <div className="flex flex-col gap-10">
                            <p>I’d still describe myself as a bit of a girly pop at heart. I love expressing myself through fashion and makeup. It’s this balance of soft and strong that really shapes who I am, both personally and creatively.</p>
                            <p>I take every chance I get to travel with my family, but I also aspire to explore the world on my own one day. I’m especially passionate about learning different histories and cultures — I’m a bit of a nerd, and I find so much inspiration in how people live, create, and connect across the globe.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default About;
