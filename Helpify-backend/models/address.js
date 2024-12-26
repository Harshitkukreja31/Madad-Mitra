import mongoose from 'mongoose';


const addressSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
    },
    label: {
      type: String,
      enum: ['Home', 'Office', 'Other'],
      default: 'Other'
    },
    streetAddress: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  });
  
  const AddressModel = mongoose.model('address', addressSchema);

  AddressModel.addAddress = async(req , addressData , successCallback , errorCallback)=>{
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

        if (addressData.isDefault) {
            await AddressModel.updateMany(
              { user: user._id },
              { isDefault: false }
            );
        }
        
        const dbRes = AddressModel.create({...addressData , user:user._id});

        console.log("POST Address saved:" , dbRes);
        successCallback(dbRes);

     }
     catch(dbErr){
        console.error("POST | Address save error: ", dbErr);
        errorCallback(dbErr);
     }
  }

  AddressModel.getAddress = async(req , successCallback , errorCallback)=>{
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

        const dbRes = await AddressModel.find({user :user._id});
        console.log("GET | Addresses retrieved: ", dbRes);
        successCallback(dbRes);
      }
      catch(dbErr){
        console.error("GET | Address retrieval error: ", dbErr);
        errorCallback(dbErr);
      }
  }

  export default AddressModel;

