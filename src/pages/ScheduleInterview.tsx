import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useInterviewStore } from "@/context/InterviewContext";
import { Interview } from "@/types/types";
import { validateConflict } from "@/utils/validations";

const ScheduleInterview = () => {
  const { interviews, addInterview } = useInterviewStore();
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Schedule an Interview</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="candidate"
          placeholder="Candidate Name"
          value={formData.candidate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="interviewer"
          placeholder="Interviewer Name"
          value={formData.interviewer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Behavioral">Behavioral</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Schedule Interview
        </button>
      </form>
    </div>
  );
};

export default ScheduleInterview;
