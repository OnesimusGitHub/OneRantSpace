import { useRants } from '../rants/useRants';
import { Package2Icon, PlusCircleIcon } from 'lucide-react';

function AddRantForm() {
const {loading, addRant, formData, setFormData} = useRants();

  return (

    <dialog id="add_rant_modal" className="modal-box border border-white/10 rounded-2xl bg-primary w-150 left-164 top-57">
        
      <div className="modal-box flex flex-col items-center justify-center max-w-md p-5 mx-auto  
        border  rounded-2xl bg-primary">
        {/* CLOSE BUTTON */}
        <button className="label-text text-base font-medium text-neutral-400 absolute right-2 top-2" onClick={() => document.getElementById('add_rant_modal').close()}>X</button>

        {/* MODAL HEADER */}
        <h3 className="label-text text-base font-medium text-neutral-400">Add New Rant</h3>

        <form onSubmit={(e) => { e.preventDefault(); addRant(e); }} className="space-y-6 w-120">
          <div className="grid gap-6">
            {/* rant name */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-base font-medium text-neutral-400">Rant header</span>
              </label>
              <div className="relative">
                
                <input
                  type="text"
                  placeholder="Enter rant header"
                  maxLength="100"
                  className="field-input field-input-focus text-base font-medium text-neutral-400 "
                  value={formData?.header || ''}
                  onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                />
              </div>
            </div>

            {/* rant content */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium  text-neutral-400">Rant context</span>
              </label>
              <div className="relative">
                
                <input
                  type="text"
                  placeholder="Enter Portfolio Bio"
                  className="field-input field-input-focus text-base font-medium text-neutral-400"
                  value={formData?.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
            </div>

            {/* rant youtube_url */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium  text-neutral-400">Rant video</span>
              </label>
              <div className="relative">
                
                <input
                  type="text"
                  placeholder="Enter rant video"
                  className="field-input field-input-focus text-base font-medium text-neutral-400"
                  value={formData?.youtube_url || ''}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                />
              </div>
            </div>

           

          </div>

          {/* MODAL ACTIONS */}
          <div className="flex justify-between items-center mb-12">
            <button 
              type="button"
              className="label-text text-base font-medium  text-neutral-400 flex justify-center items-center cursor-pointer"
              onClick={() => document.getElementById('add_rant_modal').close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="label-text text-base font-medium  text-neutral-400 flex justify-center items-center cursor-pointer"
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


    </dialog>
  );
}

export default AddRantForm;