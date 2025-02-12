import { useState } from "react";
import { Interview } from "@/types/types";
import EditInterviewModal from "./edit-interview";
import { useInterviewStore } from "@/store/interviewStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Users } from "lucide-react";

type InterviewCardProps = {
  interview: Interview;
};

const InterviewCard = ({ interview }: InterviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteInterview } = useInterviewStore();

  return (
    <Card className="w-[32%] hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {interview.candidate}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>Interviewer: {interview.interviewer}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Date: {new Date(interview.date).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Time: {interview.time}</span>
        </div>

        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {interview.type}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>

        <Button
          variant="destructive"
          onClick={() => deleteInterview(interview.id)}
        >
          Delete
        </Button>
      </CardFooter>

      {isEditing && (
        <EditInterviewModal
          interview={interview}
          onClose={() => setIsEditing(false)}
        />
      )}
    </Card>
  );
};

export default InterviewCard;
