import AvailableSlots from "@/components/app/calendar/available-slots";
import InterviewCalendar from "@/components/app/calendar/interview-calendar";
import InterviewList from "@/components/app/interviews/interview-list";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarDays, List } from "lucide-react";

type ViewType = "list" | "calendar";

const Dashboard = () => {
  const [view, setView] = useState<ViewType>("list");

  return (
    <div className="p-6 space-y-6 flex gap-3">
      <div className="w-2/3">
        <Tabs
          value={view}
          onValueChange={(value: string) => setView(value as ViewType)}
        >
          <TabsList className="grid w-48 grid-cols-2">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <InterviewList />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <InterviewCalendar />
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <AvailableSlots />
      </div>
    </div>
  );
};

export default Dashboard;
