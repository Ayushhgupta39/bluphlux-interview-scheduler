import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useInterviewStore } from "@/store/interviewStore";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { isTimeSlotAvailable } from "@/utils/dateHelpers";
import { toast } from "@/hooks/use-toast";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

const InterviewCalendar = () => {
  const { interviews, updateInterviewTime } = useInterviewStore();

  const events: CalendarEvent[] = interviews.map((interview) => ({
    id: interview.id,
    title: `${interview.candidate} - ${interview.type}`,
    start: new Date(`${interview.date}T${interview.time}`),
    end: moment(`${interview.date}T${interview.time}`).add(1, "hour").toDate(),
  }));

  const onEventDrop = (args: EventInteractionArgs<CalendarEvent>) => {
    const { event, start } = args;
    const newDate = moment(start).format("YYYY-MM-DD");
    const newTime = moment(start).format("HH:mm");

    // Validate if the new slot is available
    const isSlotAvailable = isTimeSlotAvailable(
      newDate,
      newTime,
      interviews.filter((interview) => interview.id !== event.id)
    );

    if (isSlotAvailable.available) {
      updateInterviewTime(event.id, newDate, newTime);
      toast({
        title: "Interview Updated Successfully.",
        description: `Please infrom the respective recipients about the updates.`,
      });
    } else {
      toast({
        title: "This slot is already reserved.",
        variant: "destructive",
        description: `Please select some other time, this slot is already booked.`,
      });
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Interview Calendar</h2>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor={(event: any) => event.start}
        endAccessor={(event: any) => event.end}
        style={{ height: 500 }}
        onEventDrop={onEventDrop}
        resizable={false}
        draggableAccessor={() => true}
      />
    </div>
  );
};

export default InterviewCalendar;
