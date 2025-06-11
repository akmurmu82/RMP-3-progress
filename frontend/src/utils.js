const getDaysUntilBirthday = (targetDay, targetMonth, currentDate = new Date()) => {
  const currentYear = currentDate.getFullYear();
  const today = new Date(currentYear, currentDate.getMonth(), currentDate.getDate());
  const targetDate = new Date(currentYear, targetMonth - 1, targetDay); // month is 0-indexed

  // If the date has already passed this year, move it to next year
  if (today > targetDate) {
    targetDate.setFullYear(currentYear + 1);
  }

  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const totalDaysInYear = (targetDate.getFullYear() % 4 === 0 &&
    (targetDate.getFullYear() % 100 !== 0 || targetDate.getFullYear() % 400 === 0))
    ? 366 : 365;

  const progress = ((totalDaysInYear - diffDays) / totalDaysInYear) * 100;

  return {
    diffDays,
    progress,
    date: targetDate,
    isToday: diffDays === 0
  };
};

export default getDaysUntilBirthday