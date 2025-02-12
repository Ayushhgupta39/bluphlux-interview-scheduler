import { useInterviewStore } from "@/store/interviewStore";
import { generateTimeSlots, isTimeSlotAvailable } from "@/utils/dateHelpers";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const AvailableSlots = () => {
  const { interviews } = useInterviewStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const timeSlots = generateTimeSlots();

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  return (
    <Card className="w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Available Time Slots</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="mr-2 text-sm md:text-base">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date || new Date())}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {timeSlots.map((timeSlot) => {
            const { available, details } = isTimeSlotAvailable(
              formattedDate,
              timeSlot,
              interviews
            );

            return (
              <HoverCard key={timeSlot}>
                <HoverCardTrigger asChild>
                  <div
                    className={cn(
                      "p-3 md:p-4 rounded-lg border transition-colors cursor-pointer",
                      "flex flex-col items-center justify-center space-y-1 md:space-y-2",
                      available
                        ? "bg-primary/5 hover:bg-primary/10 border-primary/20"
                        : "bg-destructive/5 hover:bg-destructive/10 border-destructive/20"
                    )}
                  >
                    <span className="text-sm md:text-base font-medium">{timeSlot}</span>
                    <Badge
                      variant={available ? "secondary" : "destructive"}
                      className="text-xs md:text-sm font-normal"
                    >
                      {available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                </HoverCardTrigger>

                {!available && details && (
                  <HoverCardContent className="w-64">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Interview Details</h4>
                      <div className="text-xs md:text-sm space-y-1">
                        <p>Candidate: {details.candidate}</p>
                        <p>Interviewer: {details.interviewer}</p>
                        <p>Type: {details.type}</p>
                      </div>
                    </div>
                  </HoverCardContent>
                )}
              </HoverCard>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableSlots;
