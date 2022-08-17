const formatCurrency = (num) => {
  let fiatFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return fiatFormatter.format(parseFloat(num.toFixed(8)));
};
const formatPercent = (num) => {
  num = parseFloat(num.toFixed(2));
  return (num > 0 ? "" : "") + num + "%";
};

const utils = {
  formatCurrency,
  formatPercent,
};

export default utils;
