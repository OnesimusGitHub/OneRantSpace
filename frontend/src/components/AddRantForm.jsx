import { useRants } from '../rants/useRants';
import { Package2Icon, PlusCircleIcon } from 'lucide-react';

function AddRantForm() {
const {loading, addRant, formData, setFormData} = useRants();

  return (

    <dialog id="add_rant_modal" className="modal">
      <div className="modal-box w-11/12 max-w-lg mx-auto bg-primary border border-white/10 rounded-2xl p-4 sm:p-6">
        {/* CLOSE BUTTON */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-neutral-400" onClick={() => document.getElementById('add_rant_modal').close()}>✕</button>

        {/* MODAL HEADER */}
        <h3 className="text-lg font-bold text-neutral-400 mb-4 text-center">Add New Rant</h3>

        <form onSubmit={(e) => { e.preventDefault(); addRant(e); }} className="space-y-4">
          <div className="grid gap-4">
            {/* rant name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base font-medium text-neutral-400">Rant header</span>
              </label>
              <input
                type="text"
                placeholder="Enter rant header"
                maxLength="100"
                className="input input-bordered w-full bg-white/5 border-white/20 text-neutral-400 placeholder-neutral-500 text-sm sm:text-base"
                value={formData?.header || ''}
                onChange={(e) => setFormData({ ...formData, header: e.target.value })}
              />
            </div>

            {/* rant content */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base font-medium text-neutral-400">Rant content</span>
              </label>
              <textarea
                placeholder="Enter rant content"
                className="textarea textarea-bordered w-full bg-white/5 border-white/20 text-neutral-400 placeholder-neutral-500 text-sm sm:text-base h-20 sm:h-24"
                value={formData?.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            {/* rant youtube_url */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base font-medium text-neutral-400">YouTube URL</span>
              </label>
              <input
                type="url"
                placeholder="Enter YouTube URL"
                className="input input-bordered w-full bg-white/5 border-white/20 text-neutral-400 placeholder-neutral-500 text-sm sm:text-base"
                value={formData?.youtube_url || ''}
                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              />
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between items-center pt-4">
            <button 
              type="button"
              className="btn btn-outline btn-sm sm:btn-md w-full sm:w-auto text-neutral-400 border-neutral-600 hover:bg-neutral-700"
              onClick={() => document.getElementById('add_rant_modal').close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto"
              disabled={!formData?.header || !formData?.content || !formData?.youtube_url || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm sm:text-base">Add Rant</span>
                </>
              )}  
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddRantForm;