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
    totalCards
}) {
    const cardRef = useRef(null)    // Track scroll progress only when section is in sticky position    // For the first card, we want to track from when the section becomes sticky
    // For other cards, we track from the start of the section    // Track the overall section scroll progress
    const { scrollYProgress: sectionProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]  // From section entering viewport to becoming sticky
    })

    // Track progress only when section is sticky
    const { scrollYProgress: stickyProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // For first card, use combined scroll progress
    const scrollYProgress = id === 1 
        ? sectionProgress  // Use section progress for first card
        : stickyProgress  // Use sticky progress for other cards
    
    // Calculate the viewport height segment for each card, reserve last 25% for transition
    const segmentSize = 0.75 / totalCards
    
    // Create scroll ranges for each card
    const cardIndex = id - 1 // Convert to 0-based index
    
    // Adjust ranges to remove empty slots at beginning and end
    let fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd
      if (cardIndex === 0) {
        // First card: visible until section becomes sticky, then follows scroll
        fadeInStart = 0
        fadeInEnd = 0
        fadeOutStart = 0.9  // Start fade out just before section becomes sticky
        fadeOutEnd = 1.0    // Complete fade out when section is sticky
    } else if (cardIndex === totalCards - 1) {
        // Last card: fades in at its segment start and stays visible till the end
        fadeInStart = cardIndex * segmentSize
        fadeInEnd = (cardIndex * segmentSize) + 0.1
        fadeOutStart = 1  // Never starts fading out
        fadeOutEnd = 1    // Never fades out
    } else {
        // Middle cards: fade in at their segment start, fade out at their segment end
        const segmentStart = cardIndex * segmentSize
        const segmentEnd = (cardIndex + 1) * segmentSize
        
        fadeInStart = segmentStart
        fadeInEnd = segmentStart + 0.1
        fadeOutStart = segmentEnd - 0.1
        fadeOutEnd = segmentEnd
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
            <div className="w-full h-[60%] bg-slate-300 rounded-2xl mb-4 overflow-hidden">
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
                <p className="text-navy text-xl font-dm-sans font-medium text-right">
                    {title}
                </p>
            </div>
        </motion.div>
    )
}