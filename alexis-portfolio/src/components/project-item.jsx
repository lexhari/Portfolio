export default function ProjectItem({ imageSrc, imageAlt, title, description, containerRef }) {
    return (
        <div className="flex flex-col gap-5 w-full">
            <a href={containerRef ? `#${containerRef}` : "#"} className="hover:scale-110 hover:rotate-[3deg] transition-all duration-500">
                <img src={imageSrc} alt={imageAlt} className="object-cover w-full rounded-2xl" />
            </a>

            <div className="flex flex-col gap-2 w-full justify-between items-start">
                <h3 className="text-navy text-2xl font-bricolage-grotesque font-medium ">{title}</h3>
                <p className="text-offBlack text-sm font-dm-sans">{description}</p>
            </div>
        </div>
    )
}