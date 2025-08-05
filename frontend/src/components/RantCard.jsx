import React from 'react'

function RantCard({ rants }) {

  
  return (
    <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
      <div className='space-y-4'>
        <h2 className='text-xl font-bold text-white'>{rants?.header || 'No Header'}</h2>
        <p className='text-neutral-300 text-sm leading-relaxed'>{rants?.content || 'No Content'}</p>
        {rants?.youtube_url && (
          <div className='flex justify-end pt-4'>
            <a 
              href={rants.youtube_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className='bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200'
            >
              Watch Video
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default RantCard