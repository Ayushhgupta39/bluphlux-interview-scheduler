import { Interview } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand store with persistence
interface InterviewStore {
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  deleteInterview: (id: string) => void;
  updateInterview: (updatedInterview: Interview) => void;
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
    }),
    {
      name: "interviews",
    }
  )
);
