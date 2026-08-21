const timeToMinutes = (time) => {
  const [hours, minutes] = time
    .split(":")
    .map(Number);

  return hours * 60 + minutes;
};


const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);

  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(
    remainingMinutes
  ).padStart(2, "0")}`;
};


const formatTime = (time) => {
  const [hours, minutes] = time
    .split(":")
    .map(Number);

  const period = hours >= 12
    ? "PM"
    : "AM";

  const displayHour =
    hours % 12 || 12;

  return `${String(displayHour).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")} ${period}`;
};


export const generateSlots = (
  sessions,
  slotDuration
) => {

  const slots = [];

  for (const session of sessions) {

    let current =
      timeToMinutes(session.startTime);

    const end =
      timeToMinutes(session.endTime);


    while (
      current + slotDuration <= end
    ) {

      const start =
        minutesToTime(current);

      const slotEnd =
        minutesToTime(
          current + slotDuration
        );


      slots.push({
        startTime: start,

        endTime: slotEnd,

        time: formatTime(start),

        status: "available",
      });


      current += slotDuration;
    }
  }


  return slots;
};