import mongoose from 'mongoose';

const BookingDataSchema = new mongoose.Schema({
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
     },
     address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        required: true
     },
     service:{
        type:String,
        required:true
     },
     requirement:{
        type:Object,
        required:true
     },
     Date:{
      type:Date,
      required:true
     },
     ShiftTime1:{
      type: Array,
      required:true
     },
     ShiftTime2:{
      type: Array,      
     },
     razorpay_payment_id: {
      type: String,
      required: false 
    },
     razorpay_order_id: {
      type: String,
      required: false 
   }
});

const BookingDataModel = mongoose.model('bookingdata',BookingDataSchema);

BookingDataModel.addData = async(req , data , successCallback , errorCallback)=>{
   try{
      const emailFromAuthToken = req?.emailFromAuthToken;      
         if(!emailFromAuthToken){
            return errorCallback({
               status:401,
               message: "Authentication token is required"
            });
         }
   
         const user = await mongoose.model('user').findOne({email: emailFromAuthToken});
         if (!user) {
            return errorCallback({ 
            status: 404, 
            message: "User not found" 
            });
         }
         console.log("Data received",data);
         const dbRes = await BookingDataModel.create({...data , user:user._id});
         
         console.log("POST Address saved:" , dbRes);
         successCallback(dbRes);

   }
   catch(dbErr){
      console.error("POST | Address save error: ", dbErr);
      errorCallback(dbErr);
   }
}

BookingDataModel.getData = async(req , successCallback , errorCallback)=>{
      try{
        const emailFromAuthToken = req?.emailFromAuthToken;

        if(!emailFromAuthToken){
            return errorCallback({
              status: 401, 
              message: "Authentication token is required" 
            })
        }

        const user = await mongoose.model('user').findOne({email: emailFromAuthToken});

        if (!user) {
          return errorCallback({ 
            status: 404, 
            message: "User not found" 
          });
        }

        const dbRes = await BookingDataModel.find({user :user._id}).populate('address').exec();
        
        console.log("GET | Addresses retrieved: ", dbRes);
        successCallback(dbRes);
      }
      catch(dbErr){
        console.error("GET | Address retrieval error: ", dbErr);
        errorCallback(dbErr);
      }
}

export default BookingDataModel;
