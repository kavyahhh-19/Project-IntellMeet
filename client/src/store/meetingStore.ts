import { create } from "zustand";

type MeetingStore = {
  meetingTitle: string;
  setMeetingTitle: (title: string) => void;
};

const useMeetingStore = create<MeetingStore>((set) => ({
  meetingTitle: "",
  setMeetingTitle: (title) => set({ meetingTitle: title }),
}));

export default useMeetingStore;