const uuid = require("uuid");
const mockData = [
  {
    _id: uuid.v1(),
    firstName: "abc",
    lastName: "xyz",
    hireDate: new Date().toISOString().split("T")[0],
    role: "LACKEY",
  },
  {
    _id: uuid.v1(),
    firstName: "John",
    lastName: "Lennon",
    hireDate: new Date().toISOString().split("T")[0],
    role: "CEO",
  },
];

class DATABASE {
  constructor() {
    this.DATABASE = mockData;
  }

  writeToDatabase(data) {
    this.DATABASE.push(data);
  }

  getFromDatabase(id) {
    return this.DATABASE.find((entry) => {
      return entry._id === id;
    });
  }

  getAllData() {
    return this.DATABASE;
  }

  getFromDatabaseWithKey(key, value) {
    return this.DATABASE.find((entry) => {
      return entry[key] === value;
    });
  }

  updateInDatabase(id, data) {
    // get the data from db pretaining to this id
    let dataIndex = this.DATABASE.findIndex((entry) => {
      return entry._id === id;
    });

    if (dataIndex > -1) {
      this.DATABASE[dataIndex] = {
        ...data,
        _id: this.DATABASE[dataIndex]._id,
        favoriteQuote: this.DATABASE[dataIndex].favoriteQuote,
        favoriteJoke: this.DATABASE[dataIndex].favoriteJoke,
      };
      return true;
    } else {
      return false;
    }
  }

  deleteFromDatabase(id) {
    const index = this.DATABASE.findIndex((entry) => {
      return entry._id === id;
    });

    if (index > -1) {
      this.DATABASE.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}

const DB = new DATABASE();

module.exports = DB;
