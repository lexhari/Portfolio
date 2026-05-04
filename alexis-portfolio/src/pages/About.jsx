import Badge from "../components/badge";
import gradPic from '../assets/images/grad-pic.jpg';
import recentEvent from '../assets/images/recent-event.jpg';
import collage from '../assets/images/collage.jpg';

function About() {
    return (
        <div className="bg-creamBG">
            <section className="flex flex-row w-full h-screen bg-creamBG px-horizontal py-[100px] gap-12">
                <div className="w-1/3 h-full flex flex-col justify-center items-center">
                    <div className="flex overflow-hidden w-full h-full rounded-xl hover:scale-110 hover:rotate-[-3deg] transition-all duration-300">
                        <img src={gradPic} alt="about-1" className="w-full object-cover object-top" />
                    </div>
                </div>
                <div className="w-2/3 h-full flex flex-col justify-center gap-20">
                    <Badge>My name is Alexis...</Badge>
                    <p className="text-navy text-4xl font-medium font-bricolage-grotesque">
                        A graduating Computer Science student at University of the Philippines. Skilled in <span className='font-semibold text-yellow'>Software Quality Assurance, UI/UX design and front-end development</span>. Open to entry-level opportunities.
                    </p>
                </div>
            </section>

            <section className="flex flex-row gap-20 px-horizontal py-20">
                <div className="w-1/2 flex flex-col gap-10">
                    <div className="flex flex-col gap-10">
                        <Badge>Work Experience</Badge>
                        <div className="w-full">
                            <ul>
                                <li className="w-full flex justify-between text-md text-navy font-medium font-bricolage-grotesque"><span>Quality Assurance Associate - Intern</span><span className="text-xs font-dm-sans text-offBlack italic">Nov 2025 - Jan 2026</span></li>
                                <p className="text-xs font-dm-sans text-offBlack italic mb-2">Raykan Technologies, Remote </p>
                                <ul className="list-disc ml-5 text-sm font-dm-sans text-offBlack mb-5">
                                    <li>Supported the team's QA process by identifying and tracking 70+ defects in a Scrum setting, escalating critical blockers to ensure all work met our agreed Definition of Done</li>
                                    <li>Refined 350+ test cases to have clear delivery guides, making requirements easier for the team to understand</li>
                                    <li>Supported improvement by standardizing QA SoPs, creating an onboarding document, and orienting 2 co-interns</li>
                                </ul>
                                <li className="w-full flex justify-between text-md text-navy font-medium font-bricolage-grotesque"><span>Front-end Software Engineer Intern</span><span className="text-xs font-dm-sans text-offBlack italic">June 2025 - July 2025</span></li>
                                <p className="text-xs font-dm-sans text-offBlack italic mb-2">University of the Philippines Baguio </p>
                                <ul className="list-disc ml-5 text-sm font-dm-sans text-offBlack">
                                    <li>Built front-end and scripting modules for a university academic portal using Vue.js, Laravel, and PostgreSQL</li>
                                    <li>Assisted the Digital Innovation Center in analyzing and digitizing manual academic processes</li>
                                </ul>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <Badge>Some things I can do</Badge>

                        <div className="grid grid-cols-2 grid-rows-3 gap-10">
                            <div className="col-start-2 row-start-3 text-sm font-dm-sans text-offBlack">
                                <ul>
                                    <li>Azure DevOps</li>
                                    <li>Microsoft 365</li>
                                    <li>Google Workspace</li>
                                    <li>Notion</li>
                                </ul>
                            </div>
                            <div className="col-start-1 row-start-3 text-navy font-medium font-bricolage-grotesque">Productivity & Collaboration</div>
                            <div className="col-start-1 row-start-2 text-navy font-medium font-bricolage-grotesque">Design & Creation</div>
                            <div className="col-start-2 row-start-2 text-sm font-dm-sans text-offBlack">
                                <ul>
                                    <li>Figma</li>
                                    <li>Canva</li>
                                    <li>Adobe Photoshop, Illustrator, InDesign, Premiere Pro</li>
                                    <li>Wix, Wordpress</li>
                                </ul>
                            </div>
                            <div className="col-start-2 row-start-1 text-sm font-dm-sans text-offBlack">
                                <ul>
                                    <li>HTML, Css, JavaScript</li>
                                    <li>React JS, Svelte</li>
                                    <li>Git</li>
                                    <li>Java, Python, C++</li>
                                    <li>Playwright</li>
                                    <li>Gen AI-assisted Development</li>
                                </ul>
                            </div>
                            <div className="col-start-1 row-start-1 text-navy font-medium font-bricolage-grotesque">Tech & Development</div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-10">
                    <Badge>Volunteer Experience</Badge>
                    <div className="w-full">
                        <ul>
                            <li className="w-full flex justify-between text-md text-navy font-medium font-bricolage-grotesque"><span>Chief Operations & Events Officer</span><span className="text-xs font-dm-sans text-offBlack italic">Aug 2025 - Present</span></li>
                            <p className="text-xs font-dm-sans text-offBlack italic mb-2">AWS Learning Club - UP Baguio</p>
                            <ul className="list-disc ml-5 text-sm font-dm-sans text-offBlack mb-5">
                                <li>Directed end-to-end operations for a face-to-face e-sports event promoting AWS, overseeing holistic execution</li>
                            </ul>
                            <li className="w-full flex justify-between text-md text-navy font-medium font-bricolage-grotesque"><span>Alumni Relations Officer</span><span className="text-xs font-dm-sans text-offBlack italic">Jun 2025 - Present</span></li>
                            <p className="text-xs font-dm-sans text-offBlack italic mb-2">COMSCI@UP.BAG</p>
                            <ul className="list-disc ml-5 text-sm font-dm-sans text-offBlack mb-5">
                                <li>Spearheaded an end-to-end alumni homecoming bringing together 45 members from 1998 to present</li>
                            </ul>
                            <li className="w-full flex justify-between text-md text-navy font-medium font-bricolage-grotesque"><span>GitHub Workshop Speaker</span><span className="text-xs font-dm-sans text-offBlack italic">Sep 2025</span></li>
                            <p className="text-xs font-dm-sans text-offBlack italic mb-2">COMSCI@UP.BAG</p>
                            <ul className="list-disc ml-5 text-sm font-dm-sans text-offBlack mb-5">
                                <li>Assisted in teaching a live workshop on GitHub basics with 50+ active participants</li>
                                <li>Provided access to recorded content for 70+ registered attendees, extending the impact beyond the live session</li>
                                <li>Designed hands-on activities to help students apply version control in collaborative academic and personal projects</li>
                            </ul>
                            <li className="w-full flex justify-between text-md text-navy font-medium font-bricolage-grotesque"><span>Chief Creative Officer</span><span className="text-xs font-dm-sans text-offBlack italic">Sep 2024 - Jun 2025</span></li>
                            <p className="text-xs font-dm-sans text-offBlack italic mb-2">AWS Learning Club - UP Baguio</p>
                            <ul className="list-disc ml-5 text-sm font-dm-sans text-offBlack mb-5">
                                <li>Designed the logo and general brand identity from scratch</li>
                                <li>Created the brand identity for the flagship event "T3.Horizon," attracting 60-70 participants</li>
                            </ul>
                            <li className="w-full flex justify-between text-md text-navy font-medium font-bricolage-grotesque"><span>Vice President for Internal Affairs</span><span className="text-xs font-dm-sans text-offBlack italic">Jul 2024 - Jun 2025</span></li>
                            <p className="text-xs font-dm-sans text-offBlack italic mb-2">COMSCI@UP.BAG</p>
                            <ul className="list-disc ml-5 text-sm font-dm-sans text-offBlack mb-5">
                                <li>Led crisis response to a projected 47% drop in membership, re-launching an optimized in-person end-to-end onboarding process post-pandemic that welcomed 56 orientation participants, achieving a record 98% application confirmation rate and successfully welcoming 23 new members</li>
                                <li>Facilitated knowledge-sharing and networking events for 80+ total participants, driving community engagement</li>
                            </ul>
                            <li className="w-full flex justify-between text-md text-navy font-medium font-bricolage-grotesque"><span>Public Relations Officer</span><span className="text-xs font-dm-sans text-offBlack italic">Jul 2023 - Mar 2024</span></li>
                            <p className="text-xs font-dm-sans text-offBlack italic mb-2">COMSCI@UP.BAG</p>
                            <ul className="list-disc ml-5 text-sm font-dm-sans text-offBlack">
                                <li>Boosted social media engagement by 163% to 690%, achieving an average of 79 interactions on key campaigns</li>
                                <li>Led the Public Relations team in developing compelling social media content and creative materials for various events</li>
                            </ul>
                        </ul>
                    </div>
                </div>


            </section>

            <section className="sticky top-0 w-full h-screen bg-slate-300">
                <img src={recentEvent} alt="about-1" className="w-full h-full object-cover" />
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
                                <p className="text-md font-dm-sans">Welcoming 56 participants during the Mass Orientation and achieving a 98% application confirmation rate. This became a notable increase from previous years. Today, my mentees also actively contribute to the community's growth, making sure to provide service and guidance to both residents and non-members.</p>
                            </div>
                        </div>
                        <div className="text-navy font-bricolage-grotesque text-4xl">
                            <p>We’re a growing, student-centered community—far from perfect, but driven by solutions. If there’s only one value I can take from this experience, it’s that <span className="font-bold">success is definitely a team game.</span></p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="sticky top-0 w-full h-screen bg-slate-300">
                <img src={collage} alt="about-1" className="w-full h-full object-cover" />
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
                            <p>Despite being in male-dominated interesets, I’d still describe myself as a girly pop at heart. I love expressing myself through fashion and makeup. It’s this balance of soft and strong that really shapes who I am, both personally and creatively.</p>
                            <p>I take every chance I get to travel with my family, but I also aspire to explore the world on my own one day. I’m especially passionate about learning different histories and cultures — I’m a bit of a nerd, and I find so much inspiration in how people live, create, and connect across the globe.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default About;
