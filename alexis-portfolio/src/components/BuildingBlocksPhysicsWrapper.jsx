import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import BuildingBlocks from './BuildingBlocks'; // Your existing styled component

const blockData = [
    { id: 1, variant: 'Tools', text: 'React JS' },
    { id: 2, variant: 'Tools', text: 'HTML, CSS, JS' },
    { id: 3, variant: 'Tools', text: 'Figma' },
    { id: 4, variant: 'Tools', text: 'Google Workspace' },
    { id: 5, variant: 'Tools', text: 'Adobe Suite' },
    { id: 6, variant: 'Tools', text: 'Git' },
    { id: 7, variant: 'Titles', text: 'Solutionist' },
    { id: 8, variant: 'Titles', text: 'Leader' },
    { id: 9, variant: 'Titles', text: 'Design Strategist' },
    { id: 10, variant: 'Values', text: 'highly collaborative' },
    { id: 11, variant: 'Values', text: 'communicative' },
    { id: 12, variant: 'Values', text: 'strategic' },
    { id: 13, variant: 'Values', text: 'adaptable' },
    { id: 14, variant: 'Quality', text: 'user-centered' },
    { id: 15, variant: 'Quality', text: 'efficient' },
    { id: 16, variant: 'Skills', text: 'prototyping' },
    { id: 17, variant: 'Skills', text: 'wireframing' },
];

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function BuildingBlocksPhysicsWrapper() {
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const [bodies, setBodies] = useState([]);
    const bodyRefs = useRef([]);
    const blockSizeMap = useRef({});
    const [sizesReady, setSizesReady] = useState(false);
    const [shuffledBlocks] = useState(() => shuffleArray(blockData)); // Shuffle once on component mount
    const [isAnimating, setIsAnimating] = useState(false);

    // First effect: Measure sizes
    useEffect(() => {
        // Wait a frame for DOM to be ready, then trigger size measurement
        const timer = setTimeout(() => {
            setSizesReady(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Second effect: Create physics only after sizes are measured
    useEffect(() => {
        if (!sizesReady || Object.keys(blockSizeMap.current).length < shuffledBlocks.length) {
            return;
        }

        const engine = engineRef.current;
        const world = engine.world;

        // Clear any existing bodies
        Matter.World.clear(world);

        engine.gravity.y = 1;
        engine.positionIterations = 10;
        engine.velocityIterations = 10;

        // Get container dimensions - use parent section size instead of window
        const containerWidth = sceneRef.current?.offsetWidth || window.innerWidth;
        const containerHeight = sceneRef.current?.offsetHeight || window.innerHeight;
        const wallThickness = 50;

        // Create boundaries (walls + floor + ceiling)
        const boundaries = [
            // Ground (bottom)
            Matter.Bodies.rectangle(
                containerWidth / 2,
                containerHeight - wallThickness / 2,
                containerWidth,
                wallThickness,
                { isStatic: true }
            ),
            // Ceiling (top)
            Matter.Bodies.rectangle(
                containerWidth / 2,
                wallThickness / 2,
                containerWidth,
                wallThickness + 50,
                { isStatic: true }
            ),
            // Left wall
            Matter.Bodies.rectangle(
                wallThickness / 2,
                containerHeight / 2,
                wallThickness,
                containerHeight,
                { isStatic: true }
            ),
            // Right wall
            Matter.Bodies.rectangle(
                containerWidth - wallThickness / 2,
                containerHeight / 2,
                wallThickness,
                containerHeight,
                { isStatic: true }
            )
        ];

        // Add all boundaries to the world
        boundaries.forEach(boundary => {
            boundary.isBoundary = true; // Flag to identify boundaries
            Matter.Composite.add(world, boundary);
        });

        // Create physics bodies for blocks using shuffled order
        const newBodies = shuffledBlocks.map((block, i) => {
            const size = blockSizeMap.current[block.id];
            if (!size) {
                console.warn(`Missing size for block ${block.id}:`, block.text);
                return null;
            }

            const { width, height } = size;
            // Randomize position across the upper portion of the screen
            const startX = Math.random() * (containerWidth - width - 100) + 50; // Random X with padding
            const startY = Math.random() * (containerHeight * 0.4) + 50; // Random Y in upper 40% of screen

            const box = Matter.Bodies.rectangle(
                startX,
                startY,
                width,
                height,
                {
                    restitution: 0.3,
                    friction: 0.7,
                    density: 0.001,
                }
            );
            box.renderBlockWidth = width;
            box.renderBlockHeight = height;
            box.data = block;
            box.isBlock = true; // Flag to identify blocks
            Matter.Composite.add(world, box);
            console.log(`Created block ${i + 1}/${shuffledBlocks.length}:`, block.text, `at (${startX}, ${startY}) size: ${width}x${height}`);
            return box;
        }).filter(Boolean);

        console.log(`Total blocks created: ${newBodies.length}/${shuffledBlocks.length}`);

        bodyRefs.current = newBodies;
        setBodies([...newBodies]);

        // Mouse interaction with improved settings
        const mouse = Matter.Mouse.create(sceneRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });

        // Prevent text selection during drag
        mouse.element.onselectstart = () => false;
        mouse.element.onmousedown = () => false;

        Matter.Composite.add(world, mouseConstraint);

        // Start physics
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        // Animation loop - only update block bodies
        const update = () => {
            const blockBodies = bodyRefs.current.filter(body => body && body.isBlock);
            setBodies([...blockBodies]);
            requestAnimationFrame(update);
        };
        update();

        return () => {
            Matter.World.clear(world);
            Matter.Engine.clear(engine);
            Matter.Runner.stop(runner);
        };
    }, [sizesReady, shuffledBlocks]);

    // Playground functions
    const resetBlocks = () => {
        if (!sizesReady || isAnimating) return;

        const containerWidth = sceneRef.current?.offsetWidth || window.innerWidth;
        const containerHeight = sceneRef.current?.offsetHeight || window.innerHeight;

        bodyRefs.current.forEach((body) => {
            if (body && body.isBlock) {
                const size = blockSizeMap.current[body.data.id];
                const startX = Math.random() * (containerWidth - size.width - 100) + 50;
                const startY = Math.random() * (containerHeight * 0.4) + 50;

                Matter.Body.setPosition(body, { x: startX, y: startY });
                Matter.Body.setVelocity(body, { x: 0, y: 0 });
                Matter.Body.setAngularVelocity(body, 0);
                Matter.Body.setAngle(body, 0);
            }
        });
    };

    const stackBlocks = () => {
        if (!sizesReady || isAnimating) return;

        setIsAnimating(true);
        const containerWidth = sceneRef.current?.offsetWidth || window.innerWidth;
        const containerHeight = sceneRef.current?.offsetHeight || window.innerHeight;
        const stackX = containerWidth - 350;
        let stackY = containerHeight - 75; // Start from bottom

        // Sort blocks by size for better stacking
        const sortedBodies = [...bodyRefs.current].sort((a, b) => {
            const aSize = blockSizeMap.current[a.data.id];
            const bSize = blockSizeMap.current[b.data.id];
            return (bSize.width * bSize.height) - (aSize.width * aSize.height);
        });

        sortedBodies.forEach((body, index) => {
            if (body && body.isBlock) {
                const size = blockSizeMap.current[body.data.id];

                setTimeout(() => {
                    Matter.Body.setPosition(body, { x: stackX, y: stackY - size.height / 2 });
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });
                    Matter.Body.setAngularVelocity(body, 0);
                    Matter.Body.setAngle(body, 0);
                    stackY -= size.height + 5; // Add small gap between blocks

                    if (index === sortedBodies.length - 1) {
                        setTimeout(() => setIsAnimating(false), 500);
                    }
                }, index * 100);
            }
        });
    };

    const explodeBlocks = () => {
        if (!sizesReady || isAnimating) return;

        setIsAnimating(true);
        const containerWidth = sceneRef.current?.offsetWidth || window.innerWidth;
        const containerHeight = sceneRef.current?.offsetHeight || window.innerHeight;

        bodyRefs.current.forEach((body) => {
            if (body && body.isBlock) {
                const angle = Math.random() * Math.PI * 2;
                const force = Math.random() * 0.05 + 0.02;
                const forceVector = {
                    x: Math.cos(angle) * force,
                    y: Math.sin(angle) * force
                };

                Matter.Body.applyForce(body, body.position, forceVector);
                Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3);
            }
        });

        setTimeout(() => setIsAnimating(false), 2000);
    };

    const organizeByType = () => {
        if (!sizesReady || isAnimating) return;

        setIsAnimating(true);
        const containerWidth = sceneRef.current?.offsetWidth || window.innerWidth;
        const containerHeight = sceneRef.current?.offsetHeight || window.innerHeight;

        // Group blocks by variant
        const groupedBlocks = {};
        bodyRefs.current.forEach((body) => {
            if (body && body.isBlock) {
                const variant = body.data.variant;
                if (!groupedBlocks[variant]) {
                    groupedBlocks[variant] = [];
                }
                groupedBlocks[variant].push(body);
            }
        });

        const variants = Object.keys(groupedBlocks);
        const numStacks = variants.length; // Should be 5

        // Create 5 evenly spaced columns across the container width
        const padding = 100; // Padding from edges
        const availableWidth = containerWidth - (padding * 2);
        const stackSpacing = availableWidth / (numStacks - 1);

        variants.forEach((variant, variantIndex) => {
            // Calculate X position for this stack
            const stackX = padding + (stackSpacing * variantIndex);

            // Start stacking from the bottom
            let stackY = containerHeight - 100; // Start from bottom with some padding

            // Sort blocks within each group by size (largest at bottom for stability)
            const sortedBlocks = groupedBlocks[variant].sort((a, b) => {
                const aSize = blockSizeMap.current[a.data.id];
                const bSize = blockSizeMap.current[b.data.id];
                return (bSize.width * bSize.height) - (aSize.width * aSize.height);
            });

            sortedBlocks.forEach((body, blockIndex) => {
                const size = blockSizeMap.current[body.data.id];

                setTimeout(() => {
                    // Position block in the stack
                    Matter.Body.setPosition(body, {
                        x: stackX,
                        y: stackY - size.height / 2
                    });
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });
                    Matter.Body.setAngularVelocity(body, 0);
                    Matter.Body.setAngle(body, 0);

                    // Move up for next block in stack
                    stackY -= size.height + 5; // Add small gap between blocks

                }, variantIndex * 150 + blockIndex * 100); // Stagger animation timing
            });
        });

        // Calculate total animation time and set isAnimating to false when done
        const totalAnimationTime = variants.length * 150 + Math.max(...variants.map(v => groupedBlocks[v].length)) * 100 + 500;
        setTimeout(() => setIsAnimating(false), totalAnimationTime);
    };

    const toggleGravity = () => {
        if (!sizesReady) return;

        const engine = engineRef.current;
        const currentGravity = engine.gravity.y;

        if (currentGravity > 0) {
            // Reverse gravity
            engine.gravity.y = -1;
        } else if (currentGravity < 0) {
            // Zero gravity
            engine.gravity.y = 0;
        } else {
            // Normal gravity
            engine.gravity.y = 1;
        }
    };

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Playground Controls*/}
            <div className="absolute bottom-[100px] left-[100px] z-30 pointer-events-auto">
                {/* Action Buttons */}
                    {[
                        { action: resetBlocks, label: 'Reset'},
                        { action: stackBlocks, label: 'Stack'},
                        { action: explodeBlocks, label: 'Explode'},
                        { action: organizeByType, label: 'Organize'},
                        { action: toggleGravity, label: 'Gravity'}
                    ].map((button, index) => (
                        <div
                            key={button.label}
                            className="flex flex-row items-center gap-3 transform transition-all duration-300"
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {/* Action Button */}
                            <button
                                onClick={button.action}
                                disabled={!sizesReady || (isAnimating && button.label !== 'Gravity')}
                                className={`
                                    flex flex-row items-center justify-center
                                    ${sizesReady && (!isAnimating || button.label === 'Gravity')
                                        ? 'cursor-pointer opacity-100'
                                        : 'cursor-not-allowed opacity-50'
                                    }
                                `}
                                style={{
                                    backgroundColor: button.color,
                                    boxShadow: `0 4px 15px ${button.color}30, 0 2px 8px ${button.color}20`,
                                }}
                                onMouseEnter={(e) => {
                                    if (sizesReady && (!isAnimating || button.label === 'Gravity')) {
                                        e.target.style.boxShadow = `0 8px 25px ${button.color}40, 0 4px 15px ${button.color}30`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.boxShadow = `0 4px 15px ${button.color}30, 0 2px 8px ${button.color}20`;
                                }}
                            >
                                {button.label}
                            </button>
                        </div>
                    ))}
            </div>

            <div
                ref={sceneRef}
                className="absolute inset-0 w-full h-full bg-transparent overflow-hidden pointer-events-none select-none z-20"
            >
                {/* Measure original block sizes first - only render when needed */}
                {!sizesReady && (
                    <div className="absolute opacity-0 pointer-events-none -top-[1000px]">
                        {shuffledBlocks.map((block) => (
                            <MeasureBlock
                                key={`measure-${block.id}`}
                                block={block}
                                blockSizeMap={blockSizeMap}
                                onSizeReady={() => {
                                    // Check if all sizes are ready
                                    if (Object.keys(blockSizeMap.current).length === shuffledBlocks.length) {
                                        setSizesReady(true);
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Physics-rendered blocks - only render after physics is ready */}
                {sizesReady && bodies.map((body, i) => {
                    if (!body || !body.data) return null;

                    const { x, y } = body.position;
                    const angle = body.angle;
                    const { text, variant } = body.data;

                    return (
                        <div
                            key={`physics-${body.data.id}`}
                            className="absolute pointer-events-auto select-none cursor-grab"
                            style={{
                                left: x,
                                top: y,
                                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                            }}
                            onMouseDown={(e) => {
                                e.target.style.cursor = 'grabbing';
                            }}
                            onMouseUp={(e) => {
                                e.target.style.cursor = 'grab';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.cursor = 'grab';
                            }}
                        >
                            <BuildingBlocks variant={variant}>{text}</BuildingBlocks>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Improved measurement component
function MeasureBlock({ block, blockSizeMap, onSizeReady }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            // Get the actual rendered dimensions of the BuildingBlocks component
            const rect = ref.current.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            blockSizeMap.current[block.id] = { width, height };
            onSizeReady();
        }
    }, [block.id, onSizeReady]);

    return (
        <div ref={ref} className="inline-block">
            <BuildingBlocks variant={block.variant}>{block.text}</BuildingBlocks>
        </div>
    );
}