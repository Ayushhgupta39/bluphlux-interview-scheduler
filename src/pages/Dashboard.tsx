import AvailableSlots from "@/components/app/calendar/available-slots";
import InterviewCalendar from "@/components/app/calendar/interview-calendar";
import InterviewList from "@/components/app/interviews/interview-list";
import { useState } from "react";

const Dashboard = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Interview Dashboard</h1>
      <AvailableSlots />
      <div className="mb-4">
        <button
          onClick={() => setView("list")}
          className={`p-2 mr-2 ${
            view === "list" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setView("calendar")}
          className={`p-2 ${
            view === "calendar" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Calendar View
        </button>
      </div>

      {view === "list" ? <InterviewList /> : <InterviewCalendar />}
    </div>
  );
};

export default Dashboard;
