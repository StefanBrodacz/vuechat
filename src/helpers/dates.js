export function isToday (someDate)  {
    const today = new Date()
    return someDate.getDay() === today.getDay() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
}
