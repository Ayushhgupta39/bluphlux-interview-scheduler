import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useInterviewStore } from "@/store/interviewStore";
import { Interview } from "@/types/types";
import { validateConflict } from "@/utils/validations";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { generateTimeSlots } from "@/utils/dateHelpers";

const ScheduleInterview = () => {
  const { interviews, addInterview } = useInterviewStore();
  const navigate = useNavigate();
  const timeSlots = generateTimeSlots();

  const [formData, setFormData] = useState<Interview>({
    id: uuidv4(),
    candidate: "",
    interviewer: "",
    date: "",
    time: "",
    type: "Technical",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData({ ...formData, date: format(date, "yyyy-MM-dd") });
    }
  };

  const handleTimeChange = (value: string) => {
    setFormData({ ...formData, time: value });
  };

  const handleTypeChange = (value: "HR" | "Technical" | "Behavioral") => {
    setFormData({ ...formData, type: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      validateConflict(
        interviews,
        formData.date,
        formData.time,
        formData.candidate,
        formData.interviewer
      )
    ) {
      setError(
        "Conflict detected! Candidate or Interviewer is already scheduled at this time."
      );
      return;
    }

    const newInterview: Interview = {
      ...formData,
    };

    addInterview(newInterview);
    toast({
      title: "Interview Scheduled",
      description: `${formData.type} Interview for ${formData.candidate} with ${
        formData.interviewer
      } on ${format(new Date(formData.date), "PPP")} at ${formData.time}`,
    });
    navigate("/");
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Schedule an Interview</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="candidate">Candidate Name</Label>
            <Input
              id="candidate"
              name="candidate"
              placeholder="Enter candidate name"
              value={formData.candidate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewer">Interviewer Name</Label>
            <Input
              id="interviewer"
              name="interviewer"
              placeholder="Enter interviewer name"
              value={formData.interviewer}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date
                    ? format(new Date(formData.date), "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date ? new Date(formData.date) : undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Time Slot</Label>
            <Select value={formData.time} onValueChange={handleTimeChange}>
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

          <div className="space-y-2">
            <Label>Interview Type</Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
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

          <Button type="submit" className="w-full">
            Schedule Interview
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScheduleInterview;
