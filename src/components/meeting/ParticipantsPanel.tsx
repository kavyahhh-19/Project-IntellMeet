function ParticipantsPanel() {
  const users = [
    "Dhruv",
    "Alex",
    "Sarah",
    "Michael",
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <h2 className="text-xl font-bold mb-4">
        Participants
      </h2>

      <div className="space-y-3">

        {users.map((user) => (
          <div
            key={user}
            className="flex items-center gap-3"
          >
            <div
              className="
              w-10
              h-10
              rounded-full
              bg-blue-500
              text-white
              flex
              items-center
              justify-center
              "
            >
              {user.charAt(0)}
            </div>

            <span>{user}</span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ParticipantsPanel;