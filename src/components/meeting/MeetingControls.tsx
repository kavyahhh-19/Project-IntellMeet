import {
  FaMicrophone,
  FaVideo,
  FaDesktop,
  FaPhoneSlash,
} from "react-icons/fa";

function MeetingControls() {
  return (
    <div className="flex justify-center mt-8">
      <div
        className="
        bg-white/80
        backdrop-blur-lg
        rounded-3xl
        shadow-xl
        px-8
        py-5
        flex
        gap-5
        "
      >
        <button
          className="
          w-14
          h-14
          rounded-full
          bg-blue-500
          text-white
          flex
          items-center
          justify-center
          hover:scale-110
          transition
          "
        >
          <FaMicrophone size={18} />
        </button>

        <button
          className="
          w-14
          h-14
          rounded-full
          bg-green-500
          text-white
          flex
          items-center
          justify-center
          hover:scale-110
          transition
          "
        >
          <FaVideo size={18} />
        </button>

        <button
          className="
          w-14
          h-14
          rounded-full
          bg-purple-500
          text-white
          flex
          items-center
          justify-center
          hover:scale-110
          transition
          "
        >
          <FaDesktop size={18} />
        </button>

        <button
          className="
          w-14
          h-14
          rounded-full
          bg-red-500
          text-white
          flex
          items-center
          justify-center
          hover:scale-110
          transition
          "
        >
          <FaPhoneSlash size={18} />
        </button>
      </div>
    </div>
  );
}

export default MeetingControls;