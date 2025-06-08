import BuildingBlocksPhysicsWrapper from "../components/BuildingBlocksPhysicsWrapper";

function Homepage() {
    return (
        <section className="relative overflow-hidden w-full h-screen bg-creamBG px-horizontal py-20 flex flex-row items-center select-none">
            {/* Content layer */}
            <div className="relative z-10 flex flex-col justify-between w-[60%]">
                <h1 className="text-5xl font-bricolage-grotesque text-navy font-light select-none mb-30">
                    <span className="text-pink font-semibold">Alexis</span> is an <span className="text-yellow font-semibold">aspiring UI / UX Designer</span> who aims to create <span className="font-normal">intuitive digital experiences from user pain points</span>.
                </h1>
            </div>

            {/* Background physics layer */}
            <BuildingBlocksPhysicsWrapper />
        </section>
    );
}
export default Homepage;