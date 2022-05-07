const { User } = require(`../models`);

const userData = [
    {
        name: "Ricky Bobby",
        email: "ricky@email.com",
        password: "password",
        zip_code: 60642,
    },
    {
        name: "Xena",
        email: "xena@email.com",
        password: "password",
        zip_code: 60647,
    },
    {
        name: "Vincent Ferdinand",
        email: "vincent@email.com",
        password: "password",
        zip_code: 60614,
    },
    {
        name: "Jonathan Jocat",
        email: "john@email.com",
        password: "password",
        zip_code: 60622,
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;