import React from "react";

const AddPipelinePage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24 px-4 pb-4">
            <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-8xl">
                <h2 className="text-xl font-semibold mb-4">Add To Pipeline</h2>

                <div className="flex">
                    <div className="w-1/2 pr-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Company Name</label>
                            <input
                                type="text"
                                name="company_name"
                                value=""
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">Contact Person Name</label>
                                <input
                                    type="text"
                                    name="contact_person_name"
                                    value=""
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">Contact Person Surname</label>
                                <input
                                    type="text"
                                    name="contact_person_surname"
                                    value=""
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="text"
                                name="email"
                                value=""
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value=""
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Website</label>
                            <input
                                type="text"
                                name="website"
                                value=""
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Size</label>
                            <select
                                name="size"
                                value="Small"
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Big">Big</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Industry</label>
                            <select
                                name="industry"
                                value="Other"
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Retail">Retail</option>
                                <option value="Services">Services</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-1/2 pl-6 flex flex-col">
                        <div>
                            <label className="block text-sm font-medium">Notes</label>
                            <textarea
                                name="notes"
                                value="Example Notes"
                                className="w-full border border-gray-300 rounded-md p-2 h-[300px]"
                            ></textarea>

                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Deal Name</label>
                            <input
                                type="text"
                                name="deal_name"
                                value=""
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Expected Deal Value</label>
                            <input
                                type="text"
                                name="expected_deal_value"
                                value=""
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <button
                        type="submit"
                        className="bg-gray-900 text-white px-10 py-3 w-1/3 rounded-md shadow"
                    >
                        Add To Pipeline
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPipelinePage;