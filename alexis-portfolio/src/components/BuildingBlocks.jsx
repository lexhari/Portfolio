import { motion } from "framer-motion";

function BuildingBlocks({ variant, className, children, drag = true, dragConstraints = null, onDragEnd }) {
    const getBuildingBlockStyles = () => {
        const baseClass = "px-4 py-2 text-sm text-white font-dm-sans rounded-xl text-nowrap";

        const variantClasses = {
            "Tools": "bg-[#8DA6F9]",
            "Titles": "bg-[#9BC584]",
            "Skills": "bg-[#BEA2FF]",
            "Quality": "bg-[#FF9C9C]",
            "Values": "bg-[#FFBD83]"
        }

        return `${baseClass} ${variantClasses[variant] || variantClasses.primary} ${className}`;
    };

    return (
        <div
            className={getBuildingBlockStyles()}
        >
            <p>{children}</p>
        </div>
    )
}

export default BuildingBlocks;