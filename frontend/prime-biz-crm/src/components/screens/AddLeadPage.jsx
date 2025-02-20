import React from "react";

const AddLeadPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24 px-4 pb-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-8xl">
        <h2 className="text-xl font-semibold mb-4">Add New Lead</h2>

        {/* Kontener 2-kolumnowy */}
        <div className="flex">
          {/* Lewa strona - wszystkie inputy */}
          <div className="w-1/2 pr-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Company Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="Value" />
            </div>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium">Contact Person</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="Value" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium invisible">.</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="Value" />
              </div>
            </div>
            {["Email", "Phone", "Address", "Website"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium">{field}</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="Value" />
              </div>
            ))}
            
            {/* Dropdown dla Size */}
            <div>
              <label className="block text-sm font-medium">Size</label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Big">Big</option>
              </select>
            </div>

            {/* Dropdown dla Industry */}
            <div>
              <label className="block text-sm font-medium">Industry</label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Services">Services</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Prawa strona - Notes + Checkbox */}
          <div className="w-1/2 pl-6 flex flex-col">
            <div>
              <label className="block text-sm font-medium">Notes</label>
              <textarea className="w-full border border-gray-300 rounded-md p-2 h-[300px]" placeholder="Value"></textarea>
            </div>
            <div className="flex items-center mt-2">
              <input type="checkbox" id="top-lead" className="form-checkbox h-4 w-4 text-blue-600" />
              <label htmlFor="top-lead" className="text-sm ml-2">Mark as a Top Lead</label>
            </div>
          </div>
        </div>

        {/* Przycisk Submit */}
        <div className="mt-6 text-right">
          <button className="bg-gray-900 text-white px-10 py-3 w-1/3 rounded-md shadow">
            Add New Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLeadPage;