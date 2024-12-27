import mongoose from 'mongoose';

const UserSubscriptionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    planName:{
        type:String,
        required:true
    },
    subscriptionStartDate:{
        type: Date,
        default: Date.now
    },
    subscriptionEndDate: {
        type: Date,
        required: true
    },
    status:{
        type:String,
        enum :['Active','Expired']
    }
});
const UserSubscriptionModel = mongoose.model('usersubscription',UserSubscriptionSchema);

UserSubscriptionModel.getdetails = async (req, successCallback, errorCallback) => {
    try {
        const emailfromAuthToken = req?.emailFromAuthToken;

        if (!emailfromAuthToken) {
            return errorCallback({
                status: 401,
                message: "Authentication token is required"
            });
        }

        const user = await mongoose.model('user').findOne({ email: emailfromAuthToken });

        if (!user) {
            return errorCallback({
                status: 404,
                message: "User not found"
            });
        }

        const dbRes = await UserSubscriptionModel.findOne({ user: user._id });

        if (!dbRes) {
            console.log("User not found");
            return successCallback({ subscription: null });
        }

        const now = new Date();
        const isExpired = now > dbRes?.subscriptionEndDate;

        if (dbRes.status === 'Expired' || isExpired) {
            console.log("User session Expired");
            return successCallback({ subscription: null });
        }

        console.log("Data is", dbRes);
        return successCallback({ subscription: dbRes });

    } catch (dbErr) {
        console.error(dbErr);
        return errorCallback(dbErr);
    }
};

    

    function findenddate (planName){
          const now = new Date();
          switch(planName){
             case 'Silver Membership':
                return new Date(now.setMonth(now.getMonth()+3));
             case 'Gold Membership':
                return new Date(now.setMonth(now.getMonth()+6));
            case 'Diamond Membership':
                return new Date(now.setMonth(now.getMonth()+12));
            case 'Platinum Membership':
                return new Date(now.setMonth(now.getMonth()+24)); 
            default:
                throw new Error('Invalid plan name');               
          }
    }
    UserSubscriptionModel.adddetails = async(req , subscriptiondata , successCallback , errorCallback)=>{
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

        if(!subscriptiondata.planName){
            return errorCallback({
                status:400,
                message:"Plan name is required"
            })
        }

        const subscriptionEndDate = findenddate(subscriptiondata.planName);

        const dbRes = await UserSubscriptionModel.create({
            user:user._id,
            planName:subscriptiondata.planName,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: subscriptionEndDate,
            status: 'Active'
        });

        console.log("Post address saved",dbRes);
        successCallback(dbRes);
    }
    catch(dbErr){
        errorCallback(dbErr);
    }
};
export default UserSubscriptionModel;




