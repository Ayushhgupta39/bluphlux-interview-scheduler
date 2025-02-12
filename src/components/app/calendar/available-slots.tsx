// components/app/calendar/available-slots.tsx
import { useInterviewStore } from "@/store/interviewStore";
import { generateTimeSlots, isTimeSlotAvailable } from "@/utils/dateHelpers";
import { useState } from "react";

const AvailableSlots = () => {
  const { interviews } = useInterviewStore();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const timeSlots = generateTimeSlots();
  

  return (
    <div className="mt-6 p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded p-2"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeSlots.map((timeSlot) => {
          const { available, details } = isTimeSlotAvailable(selectedDate, timeSlot, interviews);
          return (
            <div
              key={timeSlot}
              className={`p-3 rounded-lg ${
                available 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              <div className="text-center">
                <span className="font-medium">{timeSlot}</span>
                <br />
                <span className="text-sm">
                  {available ? 'Available' : 'Booked'}
                </span>
                {!available && details && (
                  <div className="mt-1 text-xs">
                    <div>Candidate: {details.candidate}</div>
                    <div>Interviewer: {details.interviewer}</div>
                    <div>Type: {details.type}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableSlots;