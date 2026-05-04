import { memo } from 'react';

function Badge({ children, className, badgeRef }) {
    return (
        <div ref={badgeRef} className="bg-pink text-sm rounded-xl text-creamBG w-fit font-dm-sans font-medium px-4 py-2 hover:scale-105 hover:rotate-1 transition-all duration-200 select-none">
            {children}
        </div>
    );
}

export default memo(Badge);