export const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const year = new Date(date).getFullYear()

    return `${day}, ${month} ${year}`
}

export const birthYearFormater = (birthDate) => {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);
  
    const years = currentDate.getFullYear() - birthDateObj.getFullYear();
    const months = currentDate.getMonth() - birthDateObj.getMonth();
    const days = currentDate.getDate() - birthDateObj.getDate();
  
    if (days < 0) {
      const lastMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      const remainingDays = lastMonthDays + days;
      return remainingDays === 1 ? `${remainingDays} day` : `${remainingDays} days`;
    }
  
    if (years === 0 && months === 0 && days === 1) {
      return '1 day';
    } else if (years === 0 && months > 0) {
      return `${months} month${months > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    }
  
    return 'Invalid date';
}