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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

type InterviewCardProps = {
  interview: Interview;
};

const InterviewCard = ({ interview }: InterviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteInterview } = useInterviewStore();

  return (
    <Card className="w-full sm:w-[48%] lg:w-[32%] hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Users className="w-5 h-5 text-primary" />
          {interview.candidate}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm md:text-base">
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="w-4 h-4" />
          <span>Interviewer: {interview.interviewer}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Date: {new Date(interview.date).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Time: {interview.time}</span>
        </div>

        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium bg-primary/10 text-primary">
          {interview.type}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
          Edit
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive">
              Cancel
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently cancel the interview.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500"
                onClick={() => {
                  deleteInterview(interview.id);
                  toast({
                    title: "Interview Cancelled",
                    description: `The interview was successfully cancelled.`,
                  });
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>

      {isEditing && (
        <EditInterviewModal interview={interview} onClose={() => setIsEditing(false)} />
      )}
    </Card>
  );
};

export default InterviewCard;
