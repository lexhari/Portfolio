import ProjectItem from "../components/ProjectItem";

const projectData = [
    {
        title: "Hotel Property Management System in React JS",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project1",
        imageSrc: "/src/assets/images/placeholder.jpg" // Replace with your actual image paths
    },
    {
        title: "University Activity & Venue Request System Svelte Prototype",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project2",
        imageSrc: "/src/assets/images/placeholder.jpg" // Replace with your actual image paths
    },
    {
        title: "Personal Project",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project3",
        imageSrc: "/src/assets/images/placeholder.jpg" // Replace with your actual image paths
    },
    {
        title: "Mobile App",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageAlt: "Project4",
        imageSrc: "/src/assets/images/placeholder.jpg" // Replace with your actual image paths
    },
];

function Projects() {
    return (

        <div className="bg-creamBG px-horizontal py-20">
            <div className="grid grid-cols-2 grid-rows-3 gap-20">
                {projectData.map((project, index) => (
                    <ProjectItem
                        imageSrc={project.imageSrc}
                        imageAlt={project.imageAlt}
                        title={project.title}
                        description={project.description}
                    />
                ))}
                <div className="col-span-2">5</div>
            </div>
        </div>


    )
}
export default Projects;
