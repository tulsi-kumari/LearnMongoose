const mongoose=require('mongoose')

main().catch(err => console.log("ERROR!!Connection NOT Established"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieApp');

  console.log("Connection Established");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled



}
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        uppercase:true,
        minlength:3,
        trim:true,

    },
    price:{
        type:Number,
        required:true,
        max:30000,
        min:10000
    },
    onSale:{
        type:Boolean
    },
    categories:{
        type:[String]
    },
    qty:{
        online:{
            type:Number,
            default:0
        },
        inStore:{
            type:Number,
            default:0
        }
    },
    size:{
        type:String,
        enum:['s','l','m']
    }


    
})
//types of validations
    //required:true
    //in schema to ensure it is not left blank
    //const Mobile=mongoose.model("Mobile",productSchema)

    // const infinix=new Mobile({
    //     name:"infinix",
    //     price:15000,
    //     onSale:false,
    //     qty:{
    //         online:10,
    //         inStore:15
    //     },
    //     size:'s'

    // })

    // infinix.save()
    // .then(data=>console.log(data))
    // .catch(err=>console.log(err))

    //diffrent type of validations


    //1.for all types:default:0 or required:true

     const mi=new Mobile({
        name:"mi",
        price:15000,
        onSale:false,
        qty:{
            online:5
        },
        size:'l'

    })

    mi.save()
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

    //2.for string type only
    //lowercase,uppercase-always calls toUpper/LowerCase on values
//     trim: boolean, whether to always call .trim() on the value
// match: RegExp, creates a validator that checks if the value matches the given regular expression
// enum: Array, creates a validator that checks if the value is in the given array.
// minLength: Number, creates a validator that checks if the value length is not less than the given number
// maxLength: Number, creates a validator that checks if the value length is not greater than the given number



     const nokia=new Mobile({
        name:"nokia",
        price:15000,
        onSale:false,
        qty:{
            online:5
        },
        size:'l'

    })

    nokia.save()
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

    //2.for number type only

    //min: Number, creates a validator that checks if the value is greater than or equal to the given minimum.
     //max: Number, creates a validator that checks if the value is less than or equal to the given maximum.
     //enum: Array, creates a validator that checks if the value is strictly equal to one of the values in the given array.


     const poco=new Mobile({
        name:"poco",
        price:19000,
        onSale:false,
        qty:{
            online:5
        },
        size:'l'

    })

    poco.save()
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

    //instance methods

    //Instances of Models are documents. 
    //Documents have many of their own built-in instance methods. like new Product.save()
    //wheras Product.find() is on the whole collection or Model/Class
    // We may also define our own custom document instance methods.


    //always use a traditional functon here not arrow
    productSchema.methods.getPrice=function(){
        return this.price;
    }
    productSchema.methods.addCategory=function(cat){
       this.categories.push(cat);
       this.save()
       .then(data=> console.log(data))
       .catch(err=>console.log(err))
    }


    productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 17000 })
    }


    const Mobile=mongoose.model("Mobile",productSchema)

    //find a product and apply methods
    const findMobile=async()=>{
        const foundProduct=await Mobile.findOne({price:{$gte:10000}})
        console.log(foundProduct)
        await foundProduct.addCategory("Mobile")
        console.log(foundProduct)

    }
    Mobile.fireSale().then(data=>console.log(data))
    findMobile();


//see virtuals too
//Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. The getters are useful for formatting 
// or combining fields, while setters are useful for de-composing a single value into multiple values for storage.
personSchema.virtual('fullName').get(function() {
  return this.name.first + ' ' + this.name.last;
});


