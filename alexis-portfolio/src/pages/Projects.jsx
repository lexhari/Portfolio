import ProjectItem from "../components/project-item";
import Badge from "../components/badge";

const projectData = [
    {
        title: "Hotel Property Management System in React JS",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project1",
        imageSrc: "/src/assets/images/placeholder.jpg", // Replace with your actual image paths
        containerRef: "#"
    },
    {
        title: "University Activity & Venue Request System Svelte Prototype",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project2",
        imageSrc: "/src/assets/images/placeholder.jpg" // Replace with your actual image paths
        // containerRef: "#project2" // Uncomment if you have a specific section for this project
    },
    {
        title: "Personal Project",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project3",
        imageSrc: "/src/assets/images/placeholder.jpg" // Replace with your actual image paths
        // containerRef: "#project3" // Uncomment if you have a specific section for this project
    },
    {
        title: "Mobile App",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project4",
        imageSrc: "/src/assets/images/placeholder.jpg" // Replace with your actual image paths
        // containerRef: "#project4" // Uncomment if you have a specific section for this project
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
