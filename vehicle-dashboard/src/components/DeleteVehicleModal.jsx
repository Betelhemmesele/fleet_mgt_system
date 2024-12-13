const DeleteVehicleModal = ({ isOpen, onClose, onDelete, vehicle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Delete Vehicle</h2>
                <p>Are you sure you want to delete <strong>{vehicle.name}</strong>?</p>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={() => { onDelete(vehicle._id); onClose(); }} className="px-4 py-2 bg-red-500 text-white rounded">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteVehicleModal;
