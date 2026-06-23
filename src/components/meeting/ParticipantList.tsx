function ParticipantList() {
  const users = [
    "Dhruv",
    "Rahul",
    "Priya",
    "Aman",
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4">

      <h2 className="font-bold text-lg mb-4">
        Participants
      </h2>

      {users.map((user, index) => (
        <div
          key={index}
          className="py-2 border-b"
        >
          {user}
        </div>
      ))}

    </div>
  );
}

export default ParticipantList;