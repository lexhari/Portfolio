import React, { useRef, useState } from 'react';
import { Circle, CircleDot, Moon, Group, Wand, Layers, RotateCcw, MoveRight } from 'lucide-react';
import BuildingBlocksPhysicsWrapper from "../components/BuildingBlocksPhysicsWrapper";
import Badge from '../components/Badge';
import Button from '../components/Button';
import ScrollSequenceCard from '../components/ScrollSequenceCard';
import { motion, useScroll } from 'framer-motion';

function Homepage() {
    const physicsRef = useRef(null);
    const [physicsState, setPhysicsState] = useState({ isReady: false, isAnimating: false });
    const [gravityState, setGravityState] = useState('normal'); // 'normal', 'reverse', 'zero'

    const containerRef = useRef(null);

    const cardData = [
        {
            id: 1,
            title: "I transformed the onboarding experience for COMSCI@UP.BAG, increasing engagement and application confirmation rates through a user-centered redesign.",
            imageAlt: "COMSCI onboarding transformation",
            imageSrc: "/assets/images/placeholder.png" // Replace with your actual image paths
        },
        {
            id: 2,
            title: "I further introduced standardized operational processes across COMSCI@UP.BAG, including in event coordination.",
            imageAlt: "Operational processes standardization",
            imageSrc: "/assets/images/placeholder.png" // Replace with your actual image paths
        },
        {
            id: 3,
            title: "Along the way, I built connections and learned the power of empathy in every design I create.",
            imageAlt: "Empathy in design",
            imageSrc: "/assets/images/placeholder.png" // Replace with your actual image paths
        }
    ];

    const handleStateChange = (state) => {
        setPhysicsState(state);
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
        { action: 'reset', label: 'Reset', icon: <RotateCcw /> },
        { action: 'stack', label: 'Stack', icon: <Layers /> },
        { action: 'explode', label: 'Explode', icon: <Wand /> },
        { action: 'organize', label: 'Organize', icon: <Group /> },
        { action: 'gravity', label: 'Gravity', icon: getGravityIcon() }
    ];

    const { scrollYProgress } = useScroll();

    return (
        <div>
            {/* Scroll Progress Bar */}
            <motion.div className='fixed right-0 top-0 w-2 h-full bg-gray-500 z-50'>
                <motion.div className='bg-pink w-full origin-top' style={{ scaleY: scrollYProgress, position: 'absolute', top: 0, left: 0, bottom: 0 }} />
            </motion.div>

            {/* Hero */}
            <section className="relative overflow-hidden w-full h-screen bg-creamBG px-horizontal py-20 flex flex-row items-center select-none">
                {/* Content layer */}
                <div className="relative z-10 flex flex-col gap-10 justify-between w-[60%]">
                    <h1 className="text-5xl font-bricolage-grotesque text-navy font-light select-none">
                        <span className="text-pink font-semibold">Alexis</span> is an <span className="text-yellow font-semibold">aspiring UI / UX Designer</span> who aims to create <span className="font-normal">intuitive digital experiences from user pain points</span>.
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
                <BuildingBlocksPhysicsWrapper ref={physicsRef} onStateChange={handleStateChange} />
            </section>

            {/* Projects */}
            <section className="w-full h-screen bg-creamBG px-horizontal py-20">
                <div className="flex flex-row gap-5 w-full h-full">
                    <div className="w-1/3 bg-slate-300 rounded-2xl hover:w-[100%] transition-all duration-300">
                        <p>a</p>
                    </div>
                    <div className="w-1/3 bg-slate-300 rounded-2xl hover:w-[100%] transition-all duration-300">
                        <p>a</p>
                    </div>
                    <div className="w-1/3 bg-slate-300 rounded-2xl hover:w-[100%] transition-all duration-300">
                        <p>a</p>
                    </div>
                </div>
            </section>            <div ref={containerRef} className="relative">
                {/* Create enough scroll space for all cards to animate */}
                <div className="h-[400vh]">
                    {/* Results Overview */}
                    <section className="sticky top-0 flex flex-row overflow-hidden w-full h-screen bg-creamBG px-horizontal py-10 gap-20">
                        <div className="flex flex-col h-screen w-[50%] sticky top-0 justify-center gap-20">
                            <Badge>I don't just click, scroll, and type!</Badge>
                            <div className="flex justify-center items-center w-full">
                                <h1 className="text-6xl font-bricolage-grotesque text-navy font-medium">
                                    My experience in the community has greatly enhanced my awareness in user needs.
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-col h-screen w-[50%] sticky relative">
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
            <section className="sticky top-0 w-full h-screen bg-creamBG ">
                <div className="sticky top-0 w-full h-[50%] bg-slate-300 ">
                </div>
                <div className="absolute bottom-0 w-full h-[55%] bg-navy rounded-t-2xl flex flex-row justify-between px-horizontal">
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