// utils/validations.ts

import { Interview } from "@/types/types";

export const validateConflict = (
  interviews: Interview[],
  date: string,
  time: string,
  candidate: string,
  interviewer: string
): boolean => {
  return interviews.some(interview => 
    interview.date === date && 
    interview.time === time && 
    (interview.candidate === candidate || interview.interviewer === interviewer)
  );
};