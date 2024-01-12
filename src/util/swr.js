import axios from "axios";

export const swrFetcher = async (url) => {
    const response = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
    });

    if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch data");
    }

    return response.data;
};