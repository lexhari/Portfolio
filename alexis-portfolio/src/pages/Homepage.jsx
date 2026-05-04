import React, { useRef, useState } from 'react';
import { Circle, CircleDot, Moon, Group, Wand, Layers, RotateCcw, MoveRight, Info } from 'lucide-react';
import BuildingBlocksPhysicsWrapper from "../components/buildingBlocks-physicsWrapper";
import Badge from '../components/badge';
import Button from '../components/custom-button';
import ScrollSequenceCard from '../components/scroll-sequenceCard';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useRef as useRefHook } from 'react';
import internalsPhoto from '../assets/images/internals-photo.jpg';
import eventPhoto from '../assets/images/event-photo.jpg';
import hariCraft from '../assets/images/hari-craft.jpg';
import alumniPhoto from '../assets/images/alumni-photo.jpg';
import photoOfMe from '../assets/images/me1.jpg';
import pmsPhoto from '../assets/images/pms.jpg';
import orgwebsitePhoto from '../assets/images/orgwebsite.jpg';
import businesswebsitePhoto from '../assets/images/businesswebsite.jpg';

function Homepage() {
    const physicsRef = useRef(null);
    const [physicsState, setPhysicsState] = useState({ isReady: false, isAnimating: false });
    const [gravityState, setGravityState] = useState('normal'); // 'normal', 'reverse', 'zero'
    const [showDragTooltip, setShowDragTooltip] = useState(true);

    const containerRef = useRef(null);
    const badgeRef = useRefHook(null);

    useEffect(() => {
        // Scroll to top on page load
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }, []);

    const cardData = [
        {
            id: 1,
            title: "I transformed the onboarding experience for COMSCI@UP.BAG, increasing engagement and application confirmation rates through a user-centered redesign.",
            imageAlt: "COMSCI onboarding transformation",
            imageSrc: internalsPhoto
        },
        {
            id: 2,
            title: "I transformed the onboarding experience for COMSCI@UP.BAG, increasing engagement and application confirmation rates through a user-centered redesign.",
            imageAlt: "COMSCI onboarding transformation",
            imageSrc: internalsPhoto
        },
        {
            id: 3,
            title: "I further introduced standardized operational processes across COMSCI@UP.BAG, including in event coordination.",
            imageAlt: "Operational processes standardization",
            imageSrc: eventPhoto
        },
        {
            id: 4,
            title: "Along the way, I built connections and learned the power of empathy in every design I create.",
            imageAlt: "Empathy in design",
            imageSrc: hariCraft
        },
        {
            id: 5,
            title: "Up to my senior year, taking the lead to organize a successful alumni homecoming event that reconnected our growing community.",
            imageAlt: "Bridging communities",
            imageSrc: alumniPhoto
        }
    ];

    const handleStateChange = (state) => {
        setPhysicsState(state);
    };

    const handleBlockDragStart = () => {
        setShowDragTooltip(false);
    };

    const handleControlClick = (action) => {
        if (physicsRef.current) {
            switch (action) {
                case 'reset':
                    physicsRef.current.resetBlocks();
                    break;
                case 'stack':
                    physicsRef.current.stackBlocks();
                    break;
                case 'explode':
                    physicsRef.current.explodeBlocks();
                    break;
                case 'organize':
                    physicsRef.current.organizeByType();
                    break;
                case 'gravity':
                    physicsRef.current.toggleGravity();
                    // Update gravity state (cycles through normal -> reverse -> zero -> normal)
                    setGravityState(prev => {
                        if (prev === 'normal') return 'reverse';
                        if (prev === 'reverse') return 'zero';
                        return 'normal';
                    });
                    break;
                default:
                    break;
            }
        }
    };

    const getGravityIcon = () => {
        switch (gravityState) {
            case 'normal':
                return <CircleDot />;
            case 'reverse':
                return <Moon />;
            case 'zero':
                return <Circle />;
            default:
                return <CircleDot />;
        }
    };

    const { isReady, isAnimating } = physicsState;

    const controlButtons = [
        { action: 'reset', label: 'Reset', icon: <RotateCcw />, description: 'Reset all blocks to their original positions' },
        { action: 'stack', label: 'Stack', icon: <Layers />, description: 'Stack blocks neatly on top of each other' },
        { action: 'explode', label: 'Explode', icon: <Wand />, description: 'Scatter blocks in all directions' },
        { action: 'organize', label: 'Organize', icon: <Group />, description: 'Organize blocks by their type' },
        { action: 'gravity', label: 'Gravity', icon: getGravityIcon(), description: 'Toggle between normal, reverse, and zero gravity' }
    ];

    const { scrollYProgress } = useScroll();

    return (
        <div>
            {/* Scroll Progress Bar */}
            <motion.div className='fixed right-0 top-0 w-2 h-full bg-gray-500 z-50' style={{ willChange: 'transform' }}>
                <motion.div className='bg-pink w-full origin-top' style={{ scaleY: scrollYProgress, position: 'absolute', top: 0, left: 0, bottom: 0, transform: 'translateZ(0)' }} />
            </motion.div>

            {/* Hero */}
            <section className="relative overflow-hidden w-full h-screen bg-creamBG px-horizontal py-20 flex flex-row items-center select-none">
                {/* Content layer */}
                <div className="relative z-10 flex flex-col gap-10 justify-between w-[60%]">
                    <h1 className="text-5xl font-bricolage-grotesque text-navy font-light select-none">
                        <span className="text-pink font-semibold">Alexis</span> is a <span className="text-yellow font-semibold">Software Quality & UX Enthusiast</span> who prioritizes <span className="font-normal">intuitive, user-centered digital experiences</span>.
                    </h1>

                    {/* Physics Controls */}
                    <div className="flex flex-wrap gap-12">
                        {controlButtons.map((button, index) => (
                            <button
                                key={button.label}
                                onClick={() => handleControlClick(button.action)}
                                disabled={!isReady || (isAnimating && button.action !== 'gravity')}
                                className={`
                                font-dm-sans text-sm
                                flex items-center gap-2
                                transition-all duration-200 font-medium text-navy
                                ${isReady && (!isAnimating || button.action === 'gravity')
                                        ? 'cursor-pointer opacity-100 hover:scale-105 active:scale-95'
                                        : 'cursor-not-allowed opacity-50'
                                    }
                            `}
                            >
                                {button.icon && button.icon}
                                {button.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Background physics layer */}
                <BuildingBlocksPhysicsWrapper ref={physicsRef} onStateChange={handleStateChange} onDragStart={handleBlockDragStart} />

                {/* Drag Tooltip */}
                <AnimatePresence>
                    {showDragTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 0 }}
                            transition={{ exit: { duration: 1 } }}
                            className="absolute right-12 top-20 bg-gray-900/70 flex items-center gap-2 text-creamBG px-4 py-2 rounded-lg text-xs font-dm-sans pointer-events-none z-50"
                            data-tooltip-id="drag-tooltip"
                        >
                            <Info /> Drag and drop the blocks!
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Projects */}
            <section className="flex flex-col gap-2 w-full h-screen bg-creamBG px-horizontal py-15">
                <div className="flex flex-row gap-5 w-full h-full">
                    <div className="overflow-hidden w-1/3 bg-slate-300 rounded-2xl hover:w-[100%] transition-all duration-300">
                        <img src={pmsPhoto} alt="Project 1" className='h-full object-cover object-left' />
                    </div>
                    <div className="overflow-hidden w-1/3 bg-slate-300 rounded-2xl hover:w-[100%] transition-all duration-300">
                        <img src={orgwebsitePhoto} alt="Project 2" className='h-full object-cover object-left' />
                    </div>
                    <div className="overflow-hidden w-1/3 bg-slate-300 rounded-2xl hover:w-[100%] transition-all duration-300">
                        <img src={businesswebsitePhoto} alt="Project 3" className='h-full object-cover object-left' />
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <Button href="/projects" variant="link" className="text-offBlack uppercase font-bold flex gap-3">See more of my projects <MoveRight /></Button>
                </div>
            </section>
            
            <div ref={containerRef} className="relative" style={{ contain: 'layout style paint' }}>
                {/* Create enough scroll space for all cards to animate */}
                <div className="h-[500vh]">
                    {/* Results Overview */}
                    <section className="sticky top-0 flex flex-row overflow-hidden w-full h-screen bg-creamBG px-horizontal py-10 gap-20">
                        <div className="flex flex-col h-full w-[50%] sticky top-0 justify-center gap-20">

                            <Badge badgeRef={badgeRef}>
                                I don't just click, scroll, and type!
                            </Badge>

                            <div className="flex justify-center items-center w-full">
                                <h1 className="text-6xl font-bricolage-grotesque text-navy font-medium">
                                    My experience in the community has greatly enhanced my awareness in user needs.
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-col h-screen w-[50%] sticky relative overflow-hidden" style={{ willChange: 'transform' }}>
                            {cardData.map((card, index) => (
                                <ScrollSequenceCard
                                    key={card.id}
                                    id={card.id}
                                    title={card.title}
                                    imageAlt={card.imageAlt}
                                    imageSrc={card.imageSrc}
                                    containerRef={containerRef}
                                    totalCards={cardData.length}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Photo */}
            <section className="sticky top-0 w-full h-screen bg-slate-300 overflow-hidden">
                <img
                    src={photoOfMe}
                    alt="Photo of me"
                    className="w-full h-full object-cover"
                />
            </section>

            {/* CTA Section */}
            <section className="w-full h-fit bg-navy">
                <div className="relative flex flex-row gap-20 rounded-t-2xl px-horizontal py-20 bg-navy flex flex-row justify-between items-center">
                    <div className="w-[60%] h-full flex flex-col justify-center items-center">
                        <p className="text-creamBG text-3xl font-bricolage-grotesque font-thin"><span className="font-semibold">By observing friction,</span> not just in workflows but also in <span className="font-semibold">interpersonal dynamics,</span> I designed solutions that improved both efficiency and community well-being — believing that <span className="font-semibold">good design supports people, not just processes.</span></p>
                    </div>
                    <div className="w-[40%] h-full flex flex-col justify-center items-end">
                        <Button href="/about" variant="link" className="text-creamBG uppercase font-bold flex gap-3">See more of who I am <MoveRight /></Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Homepage;