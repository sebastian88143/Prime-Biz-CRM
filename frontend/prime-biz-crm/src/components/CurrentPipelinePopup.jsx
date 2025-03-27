import React from "react";
import { FaEdit, FaFileInvoice, FaArrowRight, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CurrentPipelinePopup = ({ isOpen, selectedDeal, onClose, onDealUpdated }) => {
    if (!isOpen || !selectedDeal) return null;

    const navigate = useNavigate();
    const isWonDeal = selectedDeal.stage === "Won";

    const handleEditDeal = () => {
        console.log("Edit data");
        onClose();
        navigate(`/pipeline/${selectedDeal.id}`, { state: { deal: selectedDeal } });
    };

    const handleMoveToNextStage = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8000/api/pipeline/${selectedDeal.id}/move_stage/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update stage");
            }

            onDealUpdated();
            onClose();
        } catch (error) {
            console.error("Error moving deal to next stage:", error);
        }
    };

    const handleMarkAsLostAndDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8000/api/pipeline/${selectedDeal.id}/mark_as_lost/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to mark pipeline as lost");
            }

            onDealUpdated();
            onClose();
        } catch (error) {
            console.error("Error mark pipeline as lost:", error);
        }
    };

    const handleGenerateInvoice = () => {
        console.log(`Generating invoice for deal ${selectedDeal.id}...`);
        //onClose();
    };

    const handleMarkAsWinAndDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8000/api/pipeline/${selectedDeal.id}/mark_as_won/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to mark pipeline as won");
            }

            onDealUpdated();
            onClose();
        } catch (error) {
            console.error("Error mark pipeline as won:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs">
            <div className="bg-white p-12 rounded-lg shadow-lg w-1/2 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4 text-center">{selectedDeal.company}</h2>
                <p className="text-gray-600 mb-4 text-center">Deal name: {selectedDeal.deal}</p>
                <p className="text-gray-500 mb-4 text-center">Value: {selectedDeal.value}</p>

                <div className="flex space-x-4 mb-4 justify-center">
                    {isWonDeal ? (
                        <>
                            <button
                                onClick={handleEditDeal}
                                className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                <FaEdit className="mr-2" /> Edit Data
                            </button>
                            <button
                                onClick={handleGenerateInvoice}
                                className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                <FaFileInvoice className="mr-2" /> Generate Invoice
                            </button>
                            <button
                                onClick={handleMarkAsWinAndDelete}
                                className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                <FaTrash className="mr-2" /> Remove from Pipeline
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEditDeal}
                                className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                <FaEdit className="mr-2" /> Edit Data
                            </button>
                            <button
                                onClick={handleMoveToNextStage}
                                className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                <FaArrowRight className="mr-2" /> Move to Next Stage
                            </button>
                            <button
                                onClick={handleMarkAsLostAndDelete}
                                className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                <FaTrash className="mr-2" /> Mark as Lost & Remove
                            </button>
                        </>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CurrentPipelinePopup;