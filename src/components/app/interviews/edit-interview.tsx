import { useState } from "react";
import { Interview } from "@/types/types";
import { useInterviewStore } from "@/store/interviewStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, setHours, setMinutes } from "date-fns";
import { toast } from "@/hooks/use-toast";

type EditInterviewModalProps = {
  interview: Interview;
  onClose: () => void;
};

const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM

  for (let hour = startHour; hour <= endHour; hour++) {
    slots.push(format(setHours(setMinutes(new Date(), 0), hour), "HH:mm"));
    slots.push(format(setHours(setMinutes(new Date(), 30), hour), "HH:mm"));
  }

  return slots;
};

const EditInterviewModal = ({ interview, onClose }: EditInterviewModalProps) => {
  const { updateInterview } = useInterviewStore();
  const [updatedInterview, setUpdatedInterview] = useState({ ...interview });
  const timeSlots = generateTimeSlots();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedInterview({
      ...updatedInterview,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setUpdatedInterview({
        ...updatedInterview,
        date: format(date, "yyyy-MM-dd"),
      });
    }
  };

  const handleTypeChange = (value: "Technical" | "HR" | "Behavioral") => {
    setUpdatedInterview({
      ...updatedInterview,
      type: value,
    });
  };

  const handleTimeChange = (value: string) => {
    setUpdatedInterview({
      ...updatedInterview,
      time: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateInterview(updatedInterview);
    toast({
      title: "Interview Updated Successfully.",
      description: `Please inform the respective recipients about the updates.`,
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full max-w-md px-4 py-6 md:px-6">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">Edit Interview</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="candidate">Candidate Name</Label>
            <Input
              id="candidate"
              name="candidate"
              value={updatedInterview.candidate}
              onChange={handleChange}
              placeholder="Enter candidate name"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="interviewer">Interviewer Name</Label>
            <Input
              id="interviewer"
              name="interviewer"
              value={updatedInterview.interviewer}
              onChange={handleChange}
              placeholder="Enter interviewer name"
            />
          </div>

          <div className="grid gap-3">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {updatedInterview.date
                    ? format(new Date(updatedInterview.date), "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={updatedInterview.date ? new Date(updatedInterview.date) : undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-3">
            <Label>Time Slot</Label>
            <Select value={updatedInterview.time} onValueChange={handleTimeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label>Interview Type</Label>
            <Select value={updatedInterview.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Behavioral">Behavioral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInterviewModal;
