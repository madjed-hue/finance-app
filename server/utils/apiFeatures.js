class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  searchByName() {
    const keyword = this.queryStr.keyword
      ? {
          country: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        } || {
          topic: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        } || {
          sector: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        } || {
          end_year: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        } || {
          region: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        } || {
          pestle: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        } || {
          likelihood: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //removing some field from category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => {
      delete queryCopy[key];
    });

    //Filter for  Rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr !== null;

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}
export default ApiFeatures;
