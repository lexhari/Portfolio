"use client"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "motion/react"
import { useRef } from "react"

export default function ScrollSequenceCard({ 
    id, 
    title, 
    imageAlt,
    imageSrc,
    containerRef,
    totalCards = 2
}) {
    const cardRef = useRef(null)
    
    // Track scroll progress of the entire container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })
    
    // Create scroll ranges for each card
    const cardIndex = id - 1 // Convert to 0-based index
    
    // Adjust ranges to remove empty slots at beginning and end
    let fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd
    
    if (cardIndex === 0) {
        // First card: starts immediately, no fade in
        fadeInStart = 0
        fadeInEnd = 0
        fadeOutStart = (1 / totalCards) - 0.02
        fadeOutEnd = 1 / totalCards
    } else if (cardIndex === totalCards - 1) {
        // Last card: doesn't fade out, stays till end
        fadeInStart = cardIndex / totalCards
        fadeInEnd = cardIndex / totalCards + 0.02
        fadeOutStart = 1
        fadeOutEnd = 1
    } else {
        // Middle cards: normal behavior
        const startRange = cardIndex / totalCards
        const endRange = (cardIndex + 1) / totalCards
        
        fadeInStart = startRange
        fadeInEnd = startRange + 0.05
        fadeOutStart = endRange - 0.05
        fadeOutEnd = endRange
    }
    
    const rawOpacity = useTransform(
        scrollYProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [0, 1, 1, 0]
    )
    
    const rawY = useTransform(
        scrollYProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [10, 0, 0, 10]
    )
    
    const rawScale = useTransform(
        scrollYProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [0.95, 1, 1, 0.95]
    )

    // Add spring physics for smooth, weighted animations
    const opacity = useSpring(rawOpacity, {
        stiffness: 200,
        damping: 30,
        mass: 0.8
    })
    
    const y = useSpring(rawY, {
        stiffness: 150,
        damping: 25,
        mass: 1.2
    })
    
    const scale = useSpring(rawScale, {
        stiffness: 180,
        damping: 28,
        mass: 1
    })
    
    return (
        <motion.div 
            ref={cardRef}
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-end"
            style={{ opacity, y, scale }}
        >
            <div className="w-full h-80 bg-slate-300 rounded-2xl mb-4 overflow-hidden">
                {imageSrc ? (
                    <img 
                        src={imageSrc} 
                        alt={imageAlt}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 font-medium">
                        Image {id}
                    </div>
                )}
            </div>
            <div className="w-[90%] ml-auto">
                <p className="text-navy text-2xl font-dm-sans font-semibold text-right">
                    {title}
                </p>
            </div>
        </motion.div>
    )
}