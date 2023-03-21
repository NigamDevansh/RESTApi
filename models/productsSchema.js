const mongoose= require("mongoose");

const productSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: [true, "price must be provided"],
    },
    feature:{
        type: Boolean,
        default: true,
    },
    rating:{
        type: Number,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    company:{
        type: String,
    }
});

module.exports= mongoose.model('Product', productSchema);