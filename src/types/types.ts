export enum InterviewType {
  TECHNICAL = "Technical",
  HR = "HR",
  BEHAVIORAL = "Behavioral",
}

export type Interview = {
  id: string;
  candidate: string;
  interviewer: string;
  date: string;
  time: string;
  type: "Technical" | "HR" | "Behavioral";
};

export interface SchedulerState {
  interviews: Interview[];
  availableSlots: string[];
}
