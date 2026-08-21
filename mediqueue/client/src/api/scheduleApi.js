const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


export const getDoctorAvailability = async (
  doctorId,
  date
) => {

  const response = await fetch(
    `${API_URL}/doctors/${doctorId}/availability?date=${date}`
  );


  if (!response.ok) {

    throw new Error(
      "Failed to fetch availability"
    );

  }


  const result =
    await response.json();


  return result;
};