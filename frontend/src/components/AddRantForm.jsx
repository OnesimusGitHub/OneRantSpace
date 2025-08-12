import { useRants } from '../rants/useRants';
import { Package2Icon, PlusCircleIcon } from 'lucide-react';

function AddRantForm() {
  const { loading, addRant, formData, setFormData } = useRants();

  return (
    <dialog
      id="add_rant_modal"
      className="modal-box border border-white/10 rounded-2xl bg-primary max-w-xs w-full sm:max-w-md p-0 m-0"
      style={{ padding: 0 }}
    >
      <div className="flex flex-col items-center justify-center w-full p-4 sm:p-6 mx-auto border rounded-2xl bg-primary relative">
        {/* CLOSE BUTTON */}
        <button
          className="label-text text-base font-medium text-neutral-400 absolute right-3 top-3 z-10"
          onClick={() => document.getElementById('add_rant_modal').close()}
        >
          ✕
        </button>

        {/* MODAL HEADER */}
        <h3 className="label-text text-lg font-semibold text-neutral-200 mb-4 mt-2 text-center">Add New Rant</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addRant(e);
          }}
          className="space-y-5 w-full"
        >
          <div className="grid gap-4">
            {/* rant name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium text-neutral-400">Rant header</span>
              </label>
              <input
                type="text"
                placeholder="Enter rant header"
                maxLength="100"
                className="field-input field-input-focus text-base font-medium text-neutral-400"
                value={formData?.header || ''}
                onChange={(e) => setFormData({ ...formData, header: e.target.value })}
              />
            </div>

            {/* rant content */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium text-neutral-400">Rant content</span>
              </label>
              <textarea
                placeholder="Enter rant content"
                className="field-input field-input-focus text-base font-medium text-neutral-400 min-h-[80px] resize-none"
                value={formData?.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            {/* rant youtube_url */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium text-neutral-400">YouTube URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter YouTube URL"
                className="field-input field-input-focus text-base font-medium text-neutral-400"
                value={formData?.youtube_url || ''}
                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              />
            </div>

           

          </div>

          {/* MODAL ACTIONS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 mb-2 w-full">
            <button
              type="button"
              className="label-text text-base font-medium text-neutral-400 flex justify-center items-center cursor-pointer w-full sm:w-auto py-2"
              onClick={() => document.getElementById('add_rant_modal').close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="label-text text-base font-medium text-neutral-400 flex justify-center items-center cursor-pointer w-full sm:w-auto py-2"
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