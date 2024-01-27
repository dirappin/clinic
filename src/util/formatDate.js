export const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const year = new Date(date).getFullYear()

    return `${day}, ${month} ${year}`
}

export const birthYearFormater = (birthYear) => {
    const currentDate = new Date();
    const birthDate = new Date(birthYear);
    return currentDate.getFullYear() - birthDate.getFullYear()
}