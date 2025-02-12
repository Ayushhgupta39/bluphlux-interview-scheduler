import { create } from "zustand";

// Define Interview type
export interface Interview {
  id: string;
  candidate: string;
  interviewer: string;
  date: string;
  time: string;
  type: string;
}

// Load data from localStorage
const loadInterviews = (): Interview[] => {
  const data = localStorage.getItem("interviews");
  return data ? JSON.parse(data) : [];
};

// Zustand store
interface InterviewStore {
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  deleteInterview: (id: string) => void;
  updateInterview: (updatedInterview: Interview) => void;
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  interviews: loadInterviews(),

  addInterview: (interview) =>
    set((state) => {
      const updatedInterviews = [...state.interviews, interview];
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    }),

  deleteInterview: (id) =>
    set((state) => {
      const updatedInterviews = state.interviews.filter((i) => i.id !== id);
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
      return { interviews: updatedInterviews };
    }),

    updateInterview: (updatedInterview) =>
      set((state) => {
        const updatedInterviews = state.interviews.map((interview) => 
          interview.id === updatedInterview.id ? updatedInterview : interview
        );
        localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
        
        // Force a fresh state update
        return { interviews: [...updatedInterviews] };
      }),
}));
