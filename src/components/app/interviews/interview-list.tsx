import { useInterviewStore } from "@/context/InterviewContext";
import InterviewCard from "./interview-card";
import { useState } from "react";

const InterviewList = () => {
  const { interviews } = useInterviewStore();
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(""); // New date filter

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.candidate.toLowerCase().includes(filter.toLowerCase()) ||
      interview.interviewer.toLowerCase().includes(filter.toLowerCase());

    const matchesDate =
      !dateFilter || interview.date.startsWith(dateFilter); // Check if interview date matches filter

    return matchesSearch && matchesDate;
  });

  return (
    <div>
      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search by Candidate or Interviewer"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      {/* Date Filter */}
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Interview List */}
      {filteredInterviews.length > 0 ? (
        filteredInterviews.map((interview) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))
      ) : (
        <p>No interviews found.</p>
      )}
    </div>
  );
};

export default InterviewList;
