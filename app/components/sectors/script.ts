const getSectors = async () => {
	return await useFetch("/api/sectors", { lazy: true });
};

const separators = [
  {
    styleTop: "crunch-50 sep-after",
    theme:"th-green-crop"
  },
  {
    styleBottom: "bang-50 sep-before",
    styleTop: "bang-20 sep-after",
        theme:"th-blue-motor"
  },
  {
    styleTop: "crunch-20 sep-after",
    styleBottom: "crunch-20 sep-before",
    theme:"th-gold-success"
  },
  {
    styleTop: "bang-100 sep-after",
    styleBottom: "bang-20 sep-before",
    theme:"th-purple-business"
  },
  {
    styleTop: "bang-100 sep-after",
    styleBottom: "crunch-100 sep-before",
    theme:"th-green-pistachios"
  },
  {
    styleBottom: "crunch-100 sep-before ",
    theme:"th-orange-rust"
  },
];

export { getSectors,separators};
