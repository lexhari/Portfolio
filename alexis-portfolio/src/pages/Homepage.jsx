import React, { useRef, useState } from 'react';
import { Circle, CircleDot, Moon, Group, Wand, Layers, RotateCcw } from 'lucide-react';
import BuildingBlocksPhysicsWrapper from "../components/BuildingBlocksPhysicsWrapper";
import Badge from '../components/Badge';

function Homepage() {
    const physicsRef = useRef(null);
    const [physicsState, setPhysicsState] = useState({ isReady: false, isAnimating: false });
    const [gravityState, setGravityState] = useState('normal'); // 'normal', 'reverse', 'zero'

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

    return (
        <div>
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

            <section className="flex flex-row overflow-hidden w-full h-screen bg-creamBG px-horizontal py-20 gap-20">
                <div className="flex flex-col h-full w-[50%]">
                    <Badge>I don't just click, scroll, and type!</Badge>
                    <div className="flex h-full justify-center items-center w-full">
                        <h1 className="text-6xl font-bricolage-grotesque text-navy font-medium">My experience in the community has greatly enhanced my awareness in user needs.</h1>
                    </div>
                        
                </div>
                <div className="flex flex-col h-full justify-between items-end w-[50%]">
                    <div className="w-full h-[60%] bg-slate-300 rounded-2xl">
                    </div>
                    <div className="w-[90%]">
                        <p className="text-navy text-3xl font-dm-sans font-semibold text-right">I transformed the onboarding experience for COMSCI@UP.BAG, increasing engagement and application confirmation rates through a user-centered redesign.</p>
                    </div>
                </div>
            </section>

            <section className="w-full h-screen bg-creamBG px-horizontal py-20">
                <div className="flex flex-row gap-20">
                    <div className="w-full bg-slate-300 rounded-2xl"></div>
                    <div className="w-full bg-slate-300 rounded-2xl"></div>
                    <div className="w-full bg-slate-300 rounded-2xl"></div>
                </div>
            </section>
        </div>
    );
}

export default Homepage;