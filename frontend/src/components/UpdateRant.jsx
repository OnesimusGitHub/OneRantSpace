import { useNavigate } from "react-router-dom";
import {useRants} from '../rants/useRants';
import { useEffect } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

function UpdateRant({ rant }) {
  const {
    formData,
    setFormData,
    loading,
    error,
    editRant,
    deleteRant,
  } = useRants();
  
  const navigate = useNavigate();

  const rant_id = rant?.rant_id;


  useEffect(() => {
    if (rant) {
      setFormData({
        header: rant.header || '',
        content: rant.content || '',
        youtube_url: rant.youtube_url || ''
      });
    }
  }, [rant, setFormData]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Rant?")) {
      await deleteRant(rant_id);
      navigate('/');
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

  // Don't render modal if no rant is provided
  if (!rant || !rant.rant_id) {
    return null;
  }

  return (
    <dialog id={`UpdateRant-${rant?.rant_id}`} className="modal border border-white/10 rounded-2xl bg-primary w-150 left-164 top-57">
    <div className="modal-box border border-white/10 rounded-2xl bg-primary ">
        {/* CLOSE BUTTON */}
        <button className="label-text text-base font-medium text-neutral-400 absolute right-2 top-2" onClick={() => document.getElementById(`UpdateRant-${rant?.rant_id}`).close()}>X</button>

    
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Rant List
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Rant FORM */}
        <div className="space-y-6 w-120">
          <div className="card-body">
            <h2 className="label-text text-base font-medium text-neutral-400">Edit Rant</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                editRant(rant_id);
              }}
              className="space-y-6"
            >
              {/* Rant header */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-neutral-400">Rant Header</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Rant Title"
                  className="field-input field-input-focus text-base font-medium text-neutral-400"
                  value={formData?.header || ""}
                  onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                />
              </div>

              {/* Rant content */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-neutral-400">Rant Content</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Rant content"
                  className="field-input field-input-focus text-base font-medium text-neutral-400"
                  value={formData?.content || ""}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              {/* Rant youtube_url */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-neutral-400">Rant Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Rant email"
                 className="field-input field-input-focus text-base font-medium text-neutral-400"   
                  value={formData?.youtube_url || ""}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                />
              </div>


              {/* FORM ACTIONS */}
              <div className="flex justify-between mt-8">
                <button type="button" onClick={handleDelete} className="label-text text-base font-medium  text-neutral-400 flex justify-center items-center">
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Rant
                </button>

                <button
                  type="submit"
                  className="label-text text-base font-medium  text-neutral-400 flex justify-center items-center"
                  disabled={loading || !formData?.header || !formData?.content || !formData?.youtube_url }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    </dialog>
  );
}

export default UpdateRant;