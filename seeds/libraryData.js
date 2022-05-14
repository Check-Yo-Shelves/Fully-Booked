const { Library } = require(`../models`);

const libraryData = [
    {
        name: "Xena's Library",
        zip_code: "60647",
        address: "100 Lake Shore Drive",
        lat: 41.921543,
        lon: -87.702484,
        user_id: 2,
    },
    {
        name: "Children's Library",
        zip_code: "60614",
        address: "Lincoln Park Zoo",
        lat: 41.923250,
        lon: -87.649910,
        user_id: 2,
    },
    {
        name: "Jocat's Library",
        zip_code: "60622",
        address: "1234 Milwaukee Ave",
        lat: 41.900589,
        lon: -87.679611,
        user_id: 4,
    },
    {
        name: "Andrew's Library",
        zip_code: "60622",
        address: "5678 N Western Ave",
        lat: 41.900589,
        lon: -87.679611,
        user_id: 1,
    },
];

const seedLibrary = () => Library.bulkCreate(libraryData);

module.exports = seedLibrary;