function Badge({ children, className }) {
    return (
        <div className="bg-pink text-sm rounded-xl text-creamBG w-fit font-dm-sans font-medium px-4 py-2 hover:scale-150 hover:rotate-[5deg] transition-all duration-200 select-none">
            {children}
        </div>
    );
}

export default Badge;