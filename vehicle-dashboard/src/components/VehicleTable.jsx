import React, { useEffect, useState } from 'react';
import { fetchVehicles, addVehicle, updateVehicle, deleteVehicle  } from '../services/vehicleService';
import AddVehicleModal from './AddVehicleModal';
import UpdateVehicleModal from './UpdateVehicleModal';
import DeleteVehicleModal from './DeleteVehicleModal';

const VehicleTable = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        const getVehicles = async () => {
            try {
                const data = await fetchVehicles();
                setVehicles(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch vehicles');
                setLoading(false);
            }
        };
        getVehicles();
    }, []);
 // Handle adding a vehicle
 const handleAddVehicle = async (newVehicle) => {
    try {
        const addedVehicle = await addVehicle(newVehicle);
        setVehicles([...vehicles, addedVehicle]);
        setShowAddModal(false); // Close the modal
    } catch (error) {
        console.error('Error adding vehicle:', error);
    }
};

// Handle updating a vehicle
const handleUpdateVehicle = async (updatedVehicle) => {
    try {
        const updated = await updateVehicle(updatedVehicle._id, updatedVehicle);
        setVehicles(
            vehicles.map((vehicle) =>
                vehicle._id === updated._id ? updated : vehicle
            )
        );
        setShowDeleteModal(false); // Close the modal
    } catch (error) {
        console.error('Error updating vehicle:', error);
    }
};

// Handle deleting a vehicle
const handleDeleteVehicle = async (id) => {
    try {
        await deleteVehicle(id);
        setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
        setShowDeleteModal(false); // Close the modal
    } catch (error) {
        console.error('Error deleting vehicle:', error);
    }
};
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white p-6 shadow rounded">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Vehicle Management Dashboard</h1>
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                        onClick={() => setShowAddModal(true)}
                    >
                        Add Vehicle
                    </button>
                </div>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Vehicle Name</th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Status</th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Last Updated</th>
                            <th className="border border-gray-200 px-4 py-2 text-center text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle._id} className="odd:bg-white even:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2">{vehicle.name}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded ${
                                            vehicle.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : vehicle.status === 'Inactive'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {vehicle.status}
                                    </span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {new Date(vehicle.lastUpdated).toLocaleString()}
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-center">
                                    <button
                                        className="px-3 py-1 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 mr-2"
                                        onClick={() => {
                                            setSelectedVehicle(vehicle);
                                            setShowUpdateModal(true);
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600"
                                        onClick={() => {
                                            setSelectedVehicle(vehicle);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <AddVehicleModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddVehicle}
            />
            <UpdateVehicleModal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                onUpdate={handleUpdateVehicle}
                vehicle={selectedVehicle}
            />
            <DeleteVehicleModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteVehicle}
                vehicle={selectedVehicle}
            />
        </div>
    );
};

export default VehicleTable;
