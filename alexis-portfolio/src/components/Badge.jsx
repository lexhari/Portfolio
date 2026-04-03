import { motion } from 'framer-motion';

function Badge({ children, className, badgeRef, badgeInView }) {
    return (
        <motion.div
            ref={badgeRef}
            initial={{ scale: 1, rotate: 0 }}
            animate={badgeInView ? {
                scale: [1, 1.5, 1],
                rotate: [0, 5, 0]
            } : {}}
            transition={{
                duration: 0.8,
                ease: 'easeInOut',
                times: [0, 0.5, 1]
            }}
            style={{ transformOrigin: '50% 50%', width: 'fit-content' }}
        >
            <div className="bg-pink text-sm rounded-xl text-creamBG w-fit font-dm-sans font-medium px-4 py-2 hover:scale-150 hover:rotate-[5deg] transition-all duration-200 select-none">
                {children}
            </div>
        </motion.div>
    );
}

export default Badge;