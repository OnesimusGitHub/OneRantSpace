import React from 'react'
import { useRants } from '../rants/useRants';
import { EditIcon, Trash2Icon } from 'lucide-react';
import UpdateRant from './UpdateRant';
import { toast } from 'react-toastify';

function AdminRantCard({ rants, onHoverVideo }) {
  const { deleteRant } = useRants();

  // Add null check - don't render if rants is null/undefined
  if (!rants) {
    return null;
  }

  const handleDelete = async () => {
   
    
    if (!rants?.rant_id) {
      toast.error('No rant ID found');
      return;
    }

    if (window.confirm('Are you sure you want to delete this rant?')) {
      try {
       
        await deleteRant(rants.rant_id);
      } catch (error) {
        console.error('Error deleting rant:', error);
      }
    }
  };

  const handleMouseEnter = () => {
    onHoverVideo?.(rants?.youtube_url);
  };

  const handleMouseLeave = () => {
    onHoverVideo?.(null);
  };

  return (
    <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl
     hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}>
      
      <div className='space-y-4'>
        <h2 className='text-xl font-bold text-white'>{rants?.header || 'No Header'}</h2>
        <p className='text-neutral-300 text-sm leading-relaxed'>{rants?.content || 'No Content'}</p>

      </div>

      <div className='card-actions justify-end mt-4'>
        <button 
          className='bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-colors duration-200' 
          onClick={() => {
            if (rants?.rant_id) {
              document.getElementById(`UpdateRant-${rants.rant_id}`).showModal();
            }
          }}
        >
          <EditIcon className='size-4' />
        </button>
        
        <button 
          className='bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-colors duration-200' 
          onClick={handleDelete}
          disabled={!rants?.rant_id} 
        >
          <Trash2Icon className='size-4' />
        </button>
      </div>

      {rants && <UpdateRant rant={rants} />}
    </div>
  )
}

export default AdminRantCard