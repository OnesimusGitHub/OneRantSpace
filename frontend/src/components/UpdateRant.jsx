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
  // Remove useParams since we're getting rant as prop
  const rant_id = rant?.rant_id;

  // Instead of fetching, just use the rant prop directly
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
    <dialog id={`UpdateRant-${rant?.rant_id}`} className="modal">
    <div className="modal-box">
        {/* CLOSE BUTTON */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById(`UpdateRant-${rant?.rant_id}`).close()}>X</button>

        {/* MODAL HEADER */}
        <h3 className="font-bold text-xl mb-8">Add New Rant</h3>



    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Rant List
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        

        {/* Rant FORM */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Rant</h2>

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
                  <span className="label-text text-base font-medium">Rant Header</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Rant Title"
                  className="input input-bordered w-full"
                  value={formData?.header || ""}
                  onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                />
              </div>

              {/* Rant content */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Rant Content</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Rant content"
                  className="input input-bordered w-full"
                  value={formData?.content || ""}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              {/* Rant youtube_url */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Rant Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Rant email"
                  className="input input-bordered w-full"
                  value={formData?.youtube_url || ""}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                />
              </div>


              {/* FORM ACTIONS */}
              <div className="flex justify-between mt-8">
                <button type="button" onClick={handleDelete} className="btn btn-error">
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Rant
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
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