import { create } from "zustand";

interface MeetingState {
  meetingTitle: string;

  setMeetingTitle: (title: string) => void;
}

const useMeetingStore = create<MeetingState>((set) => ({
  meetingTitle: "Project Discussion",

  setMeetingTitle: (title) =>
    set({
      meetingTitle: title,
    }),
}));

export default useMeetingStore;