import React from 'react';

const MainPage = () => {
  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const handleClick = (item) => {
    alert(`Clicked on: ${item}`);
  };

  return (
    <div className="w-full h-full flex flex-col pt-24 bg-blue-50">
      <div className="flex justify-start px-6">
        <div className="text-xl font-semibold">{getGreeting()}, Peter!</div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Sales Performance Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
          <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>
          <div className="bg-white rounded-lg h-72 flex items-center justify-center">
            <p className="text-gray-400">[Chart Placeholder]</p>
          </div>
        </div>

        {/* Top Leads Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-lg font-semibold mb-4">Top Leads</h2>
          <ul>
            {[ 
              { name: 'Microsoft Corporation', email: 'sales@microsoft.com' },
              { name: 'Coca-Cola Company', email: 'sales@coca-cola.com' },
              { name: 'Apple Inc.', email: 'sales@apple.com' },
              { name: 'Google LLC', email: 'sales@google.com' },
              { name: 'Amazon.com', email: 'sales@amazon.com' },
            ].map((lead) => (
              <li
                key={lead.email}
                onClick={() => handleClick(lead.name)}
                className="cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-50 active:scale-95 p-4 rounded-lg shadow mb-2"
              >
                <p className="font-semibold text-base">{lead.name}</p>
                <p className="text-sm text-gray-400">{lead.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Reminders Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
          <h2 className="text-lg font-semibold mb-4">Reminders</h2>
          <ul>
            {[ 
              { title: 'Call back John Doe', date: 'Due Today' },
              { title: 'Schedule demo for XYZ Inc', date: 'Due in 1 week' },
              { title: 'Call back John Doe', date: 'Due Today' },
            ].map((reminder, index) => (
              <li
                key={index}
                onClick={() => handleClick(reminder.title)}
                className="cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-50 active:scale-95 p-4 rounded-lg shadow mb-2"
              >
                <p className="font-semibold text-base">{reminder.title}</p>
                <p className="text-sm text-gray-400">{reminder.date}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Empty Space to Create Gap */}
        <div className="flex-grow w-1/3"></div>
      </div>
    </div>
  );
};

export default MainPage;