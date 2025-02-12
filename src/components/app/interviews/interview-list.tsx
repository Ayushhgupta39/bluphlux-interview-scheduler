import { useInterviewStore } from "@/store/interviewStore";
import InterviewCard from "./interview-card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const InterviewList = () => {
  const { interviews } = useInterviewStore();
  const [filter, setFilter] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.candidate.toLowerCase().includes(filter.toLowerCase()) ||
      interview.interviewer.toLowerCase().includes(filter.toLowerCase());

    const matchesDate =
      !date || interview.date.startsWith(format(date, "yyyy-MM-dd"));

    return matchesSearch && matchesDate;
  });

  return (
    <div>
      {/* Search Filter */}
      <Input
        type="text"
        placeholder="Search by Candidate or Interviewer"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-2"
      />

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full mb-4 justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Interview List */}
      <div className="flex gap-2 flex-wrap">
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))
        ) : (
          <div className="w-full">
            <p className="text-center text-lg">No interviews Scheduled. Enjoy your day!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewList;
