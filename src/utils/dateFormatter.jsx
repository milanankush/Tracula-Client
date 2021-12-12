const dateFormatter = (date) => {
  let d = new Date(date);
  let year = Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let month = Intl.DateTimeFormat("en", { month: "short" }).format(d);
  let day = Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  return `${day}-${month}-${year}`;
};

export default dateFormatter;