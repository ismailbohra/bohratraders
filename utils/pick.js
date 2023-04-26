const pick = (object) => {
  let obj = {};
  if (object.hasOwnProperty("price")) {
    obj.price = { $lt: object.price };
  }
  if (object.hasOwnProperty("Rating")) {
    obj.Rating = { $gt: object.Rating };
  }

  if (object.hasOwnProperty("Featured")) {
    console.log("inside if");
    obj.Featured = object.Featured;
  }
  console.log(obj);

  return obj;
};

module.exports = pick;
