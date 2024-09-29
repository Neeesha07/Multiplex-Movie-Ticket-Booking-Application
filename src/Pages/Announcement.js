// // Announcement.js
// import React, { useEffect, useState } from 'react';
// import './Announcement.css'; // Create a separate CSS file for styling
// const mockAnnouncements = [
//     "Welcome to HelioFlix! Enjoy our latest movies.",
//     "Don't miss our special discount on tickets this weekend!",
//     "New movie releases every Friday. Stay tuned!",
//   ];
// const Announcement = () => {
//   const [announcement, setAnnouncement] = useState('');

//   const fetchAnnouncement = async () => {
//     try {
//       const response = await fetch('http://win10-2-186:8888/announcement/latest'); // Adjust the URL as needed
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data && data.message) {
//             setAnnouncement(mockAnnouncements);
//           //setAnnouncement(data.message);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching announcement:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncement(); // Initial fetch
//     const intervalId = setInterval(fetchAnnouncement, 10000); // Poll every 10 seconds

//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);

//   if (!announcement) return null; // Don't render if there's no announcement

//   return (
//     <div className="announcement-banner">
//       {announcement}
//     </div>
//   );
// };

// export default Announcement;
// Announcement.js
import React, { useEffect, useState } from 'react';
import './Announcement.css';

const Announcement = () => {
  const [announcement, setAnnouncement] = useState('');
  const [displayTime, setDisplayTime] = useState(15); // Time to display each announcement in seconds

  // Simulated announcements
  const mockAnnouncements = [
    "Welcome to HelioFlix! Enjoy our latest movies.",
    "Don't miss our special discount on tickets this weekend!",
    "New movie releases every Friday. Stay tuned!",
  ];

  const fetchAnnouncement = () => {
    // Simulate fetching an announcement
    const randomIndex = Math.floor(Math.random() * mockAnnouncements.length);
    setAnnouncement(mockAnnouncements[randomIndex]);
    setDisplayTime(15); // Reset display time
  };

  useEffect(() => {
    fetchAnnouncement(); // Initial fetch

    const intervalId = setInterval(() => {
      if (displayTime <= 0) {
        fetchAnnouncement(); // Fetch new announcement
      } else {
        setDisplayTime((prev) => prev - 1); // Decrease display time
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [displayTime]);

  if (!announcement) return null; // Don't render if there's no announcement

  return (
    <div className="announcement-banner">
      {announcement}
    </div>
  );
};

export default Announcement;
