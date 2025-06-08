import { motion } from "framer-motion";

function BuildingBlocks({ variant, className, children, drag = true, dragConstraints = null, onDragEnd }) {
    const getBuildingBlockStyles = () => {
        const baseClass = "px-4 py-2 text-white font-dm-sans rounded-2xl w-fit";

        const variantClasses = {
            "Tools": "bg-[#8DA6F9]",
            "Titles": "bg-[#9BC584]",
            "Skills": "bg-[#BEA2FF]",
            "Quality": "bg-[#FF9C9C]",
            "Values": "bg-[#FFBD83]"
        }

        return `${baseClass} ${variantClasses[variant] || variantClasses.primary} ${className}`;
    };

    return(
        <motion.div 
            className={getBuildingBlockStyles()}
            drag={drag}
            dragConstraints={dragConstraints}
            dragElastic={0}
            dragTransition={{ 
                power: 0,
                timeConstant: 0,
                bounceStiffness: 0, 
                bounceDamping: 10000 
            }}
            whileDrag={{ scale: 1.05, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <p>{children}</p>
        </motion.div>
    )
}

export default BuildingBlocks;