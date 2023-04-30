const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};


function generateRegexQuery2(queryParams,attribute) {
  let query = {};
  let sort = {};

  // If "fixed" query parameter is present, set the exact match for the specified attribute
  if (queryParams.fixed && queryParams.fixed === attribute) {
    query[attribute] = queryParams[attribute];
  } else {
    // If "name" query parameter is present, set the regex query for the specified attribute
    if (queryParams[attribute]) {
      query[attribute] = { $regex: "^" + queryParams[attribute], $options: "i" };
    } else {
      // If no query parameter is present for the specified attribute, set an empty query to return all documents
      query = {};
    }
  }

  // If "sortBy" query parameter is present, set the sorting order for the specified attribute
  if (queryParams.sortBy && queryParams.sortBy === attribute) {
    sort[attribute] = (queryParams.order && queryParams.order === "asc") ? 1 : -1;
  }

  return { query, sort };
}

function generateRegexQuery(query, possibleAttributes) {
  const findParams = {};
  const sortParams = {};

  // Generate regex queries for the possible attributes present in the query
  for (const attr of possibleAttributes) {
    if (query[attr]) {
      if (attr === 'name' || attr === 'productId') {
        findParams[attr] = new RegExp('^' + query[attr] , 'i');
      } else {
        findParams[attr] = new RegExp(query[attr], 'i');
      }
    }
  }

  // Handle fixed matching condition
  if (query.fixed) {
    findParams[query.fixed] = query[query.fixed];
  }

  // Handle sorting condition
  if (query.sortBy) {
    sortParams[query.sortBy] = query.order === 'asc' ? 1 : -1;
  }

  return { findParams, sortParams };
}


module.exports = { pick, generateRegexQuery };
