const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_url = 'mongodb://127.0.0.1:27017/wonderlust';

main()
.then((res) => {
    console.log("connect to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_url);
}


const initDB = async () =>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) =>({
    ...obj, owner: "68c8f0a0d5d27339bf5c71cb"}));
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
}

initDB();