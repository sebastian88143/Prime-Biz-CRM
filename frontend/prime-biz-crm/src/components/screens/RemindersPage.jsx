import useReminders from "../../hooks/UseReminders";
import CustomCalendar from "../../components/Calendar";

import { format } from "date-fns";
import { useState } from "react";

const RemindersPage = () => {
  const { reminders, addReminder, updateReminder, deleteReminder } = useReminders();
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: "", description: "", reminder_date: "" });

  const events = reminders.map((reminder) => ({
    id: reminder.id,
    title: reminder.title,
    start: new Date(reminder.reminder_date),
    end: new Date(reminder.reminder_date),
  }));

  const handleEventClick = (event) => {
    const fullReminder = reminders.find((r) => r.id === event.id);
    setSelectedReminder(fullReminder);

    const formattedDate = new Date(fullReminder.reminder_date).toISOString().slice(0, 16);
    setSelectedReminder({
      ...fullReminder,
      reminder_date: formattedDate,
    });
    setShowModal(true);
  };

  const handleAddReminder = async () => {
    if (!newReminder.title || !newReminder.description || !newReminder.reminder_date) return;
    await addReminder(newReminder);
    setNewReminder({ title: "", description: "", reminder_date: "" });
  };

  const handleUpdateReminder = async () => {
    if (!selectedReminder.title || !selectedReminder.description || !selectedReminder.reminder_date) return;
    await updateReminder(selectedReminder.id, selectedReminder);
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 pt-24">Reminders</h1>
      <CustomCalendar events={events} onSelectEvent={handleEventClick} />

      <div className="mt-4">
        <input
          type="text"
          placeholder="Title"
          value={newReminder.title}
          onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
          className="border p-2"
        />
        <textarea
          placeholder="Description"
          value={newReminder.description}
          onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
          className="border p-2 w-full mt-2"
          rows="4"
        />
        <input
          type="datetime-local"
          value={newReminder.reminder_date}
          onChange={(e) => setNewReminder({ ...newReminder, reminder_date: e.target.value })}
          className="border p-2"
        />
        <button onClick={handleAddReminder} className="bg-green-500 text-white px-4 py-2 ml-2">
          Add Reminder
        </button>
      </div>

      {showModal && selectedReminder && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-xs z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full z-60">
            <h2 className="text-lg font-bold">{selectedReminder.title}</h2>
            <p className="text-sm">{format(new Date(selectedReminder.reminder_date), "PPPP")}</p>

            <input
              type="text"
              value={selectedReminder.title}
              onChange={(e) => setSelectedReminder({ ...selectedReminder, title: e.target.value })}
              className="border p-2 w-full mt-2"
            />
            <textarea
              value={selectedReminder.description}
              onChange={(e) => setSelectedReminder({ ...selectedReminder, description: e.target.value })}
              className="border p-2 w-full mt-2"
              rows="4"
            />
            <input
              type="datetime-local"
              value={selectedReminder.reminder_date}
              onChange={(e) => setSelectedReminder({ ...selectedReminder, reminder_date: e.target.value })}
              className="border p-2 w-full mt-2"
            />
            <button
              onClick={handleUpdateReminder}
              className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
              Save Changes
            </button>

            <button
              onClick={async () => {
                await deleteReminder(selectedReminder.id);
                setShowModal(false);
              }}
              className="bg-red-500 text-white px-4 py-2 mt-2 ml-2"
            >
              Delete
            </button>

            <button onClick={() => setShowModal(false)} className="ml-2 bg-gray-500 text-white px-4 py-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemindersPage;