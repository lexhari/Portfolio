import BuildingBlocks from "../components/BuildingBlocks";

function Homepage() {
    return (
        <section className="overflow-hidden w-full h-screen bg-creamBG px-horizontal py-20 flex flex-row items-center">
            <div className="flex flex-col justify-between w-[60%]">
                <h1 className="text-5xl font-bricolage-grotesque text-navy font-light"><span className="text-pink font-semibold">Alexis</span> is an <span className="text-yellow font-semibold">aspiring UI / UX Designer</span> who aims to create <span className="font-normal">intuitive digital experiences from user pain points</span>.</h1>
            </div>
            <div className="flex flex-col w-[40%] items-center">
                <BuildingBlocks variant="Tools">Tools</BuildingBlocks>
                <BuildingBlocks variant="Titles">Titles</BuildingBlocks>
                <BuildingBlocks variant="Skills">Skills</BuildingBlocks>
                <BuildingBlocks variant="Quality">Quality</BuildingBlocks>
                <BuildingBlocks variant="Values">Values</BuildingBlocks>
            </div>
        </section>
    )

        ;
}
export default Homepage;
