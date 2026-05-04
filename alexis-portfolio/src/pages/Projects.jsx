import ProjectItem from "../components/project-item";
import Badge from "../components/badge";

const projectData = [
    {
        title: "Hotel Property Management System in React JS",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project1",
        imageSrc: "/src/assets/images/placeholder.jpg",
        containerRef: "#"
    },
    {
        title: "University Activity & Venue Request System Svelte Prototype",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project2",
        imageSrc: "/src/assets/images/placeholder.jpg" 
        // containerRef: "#project2" 
    },
    {
        title: "Personal Project",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project3",
        imageSrc: "/src/assets/images/placeholder.jpg" 
        // containerRef: "#project3" 
    },
    {
        title: "Mobile App",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project4",
        imageSrc: "/src/assets/images/placeholder.jpg" 
        // containerRef: "#project4" 
    },
    {
        title: "Organization Website",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project5",
        imageSrc: "/src/assets/images/placeholder.jpg" 
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
