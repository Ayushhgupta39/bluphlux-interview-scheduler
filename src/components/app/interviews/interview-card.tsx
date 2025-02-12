import { useState } from "react";
import { Interview } from "@/types/types";
import EditInterviewModal from "./edit-interview";
import { useInterviewStore } from "@/store/interviewStore";

type InterviewCardProps = {
  interview: Interview;
};

const InterviewCard = ({ interview }: InterviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log(interview)
  const { deleteInterview } = useInterviewStore();

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-bold">{interview.candidate}</h3>
      <p>Interviewer: {interview.interviewer}</p>
      <p>Date: {new Date(interview.date).toLocaleDateString()}</p>
      <p>Time: {(interview.time)}</p>
      <p>Type: {interview.type}</p>
      <button
        onClick={() => setIsEditing(true)}
        className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
      >
        Edit
      </button>
      {isEditing && (
        <EditInterviewModal
          interview={interview}
          onClose={() => setIsEditing(false)}
        />
      )} <button
      onClick={() => deleteInterview(interview.id)}
      className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Delete
    </button>
    </div>
  );
};

export default InterviewCard;
