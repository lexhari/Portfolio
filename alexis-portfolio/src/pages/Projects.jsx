import ProjectItem from "../components/project-item";
import Badge from "../components/badge";

const projectData = [
    {
        title: "Hotel Property Management System in React JS",
        description: "I led a team of 6 to create a hotel property management system for a client  featuring booking, guest, and facility management. I was responsible for business discussions, front-end development and UI/UX design.",
        imageAlt: "Project1",
        imageSrc: "/src/assets/images/hotelpms.png",
        containerRef: "#"
    },
    {
        title: "University Activity & Venue Request System Svelte Prototype",
        description: "I led a team of 4 to develop a Svelte prototype for managing university activities and venue requests. I was responsible for the front-end development.",
        imageAlt: "Project2",
        imageSrc: "/src/assets/images/placeholder.jpg" 
        // containerRef: "#project2" 
    },
    {
        title: "Revamped Hotel Business Website",
        description: "I redesigned a client's hotel business website to improve aesthetic and user experience.",
        imageAlt: "Project3",
        imageSrc: "/src/assets/images/hotelwebsite.png" 
        // containerRef: "#project3" 
    },
    {
        title: "COMSCI@UP.BAG Website",
        description: "I led a team of 5 students to create a front-end website for COMSCI@UP.BAG. I was responsible for the end-to-end UI/UX design.",
        imageAlt: "Project4",
        imageSrc: "/src/assets/images/orgwebsite.png" 
        // containerRef: "#project5" 
    },
];

function Projects() {
    return (

        <div className="bg-creamBG px-horizontal py-20">
            <div className="mt-5 mb-10">
                <Badge>Development</Badge>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-20">
                {projectData.map((project, index) => (
                    <ProjectItem
                        imageSrc={project.imageSrc}
                        imageAlt={project.imageAlt}
                        title={project.title}
                        description={project.description}
                    />
                ))}
            </div>

            <div className="mt-20 mb-10">
                <Badge>Design</Badge>
            </div>
            <div>
            </div>
        </div>


    )
}
export default Projects;
