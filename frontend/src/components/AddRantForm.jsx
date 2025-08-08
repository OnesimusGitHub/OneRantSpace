import { useRants } from '../rants/useRants';
import { Package2Icon, PlusCircleIcon } from 'lucide-react';

function AddRantForm() {
const {loading, addRant, formData, setFormData} = useRants();

  return (
    <dialog id="add_rant_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('add_rant_modal').close()}>X</button>

        {/* MODAL HEADER */}
        <h3 className="font-bold text-xl mb-8">Add New Rant</h3>

        <form onSubmit={(e) => { e.preventDefault(); addRant(e); }} className="space-y-6">
          <div className="grid gap-6">
            {/* rant name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Rant header</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter rant header"
                  maxLength="100"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData?.header || ''}
                  onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                />
              </div>
            </div>

            {/* rant content */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Rant context</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Portfolio Bio"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData?.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
            </div>

            {/* rant youtube_url */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Rant video</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter rant video"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData?.youtube_url || ''}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                />
              </div>
            </div>

           

          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <button 
              type="button"
              className="btn btn-ghost"
              onClick={() => document.getElementById('add_rant_modal').close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={!formData?.header || !formData?.content || !formData?.youtube_url || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Rant
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* BACKDROP */}
      <div className="modal-backdrop" onClick={() => document.getElementById('add_rant_modal').close()}>
        <button>close</button>
      </div>
    </dialog>
  );
}

export default AddRantForm;