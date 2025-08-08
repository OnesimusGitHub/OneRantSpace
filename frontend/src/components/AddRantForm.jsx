import { useportfolioProfile } from "../portfolio/useportfolioProfile";
import { Package2Icon, PlusCircleIcon } from 'lucide-react';

function AddPortfolioForm() {
  const { addPortfolio, formData, setFormData, loading } = useportfolioProfile();

  return (
    <dialog id="add_portfolio_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('add_portfolio_modal').close()}>X</button>

        {/* MODAL HEADER */}
        <h3 className="font-bold text-xl mb-8">Add New Portfolio</h3>

        <form onSubmit={(e) => { e.preventDefault(); addPortfolio(e); }} className="space-y-6">
          <div className="grid gap-6">
            {/* PORTFOLIO NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Portfolio User Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter User Portfolio Name"
                  maxLength="100"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData?.portname || ''}
                  onChange={(e) => setFormData({ ...formData, portname: e.target.value })}
                />
              </div>
            </div>

            {/* PORTFOLIO BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Portfolio Bio</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Portfolio Bio"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData?.portbio || ''}
                  onChange={(e) => setFormData({ ...formData, portbio: e.target.value })}
                />
              </div>
            </div>

            {/* PORTFOLIO EMAIL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Portfolio Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="email"
                  placeholder="Enter Portfolio Email"
                  maxLength="100"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData?.portemail || ''}
                  onChange={(e) => setFormData({ ...formData, portemail: e.target.value })}
                />
              </div>
            </div>

            {/* PORTFOLIO PHONE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Portfolio Phone</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  maxLength="11"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData?.portphone || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, portphone: value });
                  }}
                  inputMode="numeric"
                />
              </div>
            </div>

            {/* PORTFOLIO IMAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Portfolio Profile Picture</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Image URL"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData?.portimage || ''}
                  onChange={(e) => setFormData({ ...formData, portimage: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <button 
              type="button"
              className="btn btn-ghost"
              onClick={() => document.getElementById('add_portfolio_modal').close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={!formData?.portname || !formData?.portbio || !formData?.portemail || !formData?.portphone || !formData?.portimage || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Portfolio
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* BACKDROP */}
      <div className="modal-backdrop" onClick={() => document.getElementById('add_portfolio_modal').close()}>
        <button>close</button>
      </div>
    </dialog>
  );
}

export default AddPortfolioForm;