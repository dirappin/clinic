export const formatDate = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString("default", { month: "long" });
  const year = new Date(date).getFullYear()

  return `${day}, ${month} ${year}`
}

export const birthYearFormater = (birthDate) => {
  // Validate birthDate
  if (!Date.parse(birthDate)) {
    return 'Invalid date';
  }

  const birthDateObj = new Date(birthDate);
  const today = new Date();

  // Calculate differences accurately considering leap years
  const daysInYear = 365 + (((today.getFullYear() - birthDateObj.getFullYear()) % 4 === 0 &&
    ((today.getFullYear() - birthDateObj.getFullYear()) % 100 !== 0 ||
      (today.getFullYear() - birthDateObj.getFullYear()) % 400 === 0)) ? 1 : 0);
  const years = Math.floor(Math.abs(today.getTime() - birthDateObj.getTime()) / (1000 * 60 * 60 * 24 * daysInYear));
  const months = Math.floor(Math.abs((today.getFullYear() - birthDateObj.getFullYear()) * 12 + today.getMonth() - birthDateObj.getMonth()) % 12);
  const days = Math.floor(Math.abs(today.getDate() - birthDateObj.getDate()) - (months > 0 ? 30 : 0));

  // Prioritize outputting years, then months, then days
  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    return `${days} day${days > 1 ? 's' : ''}`;
  }
}


export const checkAppointmentStatus = (appointmentDate) => {
  const serializeAppointmentDate = new Date(appointmentDate);
  const currentDate = new Date();

  if (currentDate < serializeAppointmentDate) return 'pending'
  else return 'passed';
}