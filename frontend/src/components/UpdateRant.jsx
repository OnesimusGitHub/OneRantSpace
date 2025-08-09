import { useNavigate } from "react-router-dom";
import {useRants} from '../rants/useRants';
import { useEffect, useState } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

function UpdateRant({ rant }) {
  const {
    loading,
    error,
    editRant,
    deleteRant,
  } = useRants();
  
  const navigate = useNavigate();
  const rant_id = rant?.rant_id;


  const [localFormData, setLocalFormData] = useState({
    header: '',
    content: '',
    youtube_url: ''
  });



  useEffect(() => {
    if (rant && rant.rant_id) {
 
      setLocalFormData({
        header: rant.header || '',
        content: rant.content || '',
        youtube_url: rant.youtube_url || ''
      });
    }
  }, [rant]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rant_id && localFormData.header && localFormData.content && localFormData.youtube_url) {
      try {
        // Temporarily set the global formData for the editRant function
        const { setFormData } = useRants.getState();
        setFormData(localFormData);
        await editRant(rant_id);
        // Close the modal after successful edit
        document.getElementById(`UpdateRant-${rant_id}`).close();
      } catch (error) {
        // Error is already handled by the editRant function with toast
        console.error('Edit failed:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Rant?")) {
      await deleteRant(rant_id);

      document.getElementById(`UpdateRant-${rant_id}`).close();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  
  if (!rant || !rant.rant_id) {
    return null;
  }

  return (
    <dialog id={`UpdateRant-${rant?.rant_id}`} className="modal-box border border-white/10 rounded-2xl bg-primary w-130 left-175 top-57">
      <div className="modal-box flex flex-col items-center justify-center max-w-md p-5 mx-auto  rounded-2xl bg-primary">
        {/* CLOSE BUTTON */}
        <button 
          className="label-text text-base font-medium text-neutral-400 absolute right-2 top-2" 
          onClick={() => document.getElementById(`UpdateRant-${rant?.rant_id}`).close()}
        >
          ✕
        </button>

        {/* MODAL HEADER */}
        <h3 className="label-text text-base font-medium text-neutral-400 mb-4">Edit Rant</h3>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full"
        >
          <div className="grid gap-6">
            {/* Rant header */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium text-neutral-400">Rant Header</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Rant Title"
                  maxLength="100"
                  className="field-input field-input-focus text-base font-medium text-neutral-400"
                  value={localFormData.header}
                  onChange={(e) => setLocalFormData({ ...localFormData, header: e.target.value })}
                />
              </div>
            </div>

            {/* Rant content */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium text-neutral-400">Rant Content</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Rant content"
                  className="field-input field-input-focus text-base font-medium text-neutral-400"
                  value={localFormData.content}
                  onChange={(e) => setLocalFormData({ ...localFormData, content: e.target.value })}
                />
              </div>
            </div>

            {/* Rant youtube_url */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium text-neutral-400">Rant Video</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter rant video URL"
                  className="field-input field-input-focus text-base font-medium text-neutral-400"   
                  value={localFormData.youtube_url}
                  onChange={(e) => setLocalFormData({ ...localFormData, youtube_url: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="flex justify-between items-center mb-12">
            <button 
              type="button"
              className="flex items-center bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 rounded-full p-3 transition-colors duration-200 text-red-400"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-5 mr-2" />
              Delete Rant
            </button>
            
            <button
              type="submit"
              className="flex items-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-colors duration-200"
              disabled={!localFormData.header || !localFormData.content || !localFormData.youtube_url || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <span className="label-text text-base font-medium text-neutral-400 flex justify-center items-center">
                  <SaveIcon className="size-5 mr-2" />
                  Save Changes
                </span>
              )}  
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default UpdateRant;