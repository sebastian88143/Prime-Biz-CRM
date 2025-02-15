import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, setMonth, setYear, isSameDay } from "date-fns";

const RemindersPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEditingDate, setIsEditingDate] = useState(false);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  // Lista przypomnień
  const reminders = [
    { date: new Date(2025, 1, 2), text: "Giveaway", color: "text-yellow-600" },
    { date: new Date(2025, 1, 5), text: "Blog", color: "text-gray-600" },
    { date: new Date(2025, 1, 5), text: "Freebie", color: "text-green-600" },
    { date: new Date(2025, 1, 7), text: "Reel", color: "text-red-600" },
    { date: new Date(2025, 1, 9), text: "Giveaway", color: "text-yellow-600" },
    { date: new Date(2025, 1, 14), text: "Reel", color: "text-red-600" },
    { date: new Date(2025, 1, 16), text: "Giveaway", color: "text-yellow-600" },
    { date: new Date(2025, 1, 19), text: "Blog", color: "text-gray-600" },
    { date: new Date(2025, 1, 21), text: "Reel", color: "text-red-600" },
    { date: new Date(2025, 1, 26), text: "Quotes", color: "text-blue-600" },
    { date: new Date(2025, 1, 26), text: "Blog", color: "text-gray-600" },
    { date: new Date(2025, 1, 26), text: "Freebie", color: "text-green-600" },
  ];

  const months = Array.from({ length: 12 }, (_, i) => format(new Date(2022, i, 1), "MMMM"));
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleMonthChange = (event) => {
    setCurrentDate(setMonth(currentDate, parseInt(event.target.value)));
    setIsEditingDate(false);
  };

  const handleYearChange = (event) => {
    setCurrentDate(setYear(currentDate, parseInt(event.target.value)));
    setIsEditingDate(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24 px-4 pb-4">
      <div className="w-full max-w-8xl bg-white shadow-lg rounded-lg p-6">
        {/* Nagłówek Reminders */}
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Reminders</h1>

        {/* Nagłówek Kalendarza */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="px-4 py-2 bg-blue-200 rounded-lg">←</button>

          {/* Wybór miesiąca i roku */}
          <div className="relative">
            {isEditingDate ? (
              <div className="flex space-x-2">
                <select value={format(currentDate, "M") - 1} onChange={handleMonthChange} className="border p-1 rounded">
                  {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                  ))}
                </select>

                <select value={format(currentDate, "yyyy")} onChange={handleYearChange} className="border p-1 rounded">
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            ) : (
              <h2 className="text-xl font-bold cursor-pointer" onClick={() => setIsEditingDate(true)}>
                {format(currentDate, "MMMM yyyy")}
              </h2>
            )}
          </div>

          <button onClick={handleNextMonth} className="px-4 py-2 bg-blue-200 rounded-lg">→</button>
        </div>

        {/* Dni tygodnia */}
        <div className="grid grid-cols-7 text-center font-bold border-b pb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="uppercase text-gray-600">{day}</div>
          ))}
        </div>

        {/* Siatka dni */}
        <div className="grid grid-cols-7 gap-1 bg-green-50">
          {/* Puste pola przed pierwszym dniem miesiąca */}
          {Array(getDay(firstDayOfMonth) === 0 ? 6 : getDay(firstDayOfMonth) - 1).fill(null).map((_, index) => (
            <div key={index} className="border h-24"></div>
          ))}

          {/* Faktyczne dni miesiąca */}
          {daysInMonth.map((day) => {
            const dayReminders = reminders.filter((reminder) => isSameDay(reminder.date, day));

            return (
              <div key={day} className="border h-24 p-2 relative">
                <span className="text-sm">{format(day, "d")}</span>
                <div className="absolute bottom-2 left-2 text-xs space-y-1">
                  {dayReminders.map((reminder, index) => (
                    <div key={index} className={`${reminder.color} font-medium`}>{reminder.text}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;