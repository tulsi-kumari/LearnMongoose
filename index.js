const mongoose=require('mongoose')

main().catch(err => console.log("ERROR!!Connection NOT Established"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieApp');

  console.log("Connection Established");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

  //making schema
  const Schema=mongoose.Schema
   //blueprint of our movieSchema
   /*
      {
         title:"AOT"
         year: 1423
         score:10
         rating:9.5
      }
   */
   const MovieSchema=new Schema({
    title:String,
    year:Number,
    score:Number,
    rating:String
   })

   const Action=mongoose.model("Action",MovieSchema)
   const Aot=new Action({
    title:"Attack On Titan",
    year:2014,
    score:10,
    rating:"4.5"
   })


   //save to database
   await Aot.save()

   //inserting many movies to work with
   Action.insertMany([
      {
         title:"Clash Of Clans",
         year:2010,
         score:9,
         rating:"4.2"
      },
      {
         title:"Zameer",
         year:2019,
         score:6,
         rating:"3.7"
      },
      {
         title:"PS2",
         year:2021,
         score:9.5,
         rating:"4.5"
      },
      {
         title:"House Of Horror",
         year:2011,
         score:8.2,
         rating:"3.6"
      },

      {
         title:"Coherence",
         year:2020,
         score:10,
         rating:"4.8"
      }
   ])
   .then((data)=>{

       console.log("IT WORKED")
       console.log(data)
   })

   //finding through mongoose
   //exec handles error for us
   await MyModel.find({ year : {$gte : 2020} }).exec()
   .then()
   


//node -i -e "$(< index.js)"