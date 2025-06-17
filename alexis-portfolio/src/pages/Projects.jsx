import ProjectItem from "../components/ProjectItem";

    const projectData = [
        {
            title: "Hotel Property Management System in React JS",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            imageAlt: "Project1",
            imageSrc: "/assets/images/placeholder.png" // Replace with your actual image paths
        },
        {
            title: "University Activity & Venue Request System Svelte Prototype",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            imageAlt: "Project2",
            imageSrc: "/assets/images/placeholder.png" // Replace with your actual image paths
        },
        {
            title: "Personal Project",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            imageAlt: "Project3",
            imageSrc: "/assets/images/placeholder.png" // Replace with your actual image paths
        },
        {
            title: "Mobile App",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            imageAlt: "Project4",
            imageSrc: "/assets/images/placeholder.png" // Replace with your actual image paths
        },
    ];

function Projects() {
    return (
        <section className="w-full h-screen bg-creamBG">
            {projectData.map((project, index) => (
                <ProjectItem 
                    imageSrc={project.imageSrc}

                />
            ))}
        </section>
    )
}
export default Projects;
