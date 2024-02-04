const responseIterator = (object: Object | void): [] => {
  if (typeof object !== "object") {
    throw new Error("Internal Server Error");
  }

  const entries = Object.entries(object as Object);
  console.log("ENTRIES", entries);
  return entries[0][1];
};

export default responseIterator;
