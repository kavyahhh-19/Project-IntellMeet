function VideoRoom() {
  const participants = [
    "Dhruv",
    "Rahul",
    "Priya",
    "Aman",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">

      {participants.map((user, index) => (
        <div
          key={index}
          className="bg-slate-800 text-white h-64 rounded-xl flex items-center justify-center text-xl font-bold"
        >
          {user}
        </div>
      ))}

    </div>
  );
}

export default VideoRoom;