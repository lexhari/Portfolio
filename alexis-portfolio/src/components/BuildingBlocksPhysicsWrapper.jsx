import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
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

const BuildingBlocksPhysicsWrapper = forwardRef(({ onStateChange }, ref) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const [bodies, setBodies] = useState([]);
    const bodyRefs = useRef([]);
    const blockSizeMap = useRef({});
    const [sizesReady, setSizesReady] = useState(false);
    const [shuffledBlocks] = useState(() => shuffleArray(blockData));
    const [isAnimating, setIsAnimating] = useState(false);

    // Custom dragging state
    const dragState = useRef({
        isDragging: false,
        draggedBody: null,
        dragOffset: { x: 0, y: 0 },
        mousePosition: { x: 0, y: 0 }
    });

    // Notify parent of state changes
    useEffect(() => {
        if (onStateChange) {
            onStateChange({ isReady: sizesReady, isAnimating });
        }
    }, [sizesReady, isAnimating, onStateChange]);

    // Expose control functions to parent component
    useImperativeHandle(ref, () => ({
        resetBlocks: () => resetBlocks(),
        stackBlocks: () => stackBlocks(),
        explodeBlocks: () => explodeBlocks(),
        organizeByType: () => organizeByType(),
        toggleGravity: () => toggleGravity(),
        isReady: sizesReady,
        isAnimating: isAnimating
    }));

    // First effect: Measure sizes
    useEffect(() => {
        const timer = setTimeout(() => {
            setSizesReady(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Global mouse event handlers for custom dragging
    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            dragState.current.mousePosition = { x: e.clientX, y: e.clientY };
            
            if (dragState.current.isDragging && dragState.current.draggedBody) {
                const containerRect = sceneRef.current?.getBoundingClientRect();
                if (!containerRect) return;

                // Convert screen coordinates to container coordinates
                const containerX = e.clientX - containerRect.left;
                const containerY = e.clientY - containerRect.top;

                // Apply the drag offset
                const targetX = containerX - dragState.current.dragOffset.x;
                const targetY = containerY - dragState.current.dragOffset.y;

                // Get container dimensions for boundary checking
                const containerWidth = containerRect.width;
                const containerHeight = containerRect.height;
                const wallThickness = 50;

                // Constrain the target position within container bounds
                // This prevents the object from disappearing when mouse goes out of bounds
                const constrainedX = Math.max(
                    wallThickness, 
                    Math.min(containerWidth - wallThickness, targetX)
                );
                const constrainedY = Math.max(
                    wallThickness, 
                    Math.min(containerHeight - wallThickness, targetY)
                );

                // Move the body to the constrained position
                const body = dragState.current.draggedBody;
                Matter.Body.setPosition(body, { x: constrainedX, y: constrainedY });
                
                // Reduce velocity to prevent jittery movement
                Matter.Body.setVelocity(body, { x: 0, y: 0 });
                Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.9);
            }
        };

        const handleGlobalMouseUp = () => {
            if (dragState.current.isDragging) {
                // Reset friction when dropping
                if (dragState.current.draggedBody) {
                    dragState.current.draggedBody.frictionAir = 0.01;
                }
                
                dragState.current.isDragging = false;
                dragState.current.draggedBody = null;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            }
        };

        // Add global event listeners
        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
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

        // Get container dimensions
        const containerWidth = sceneRef.current?.offsetWidth || window.innerWidth;
        const containerHeight = sceneRef.current?.offsetHeight || window.innerHeight;
        const wallThickness = 50;

        // Create boundaries
        const boundaries = [
            Matter.Bodies.rectangle(
                containerWidth / 2,
                containerHeight - wallThickness / 2,
                containerWidth,
                wallThickness,
                { isStatic: true }
            ),
            Matter.Bodies.rectangle(
                containerWidth / 2,
                wallThickness / 2,
                containerWidth,
                wallThickness + 100,
                { isStatic: true }
            ),
            Matter.Bodies.rectangle(
                wallThickness / 2,
                containerHeight / 2,
                wallThickness,
                containerHeight,
                { isStatic: true }
            ),
            Matter.Bodies.rectangle(
                containerWidth - wallThickness / 2,
                containerHeight / 2,
                wallThickness,
                containerHeight,
                { isStatic: true }
            )
        ];

        boundaries.forEach(boundary => {
            boundary.isBoundary = true;
            Matter.Composite.add(world, boundary);
        });

        // Create physics bodies for blocks
        const newBodies = shuffledBlocks.map((block, i) => {
            const size = blockSizeMap.current[block.id];
            if (!size) {
                console.warn(`Missing size for block ${block.id}:`, block.text);
                return null;
            }

            const { width, height } = size;
            const startX = Math.random() * (containerWidth - width - 100) + 50;
            const startY = Math.random() * (containerHeight * 0.4) + 50;

            const box = Matter.Bodies.rectangle(
                startX,
                startY,
                width,
                height,
                {
                    restitution: 0,
                    friction: 1,
                    frictionAir: 0.01,
                    density: 0.001,
                }
            );
            box.renderBlockWidth = width;
            box.renderBlockHeight = height;
            box.data = block;
            box.isBlock = true;
            Matter.Composite.add(world, box);
            return box;
        }).filter(Boolean);

        bodyRefs.current = newBodies;
        setBodies([...newBodies]);

        // Start physics
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        // Animation loop
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

    // Custom mouse down handler for starting drag
    const handleMouseDown = (e, body) => {
        e.preventDefault();
        e.stopPropagation();

        const containerRect = sceneRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        // Calculate offset from mouse to body center
        const containerX = e.clientX - containerRect.left;
        const containerY = e.clientY - containerRect.top;
        const offsetX = containerX - body.position.x;
        const offsetY = containerY - body.position.y;

        // Set drag state
        dragState.current = {
            isDragging: true,
            draggedBody: body,
            dragOffset: { x: offsetX, y: offsetY },
            mousePosition: { x: e.clientX, y: e.clientY }
        };

        // Update body properties for dragging
        body.frictionAir = 0.05;
        
        // Set cursor styles
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    };

    // Playground functions remain the same
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
        let stackY = containerHeight - 75;

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
                    stackY -= size.height + 6;

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

        bodyRefs.current.forEach((body) => {
            if (body && body.isBlock) {
                const angle = Math.random() * Math.PI * 2;
                const force = Math.random() * 0.1 + 0.05;
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

        const variants = Object.keys(groupedBlocks).sort((a, b) => {
            return groupedBlocks[a].length - groupedBlocks[b].length;
        });

        const numStacks = variants.length;
        const padding = 300;
        const availableWidth = containerWidth - (padding * 2);
        const stackSpacing = availableWidth / (numStacks - 1);

        variants.forEach((variant, variantIndex) => {
            const stackX = padding + (stackSpacing * variantIndex);
            let stackY = containerHeight - 100;

            const sortedBlocks = groupedBlocks[variant].sort((a, b) => {
                const aSize = blockSizeMap.current[a.data.id];
                const bSize = blockSizeMap.current[b.data.id];
                return (bSize.width * bSize.height) - (aSize.width * aSize.height);
            });

            sortedBlocks.forEach((body, blockIndex) => {
                const size = blockSizeMap.current[body.data.id];

                setTimeout(() => {
                    Matter.Body.setPosition(body, {
                        x: stackX,
                        y: stackY - size.height / 2
                    });
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });
                    Matter.Body.setAngularVelocity(body, 0);
                    Matter.Body.setAngle(body, 0);

                    stackY -= size.height + 5;
                }, variantIndex * 150 + blockIndex * 100);
            });
        });

        const totalAnimationTime = variants.length * 150 + Math.max(...variants.map(v => groupedBlocks[v].length)) * 100 + 500;
        setTimeout(() => setIsAnimating(false), totalAnimationTime);
    };

    const toggleGravity = () => {
        if (!sizesReady) return;

        const engine = engineRef.current;
        const currentGravity = engine.gravity.y;

        if (currentGravity > 0) {
            engine.gravity.y = -1;
        } else if (currentGravity < 0) {
            engine.gravity.y = 0;
        } else {
            engine.gravity.y = 1;
        }
    };

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div
                ref={sceneRef}
                className="absolute inset-0 w-full h-full bg-transparent overflow-hidden pointer-events-none select-none z-20"
            >
                {/* Measure original block sizes first */}
                {!sizesReady && (
                    <div className="absolute opacity-0 pointer-events-none -top-[1000px]">
                        {shuffledBlocks.map((block) => (
                            <MeasureBlock
                                key={`measure-${block.id}`}
                                block={block}
                                blockSizeMap={blockSizeMap}
                                onSizeReady={() => {
                                    if (Object.keys(blockSizeMap.current).length === shuffledBlocks.length) {
                                        setSizesReady(true);
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Physics-rendered blocks with custom drag handling */}
                {sizesReady && bodies.map((body, i) => {
                    if (!body || !body.data) return null;

                    const { x, y } = body.position;
                    const angle = body.angle;
                    const { text, variant } = body.data;
                    const isDragging = dragState.current.draggedBody === body;

                    return (
                        <div
                            key={`physics-${body.data.id}`}
                            className={`absolute pointer-events-auto select-none ${
                                isDragging ? 'cursor-grabbing' : 'cursor-grab'
                            }`}
                            style={{
                                left: x,
                                top: y,
                                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                                zIndex: isDragging ? 1000 : 'auto',
                            }}
                            onMouseDown={(e) => handleMouseDown(e, body)}
                        >
                            <BuildingBlocks variant={variant}>{text}</BuildingBlocks>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

// Measurement component remains the same
function MeasureBlock({ block, blockSizeMap, onSizeReady }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
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

export default BuildingBlocksPhysicsWrapper;