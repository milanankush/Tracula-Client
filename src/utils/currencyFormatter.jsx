const currencyFormatter = (symbol, amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: "currency",
        currency: symbol
    }).format(amount);
};

export default currencyFormatter;