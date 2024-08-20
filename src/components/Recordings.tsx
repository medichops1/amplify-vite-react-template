import React, { useState, useEffect } from "react";

interface Recording {
  id: string;
  phoneNumber: string;
  date: string;
  duration: string;
}

const Recordings: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useEffect(() => {
    // TODO: Fetch actual recordings from your backend
    const fetchRecordings = async () => {
      // This is a placeholder. Replace with actual API call.
      const mockRecordings: Recording[] = [
        {
          id: "1",
          phoneNumber: "123-456-7890",
          date: "2023-08-01",
          duration: "5:30",
        },
        {
          id: "2",
          phoneNumber: "098-765-4321",
          date: "2023-08-02",
          duration: "3:45",
        },
      ];
      setRecordings(mockRecordings);
    };

    fetchRecordings();
  }, []);

  return (
    <div className="recordings">
      <h2>Call Recordings</h2>
      <table>
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recordings.map((recording) => (
            <tr key={recording.id}>
              <td>{recording.phoneNumber}</td>
              <td>{recording.date}</td>
              <td>{recording.duration}</td>
              <td>
                <button
                  onClick={() => console.log("Play recording", recording.id)}
                >
                  Play
                </button>
                <button
                  onClick={() =>
                    console.log("Download recording", recording.id)
                  }
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recordings;
