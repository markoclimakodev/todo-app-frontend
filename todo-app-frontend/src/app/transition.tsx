'use client'

import {motion} from 'framer-motion'


interface TransitionProps {
    children: React.ReactNode
}
function Transition({children}:TransitionProps) {
return (
    <motion.section
    initial={{y: 20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{ease: 'easeInOut', duration: 0.55}}
    >
    {children}
    </motion.section>
)
}

export default Transition