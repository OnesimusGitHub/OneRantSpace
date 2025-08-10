import {useState} from 'react'
import AdminRantCard from '../components/AdminRantCard';
import {motion, AnimatePresence} from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function AdminPagination({rants, onHoverVideo}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0); 

 
    if (!Array.isArray(rants) || rants.length === 0) {
        return <div className='text-center text-white'>No Rants Available</div>
    }

    
    const validRants = rants.filter(rant => rant && rant.rant_id);
    
    if (validRants.length === 0) {
        return <div className='text-center text-white'>No Valid Rants Available</div>
    }

    const handlePrev = () => {
        setDirection(-1);
        setCurrentPage((prev) => (prev - 1 + validRants.length) % validRants.length);
    }

    const handleNext = () => {
        setDirection(1); 
        setCurrentPage((prev) => (prev + 1) % validRants.length);
    }

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    return (
        <div className='relative w-full max-w-4xl mx-auto h-[450px] sm:h-[400px] xs:h-[350px] flex items-center justify-center overflow-hidden px-2 sm:px-4'>

            <div className='relative w-full max-w-[400px] sm:w-[350px] xs:w-[300px] h-full flex items-center justify-center'>
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
                        <AdminRantCard 
                            rants={validRants[currentPage]}
                            onHoverVideo={onHoverVideo}
                            key={validRants[currentPage]?.rant_id || currentPage} 
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

       
            <button
                onClick={handlePrev}
                className='absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-2 sm:p-3 transition-all duration-200 hover:scale-110'
                disabled={validRants.length <= 1}
            >
                <ChevronLeft className='w-4 h-4 sm:w-6 sm:h-6 text-white' />
            </button>

            <button
                onClick={handleNext}
                className='absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-2 sm:p-3 transition-all duration-200 hover:scale-110'
                disabled={validRants.length <= 1}
            >
                <ChevronRight className='w-4 h-4 sm:w-6 sm:h-6 text-white' />
            </button>

            
            <div className='absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2'>
                {validRants.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentPage ? 1 : -1);
                            setCurrentPage(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentPage 
                                ? 'bg-white w-4 sm:w-6' 
                                : 'bg-white/50 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default AdminPagination