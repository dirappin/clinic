export const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const year = new Date(date).getFullYear()

    return `${day}, ${month} ${year}`
}

export const birthYearFormater = (birthYear) => {
    const currentDate = new Date();
    const birthDate = new Date(birthYear);

    const year = currentDate.getFullYear() - birthDate.getFullYear()
    if (year === 0 && currentDate.getMonth() - birthDate.getMonth() > 1) {
        return `${currentDate.getMonth() - birthDate.getMonth()}Months`;
    } else if (year === 0 && currentDate.getMonth() - birthDate.getMonth() < 1) {
        return `${currentDate.getDate() - birthDate.getDate()}days`
    }

    return `${year}yrs`
}