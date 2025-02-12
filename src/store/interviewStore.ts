import { Interview } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand store with persistence
interface InterviewStore {
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  deleteInterview: (id: string) => void;
  updateInterview: (updatedInterview: Interview) => void;
  updateInterviewTime: (id: string, newDate: string, newTime: string) => void;
}

export const useInterviewStore = create<InterviewStore>()(
  persist(
    (set) => ({
      interviews: [],

      addInterview: (interview) =>
        set((state) => ({
          interviews: [...state.interviews, interview],
        })),

      deleteInterview: (id) =>
        set((state) => ({
          interviews: state.interviews.filter((i) => i.id !== id),
        })),

      updateInterview: (updatedInterview) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === updatedInterview.id ? updatedInterview : interview
          ),
        })),

      updateInterviewTime: (id, newDate, newTime) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === id
              ? { ...interview, date: newDate, time: newTime }
              : interview
          ),
        })),
    }),
    {
      name: "interviews",
    }
  )
);
