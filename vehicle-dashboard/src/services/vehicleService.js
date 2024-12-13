import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/vehicles'; // Update with your backend URL

// Fetch all vehicles
export const fetchVehicles = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        console.log("response ",response );
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};
// Add a vehicle
export const addVehicle = async (vehicle) => {
    try {
        const response = await axios.post(API_BASE_URL, vehicle);
        return response.data;
    } catch (error) {
        console.error('Error adding vehicle:', error);
        throw error;
    }
};

// Update a vehicle
export const updateVehicle = async (id, vehicle) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, vehicle);
        return response.data;
    } catch (error) {
        console.error('Error updating vehicle:', error);
        throw error;
    }
};

// Delete a vehicle
export const deleteVehicle = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        throw error;
    }
};