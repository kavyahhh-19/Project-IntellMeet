interface MeetingCardProps {
  title: string;
  date: string;
}

function MeetingCard({
  title,
  date,
}: MeetingCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">

      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <p className="text-gray-500 mt-2">
        {date}
      </p>

    </div>
  );
}

export default MeetingCard;