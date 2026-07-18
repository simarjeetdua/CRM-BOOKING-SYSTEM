import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
{
    invoiceNumber:{
        type:String,
        required:true,
        unique:true
    },

    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        required:true
    },

    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true
    },

    amount:Number,

    payment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment"
    },

    status:{
        type:String,
        enum:["Paid","Pending"],
        default:"Paid"
    },

    issuedDate:{
        type:Date,
        default:Date.now
    }

},
{timestamps:true}
);

export default mongoose.model("Invoice",invoiceSchema);