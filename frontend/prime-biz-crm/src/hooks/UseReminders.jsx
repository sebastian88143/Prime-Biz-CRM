import axios from "axios";
import { useState, useEffect } from "react";

const useReminders = () => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchReminders = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/all_reminders/", {
                headers: getAuthHeaders(),
            });
            setReminders(response.data.reminders);
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching reminders");
        } finally {
            setLoading(false);
        }
    };

    const addReminder = async ({ title, description, reminder_date }) => {
        try {
            const formattedReminderDate = new Date(reminder_date).toISOString().slice(0, 19).replace('T', ' ');
    
            const response = await axios.post(
                "http://localhost:8000/api/add_reminder/", 
                { title, description, reminder_date: formattedReminderDate },
                { headers: getAuthHeaders() }
            );
    
            await fetchReminders();
        } catch (err) {
            if (err.response) {
                console.error("Error adding reminder", err.response.data);
            } else {
                console.error("Error adding reminder", err);
            }
        }
    };

    const updateReminder = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:8000/api/reminder/${id}/update/`, updatedData, {
                headers: getAuthHeaders(),
            });
            setReminders((prev) =>
                prev.map((reminder) => (reminder.id === id ? { ...reminder, ...updatedData } : reminder))
            );
        } catch (err) {
            console.error("Error updating reminder", err);
        }
    };

    const deleteReminder = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/reminder/${id}/delete/`, {
                headers: getAuthHeaders(),
            });
            setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
        } catch (err) {
            console.error("Error deleting reminder", err);
        }
    };

    useEffect(() => {
        fetchReminders();
    }, []);

    return { reminders, loading, error, addReminder, updateReminder, deleteReminder };
};

export default useReminders;