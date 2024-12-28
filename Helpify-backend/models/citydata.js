import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const cityModel = mongoose.model('city',citySchema);

const insertCitiesIfNotExists = async () => {
  try {
    // Check if cities already exist
    const existingCitiesCount = await cityModel.countDocuments();
    
    if (existingCitiesCount === 0) {
      const city = [ 
        { 
          "name": "Chandigarh", 
          "image": "../../../src/assets/images/Location/chandigarh.png" 
        }, 
        { 
          "name": "Mohali", 
          "image": "../../../src/assets/images/Location/chandigarh.png" 
        }, 
        { 
          "name": "Panchkula", 
          "image": "../../../src/assets/images/Location/chandigarh.png" 
        } 
      ];

      // Insert cities only if no cities exist
      await cityModel.insertMany(city);
      console.log('Cities inserted successfully');
    } 
  } catch (error) {
    console.error('Error inserting cities:', error);
  }
};

// Call the function when your app starts
insertCitiesIfNotExists();


export default cityModel;