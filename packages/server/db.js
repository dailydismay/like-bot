const faker = require("faker");
require("dotenv").config();
const connectToDb = require("./src/database");
const likesModel = require("./src/api/likes/likes.model");
const credsModel = require("./src/api/creds/creds.model");

const bootstrap = async () => {
  await connectToDb();

  await likesModel.deleteMany();
  await credsModel.deleteMany();

  // const likesData = {
  //   page_url: faker.internet.url(),
  //   total: 30
  // };

  // const credsData = {
  //   email: faker.internet.email(),
  //   password: faker.internet.password()
  // };

  // const likes = await likesModel.create(likesData);

  // await likesModel.create({
  //   page_url: "asdsadasd"
  // });

  // const creds = await credsModel.create(credsData);

  // likes.creds.push(creds);

  // likes.count++;

  // await likes.save();

  // console.log(await credsModel.find());

  // console.log(
  //   await likesModel.findOne({
  //     page_url: likesData.page_url,
  //     creds: {
  //       $in: [creds]
  //     }
  //   })
  // );
};

bootstrap();
