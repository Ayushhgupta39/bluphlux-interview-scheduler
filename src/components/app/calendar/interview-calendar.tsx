import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useInterviewStore } from "@/context/InterviewContext";

const localizer = momentLocalizer(moment);

const InterviewCalendar = () => {
  const { interviews } = useInterviewStore();

  const events = interviews.map((interview) => ({
    id: interview.id,
    title: `${interview.candidate} - ${interview.type}`,
    start: new Date(`${interview.date}T${interview.time}`),
    end: new Date(`${interview.date}T${interview.time}`), // assuming 1-hour duration
  }));

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Interview Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default InterviewCalendar;
