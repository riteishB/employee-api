class DATABASE {
    constructor() {
        this.DATABASE = mockData
    }

    writeToDatabase(data) {
        this.DATABASE.push(data);
    }

    getFromDatabase(id) {
        return this.DATABASE.filter(data => data._id === id);
    }

    getAllData() {
        return this.DATABASE
    }

}


module.exports = DATABASE

const mockData = [
    {
        _id: 1,
        firstName: 'abc',
        lastName: 'xyz',
        hireDate: new Date(),
        role: 'LACKEY'
    },
    {
        _id: 2,
        firstName: 'John',
        lastName: 'Lennon',
        hireDate: new Date(),
        role: 'CEO'
    }
]