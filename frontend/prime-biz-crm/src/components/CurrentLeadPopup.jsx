import React from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const CurrentLeadPopup = ({ isOpen, selectedLead, onClose }) => {
    if (!isOpen) return null;

    const handleEditLead = () => {
        console.log("Edit Lead:", selectedLead);
        // Tutaj dodaj logikę do edycji leada
    };

    const handleAddPipeline = () => {
        console.log("Add Pipeline for Lead:", selectedLead);
        // Tutaj dodaj logikę do dodania pipeline
    };

    const handleDeleteLead = () => {
        console.log("Delete Lead:", selectedLead);
        // Tutaj dodaj logikę do usunięcia leada
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs">
            <div className="bg-white p-12 rounded-lg shadow-lg w-1/2 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4 text-center">Selected Lead: {selectedLead.company_name}</h2>
                <p className="text-sm text-gray-500 mb-4 text-center">Choose an action for the selected lead:</p>

                <div className="flex space-x-4 mb-4 justify-center">
                    <button
                        onClick={handleEditLead}
                        className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        <FaEdit className="mr-2" /> Edit Lead
                    </button>

                    <button
                        onClick={handleAddPipeline}
                        className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        <FaPlus className="mr-2" /> Add Pipeline
                    </button>

                    <button
                        onClick={handleDeleteLead}
                        className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        <FaTrash className="mr-2" /> Delete Lead
                    </button>
                </div>

                <button onClick={onClose} className="w-full bg-blue-500 text-white py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default CurrentLeadPopup;