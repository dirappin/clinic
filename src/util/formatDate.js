export const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const year = new Date(date).getFullYear()

    return `${day}, ${month} ${year}`
}