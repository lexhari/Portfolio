export default function ProjectItem({ imageSrc, imageAlt, title, description }) {
    return (
        <div className="flex flex-col w-1/4">
            <div className="flex flex-col gap-5 w-full justify-between">
                <img src={imageSrc} alt={imageAlt} className="object-cover" />

                <div className="flex flex-row gap-2 w-full justify-between items-center">
                    <h3 className="text-navy text-2xl font-bricolage-grotesque font-medium w-1/2 ">{title}</h3>
                    <p className="text-offBlack text-md font-dm-sans w-1/2">{description}</p>
                </div>
            </div>


        </div>
    )
}