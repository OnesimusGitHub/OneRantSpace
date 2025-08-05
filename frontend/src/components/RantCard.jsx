import React from 'react'

function RantCard({ rants, onHoverVideo }) {
  const handleMouseEnter = () => {
    console.log("Hovering video:", rants?.youtube_url);
    onHoverVideo?.(rants?.youtube_url);
  };

  const handleMouseLeave = () => {
    console.log("Leaving video hover");
    onHoverVideo?.(null);
  };
  
  return (
    <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl
     hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}
     >
      
      <div className='space-y-4'>
        <h2 className='text-xl font-bold text-white'>{rants?.header || 'No Header'}</h2>
        <p className='text-neutral-300 text-sm leading-relaxed'>{rants?.content || 'No Content'}</p>
      </div>
    </div>
  )
}

export default RantCard