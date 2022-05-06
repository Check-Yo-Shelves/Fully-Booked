const sequelize = require('../config/connection');
const seedUser = require(`./userData`);
const seedLibrary = require(`./libraryData`);
const seedBooks = require(`./bookData`);
const seedLibraryBooks = require(`./libraryBookData`);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  
  await seedLibrary();
  
  await seedBooks();
  
  await seedLibraryBooks();


  process.exit(0);
};

seedDatabase();
