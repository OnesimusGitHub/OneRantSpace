import {useState} from 'react'
import RantCard from '../components/RantCard';
import {motion, AnimatePresence} from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({rants, onHoverVideo}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0); 

    if (!rants || rants.length === 0) return <div className='text-center text-white'>No Rants Available</div>

    const handlePrev = () => {
        setDirection(-1);
        setCurrentPage((prev) => (prev - 1 + rants.length) % rants.length);
    }

    const handleNext = () => {
        setDirection(1); 
        setCurrentPage((prev) => (prev + 1) % rants.length);
    }

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <div className='relative w-full max-w-4xl mx-auto h-[450px] flex items-center justify-center overflow-hidden'>

            <div className='relative w-[400px] h-full flex items-center justify-center'>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentPage}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className='absolute w-full'
                    >
                        <RantCard rants={rants[currentPage]}
                        onHoverVideo={onHoverVideo} />
                    </motion.div>
                </AnimatePresence>
            </div>

       
            <button
                onClick={handlePrev}
                className='absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-200 hover:scale-110'
                disabled={rants.length <= 1}
            >
                <ChevronLeft className='w-6 h-6 text-white' />
            </button>

            <button
                onClick={handleNext}
                className='absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-200 hover:scale-110'
                disabled={rants.length <= 1}
            >
                <ChevronRight className='w-6 h-6 text-white' />
            </button>

            
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
                {rants.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentPage ? 1 : -1);
                            setCurrentPage(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentPage 
                                ? 'bg-white w-6' 
                                : 'bg-white/50 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Pagination