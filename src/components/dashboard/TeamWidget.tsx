function TeamWidget() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4">
        Team Collaboration
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Active Members</span>
          <strong>12</strong>
        </div>

        <div className="flex justify-between">
          <span>Meetings This Week</span>
          <strong>18</strong>
        </div>

        <div className="flex justify-between">
          <span>Completed Tasks</span>
          <strong>34</strong>
        </div>

      </div>
    </div>
  );
}

export default TeamWidget;