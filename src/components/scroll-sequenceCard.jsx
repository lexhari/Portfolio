"use client"
import {
    motion,
    useScroll,
    useTransform,
} from "motion/react"
import { useRef, memo } from "react"

function ScrollSequenceCard({ 
    id, 
    title, 
    imageAlt,
    imageSrc,
    containerRef,
    totalCards
}) {
    const cardRef = useRef(null)
    
    // Single scroll hook - much more efficient
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Calculate the viewport height segment for each card
    const segmentSize = 0.75 / totalCards
    const cardIndex = id - 1
    
    let fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd
    
    const segmentStart = cardIndex * segmentSize
    const segmentEnd = (cardIndex + 1) * segmentSize
    
    if (cardIndex === 0) {
        // First card: fully visible from start, fade out when next card appears
        fadeInStart = 0
        fadeInEnd = 0
        fadeOutStart = segmentSize
        fadeOutEnd = segmentSize + 0.04
    } else if (cardIndex === totalCards - 1) {
        // Last card: fade in and stay visible to the end
        fadeInStart = segmentStart
        fadeInEnd = segmentStart + 0.04
        fadeOutStart = 1
        fadeOutEnd = 1
    } else {
        // Middle cards: fade in, stay, fade out
        fadeInStart = segmentStart
        fadeInEnd = segmentStart + 0.04
        fadeOutStart = segmentEnd - 0.04
        fadeOutEnd = segmentEnd
    }
    
    // Direct transforms without spring - much faster
    const opacity = useTransform(
        scrollYProgress,
        cardIndex === 0 
            ? [0, fadeOutStart, fadeOutEnd]
            : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        cardIndex === 0
            ? [1, 1, 0]
            : [0, 1, 1, 0]
    )
    
    const y = useTransform(
        scrollYProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [10, 0, 0, 10]
    )
    
    const scale = useTransform(
        scrollYProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [0.95, 1, 1, 0.95]
    )
    
    return (
        <motion.div 
            ref={cardRef}
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-end"
            style={{ opacity, y, scale, willChange: 'opacity, transform' }}
        >
            <div className="w-full h-[60%] bg-slate-300 rounded-2xl mb-4 overflow-hidden">
                {imageSrc ? (
                    <img 
                        src={imageSrc} 
                        alt={imageAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
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

export default memo(ScrollSequenceCard)