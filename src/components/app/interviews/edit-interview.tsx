import { useState } from "react";
import { Interview } from "@/types/types";
import { useInterviewStore } from "@/store/interviewStore";

type EditInterviewModalProps = {
  interview: Interview;
  onClose: () => void;
};

const EditInterviewModal = ({
  interview,
  onClose,
}: EditInterviewModalProps) => {
  const { updateInterview } = useInterviewStore();
  const [updatedInterview, setUpdatedInterview] = useState({ ...interview });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdatedInterview({
      ...updatedInterview,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
  const formattedTime = updatedInterview.time.padStart(5, '0');
  
  const finalInterview = {
    ...updatedInterview,
    time: formattedTime
  };

  updateInterview(finalInterview);
  
  // Add a small delay before closing to ensure state is updated
  setTimeout(onClose, 100);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Interview</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="candidate" // Changed from candidateName
            value={updatedInterview.candidate}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Candidate Name"
          />
          <input
            type="text"
            name="interviewer" // Changed from interviewerName
            value={updatedInterview.interviewer}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Interviewer Name"
          />
          <input
            type="date"
            name="date" // Split datetime into date
            value={updatedInterview.date}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="time"
            name="time" // Split datetime into time
            value={updatedInterview.time}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            name="type" // Changed from interviewType
            value={updatedInterview.type}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Behavioral">Behavioral</option>
          </select>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInterviewModal;
