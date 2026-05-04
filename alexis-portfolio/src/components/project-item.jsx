export default function ProjectItem({ imageSrc, imageAlt, title, description, onImageClick }) {
    return (
        <div className="flex flex-col gap-5 w-full">
            <button onClick={onImageClick} className="hover:scale-110 hover:rotate-[3deg] transition-all duration-500 bg-none border-none p-0 cursor-pointer">
                <img src={imageSrc} alt={imageAlt} className="object-cover w-full rounded-2xl" />
            </button>

            <div className="flex flex-col gap-2 w-full justify-between items-start">
                <h3 className="text-navy text-2xl font-bricolage-grotesque font-medium ">{title}</h3>
                <p className="text-offBlack text-sm font-dm-sans">{description}</p>
            </div>
        </div>
    )
}