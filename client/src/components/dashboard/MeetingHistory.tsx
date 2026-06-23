function MeetingHistory() {
  const meetings = [
    {
      title: "Project Review",
      date: "10 June 2026",
    },
    {
      title: "Sprint Planning",
      date: "08 June 2026",
    },
    {
      title: "Client Meeting",
      date: "05 June 2026",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-4">
        Meeting History
      </h2>

      {meetings.map((meeting, index) => (
        <div
          key={index}
          className="border-b py-3"
        >
          <h3 className="font-semibold">
            {meeting.title}
          </h3>

          <p className="text-gray-500 text-sm">
            {meeting.date}
          </p>
        </div>
      ))}

    </div>
  );
}

export default MeetingHistory;