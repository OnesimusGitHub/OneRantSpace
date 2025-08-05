import {useRants} from '../rants/useRants';
import { use, useEffect } from 'react';
import { RefreshCwIcon } from 'lucide-react';

import RantPagination from '../components/Pagination';
function RantSection() {
    const {rants, loading, error, fetchRants} = useRants();

    useEffect(() => {
        fetchRants();
    },[fetchRants])

    console.log("rants", rants);
    return (
        <section className="min-h-screen py-20 px-5 sm:px-10">
            <div className='max-w-7xl mx-auto'>
              
                <div className='flex justify-between items-center mb-12'>
                    <h1 className='text-3xl md:text-4xl font-bold text-white'>Latest Rants</h1>
                    <button 
                        className='bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-colors duration-200' 
                        onClick={fetchRants}
                    >
                        <RefreshCwIcon className='w-5 h-5 text-white' />
                    </button>
                </div>

   
                {error && (
                    <div className='bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-8'>
                        {error}
                    </div>
                )}

              
                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
                    </div>
                ) : (
                    
                    <RantPagination rants={rants} />
                )}
            </div>
        </section>
    )
}

export default RantSection;