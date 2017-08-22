const monthMaps = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December"
}

const getFormattedDate = (date) => {
  date = date.split('-');
  return {
    year: date[0],
    month: monthMaps[date[1]],
    day: Number(date[2])
  }
}

const getFormattedTime = (time) => {
  const hr = Math.floor(time/60);
  const min = time%60;
  return `${hr}h ${min}min`;
}

const getGenreStr = (genres) => genres.map((genre) => genre.name).join(', ');

export {
  getFormattedDate as getFormattedDate,
  getFormattedTime as getFormattedTime,
  getGenreStr as getGenreStr
}
