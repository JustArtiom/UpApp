export function formatDateTime(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedHours = String(hours).padStart(2, "0");

    return {
        date: `${day}/${month}/${year}`,
        time: `${formattedHours}:${minutes}`,
        period: period,
    };
}
