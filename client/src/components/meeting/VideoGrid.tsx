function VideoGrid() {
  const participants = [
    "Dhruv",
    "Alex",
    "Sarah",
    "Michael",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">

      {participants.map((user) => (
        <div
          key={user}
          className="
          bg-slate-800
          rounded-3xl
          h-64
          flex
          items-center
          justify-center
          relative
          overflow-hidden
          "
        >
          <div
            className="
            w-20
            h-20
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            text-white
            text-2xl
            font-bold
            "
          >
            {user.charAt(0)}
          </div>

          <span
            className="
            absolute
            bottom-4
            left-4
            text-white
            font-medium
            "
          >
            {user}
          </span>
        </div>
      ))}

    </div>
  );
}

export default VideoGrid;