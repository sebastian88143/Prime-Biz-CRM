import React from 'react';

const MainPage = () => {
  const handleClick = (item) => {
    alert(`Clicked on: ${item}`);
  };

  return (
    <div className="dashboard">
      <div className="greeting">Good Afternoon, Peter!</div>

      <div className="grid">
        <div className="sales-performance">
          <h2>Sales Performance</h2>
          <div className="chart-placeholder">
            <p>[Chart Placeholder]</p>
          </div>
        </div>

        <div className="top-leads">
          <h2>Top Leads</h2>
          <ul>
            {[
              { name: "Microsoft Corporation", email: "sales@microsoft.com" },
              { name: "Coca-Cola Company", email: "sales@coca-cola.com" },
              { name: "Apple Inc.", email: "sales@apple.com" },
              { name: "Google LLC", email: "sales@google.com" },
              { name: "Amazon.com", email: "sales@amazon.com" },
            ].map((lead) => (
              <li key={lead.email} onClick={() => handleClick(lead.name)} className="clickable">
                <p className="lead-name">{lead.name}</p>
                <p className="lead-email">{lead.email}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="reminders">
          <h2>Reminders</h2>
          <ul>
            {[
              { title: "Call back John Doe", date: "Due Today" },
              { title: "Schedule demo for XYZ Inc", date: "Due in 1 week" },
              { title: "Call back John Doe", date: "Due Today" },
            ].map((reminder, index) => (
              <li key={index} onClick={() => handleClick(reminder.title)} className="clickable">
                <p className="reminder-title">{reminder.title}</p>
                <p className="reminder-date">{reminder.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPage;