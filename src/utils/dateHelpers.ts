// utils/dateHelpers.ts

import { Interview } from "@/types/types";

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(
      `${hour.toString().padStart(2, '0')}:00`,
      `${hour.toString().padStart(2, '0')}:30`
    );
  }
  return slots;
};

export const isTimeSlotAvailable = (
  date: string,
  timeSlot: string,
  interviews: Interview[]
): { available: boolean; details?: Partial<Interview> } => {
  // Find any interview that matches the date and time
  const conflict = interviews.find(interview => {
    return interview.date === date && interview.time === timeSlot;
  });

  if (conflict) {
    return {
      available: false,
      details: {
        candidate: conflict.candidate,
        interviewer: conflict.interviewer,
        type: conflict.type
      }
    };
  }

  return { available: true };
};