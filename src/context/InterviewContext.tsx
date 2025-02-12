import { Interview } from "@/types/types";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type InterviewContextType = {
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  updateInterview: (id: string, updatedInterview: Interview) => void;
  deleteInterview: (id: string) => void;
};

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider = ({ children }: { children: ReactNode }) => {
  const [interviews, setInterviews] = useState<Interview[]>(() => {
    // Load from localStorage on first render
    const savedInterviews = localStorage.getItem("interviews");
    return savedInterviews ? JSON.parse(savedInterviews) : [];
  });

  // Save interviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("interviews", JSON.stringify(interviews));
  }, [interviews]);

  const addInterview = (interview: Interview) => {
    setInterviews((prev) => [...prev, interview]);
  };

  const updateInterview = (id: string, updatedInterview: Interview) => {
    setInterviews((prev) =>
      prev.map((int) => (int.id === id ? updatedInterview : int))
    );
  };

  const deleteInterview = (id: string) => {
    setInterviews((prev) => prev.filter((int) => int.id !== id));
  };

  return (
    <InterviewContext.Provider
      value={{ interviews, addInterview, updateInterview, deleteInterview }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterviewStore = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterviewStore must be used within an InterviewProvider");
  }
  return context;
};
