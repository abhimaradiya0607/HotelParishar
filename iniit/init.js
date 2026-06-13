const mongoose=require('mongoose')

const initData=require('./data.js')
const Listing=require('../models/listing.js')

MONGODB_URL="mongodb://localhost:27017/hotels"

main()
.then((res)=>{
    console.log('Connected to DB');
})
.catch((err)=>{
    console.log('Connecttion Errorr',err);
})


async function main() {
    await mongoose.connect(MONGODB_URL)
}

const initDB= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"6a26af3fa4c25e8c678fe50c",
    }))

    await Listing.insertMany(initData.data)
    console.log('Data Was initilized');
};

initDB();