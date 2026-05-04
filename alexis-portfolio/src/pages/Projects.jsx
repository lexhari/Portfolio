import { useState } from "react";
import ProjectItem from "../components/project-item";
import Badge from "../components/badge";
import ImageModal from "../components/image-modal";
import pms from '../assets/images/pms.jpg';
import prototype from '../assets/images/prototype.jpg';
import businesswebsite from '../assets/images/businesswebsite.jpg';
import orgwebsite from '../assets/images/orgwebsite.jpg';

const projectData = [
    {
        title: "Hotel Property Management System in React JS",
        description: "I led a team of 6 to create a hotel property management system for a client  featuring booking, guest, and facility management. I was responsible for business discussions, front-end development and UI/UX design.",
        imageAlt: "Project1",
        imageSrc: pms,
        containerRef: "#"
    },
    {
        title: "University Activity & Venue Request System Svelte Prototype",
        description: "I led a team of 4 to develop a Svelte prototype for managing university activities and venue requests. I was responsible for the front-end development.",
        imageAlt: "Project2",
        imageSrc: prototype
        // containerRef: "#project2" 
    },
    {
        title: "Revamped Hotel Business Website",
        description: "I voluntarily redesigned a client's hotel business website to improve aesthetic and user experience. This project let me practice my UI/UX design skills and apply them to a real-world entity.",
        imageAlt: "Project3",
        imageSrc: businesswebsite
        // containerRef: "#project3" 
    },
    {
        title: "COMSCI@UP.BAG Website",
        description: "I led a team of 5 students to create a front-end website for COMSCI@UP.BAG. I was responsible for the end-to-end UI/UX design.",
        imageAlt: "Project4",
        imageSrc: orgwebsite
        // containerRef: "#project5" 
    },
];

function Projects() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageSrc, imageAlt) => {
        setSelectedImage({ src: imageSrc, alt: imageAlt });
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (

        <div className="bg-creamBG px-horizontal py-20">
            <ImageModal 
                imageSrc={selectedImage?.src}
                imageAlt={selectedImage?.alt}
                isOpen={!!selectedImage}
                onClose={closeModal}
            />
            <div className="mt-5 mb-10">
                <Badge>Development</Badge>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-20">
                {projectData.map((project, index) => (
                    <ProjectItem
                        key={index}
                        imageSrc={project.imageSrc}
                        imageAlt={project.imageAlt}
                        title={project.title}
                        description={project.description}
                        onImageClick={() => handleImageClick(project.imageSrc, project.imageAlt)}
                    />
                ))}
            </div>

            <div className="mt-20 mb-10">
                <Badge>Design</Badge>
            </div>
            <div>
                coming soon
            </div>
        </div>


    )
}
export default Projects;
