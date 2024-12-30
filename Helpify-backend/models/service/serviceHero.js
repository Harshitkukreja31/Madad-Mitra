import mongoose from "mongoose";


const dishCleaningVideo = "../../src/assets/ServicesVideos/dishCleaning.mp4"
const clotheWashingVideo = "../../src/assets/ServicesVideos/clotheWashing.webm"
const kitchenCleaningVideo = "../../src/assets/ServicesVideos/kitchenCleaning.webm"
const foodCookingVideo = "../../src/assets/ServicesVideos/foodCooking.webm"
const japaVideo = "../../src/assets/ServicesVideos/japa.webm"



const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  heading: { type: String, required: true },
  summary: { type: String, required: true },
  videoLink: { type: String, required: true }
});


const ServiceHeroModel = mongoose.model('Service', ServiceSchema);

async function seedDatabase() {
    try {
      // Services array
      const services = [
        {
          id: 'all-rounders',
          heading: 'All-rounders',
          summary: 'Experienced and professional full-day workers. Feel free to customize your booking!',
          videoLink: dishCleaningVideo
        },
        {
          id: 'cooking-maid',
          heading: 'Cooking Maid',
          summary: 'Experienced and skilled cooking professionals available for hire.',
          videoLink: foodCookingVideo
        },
        {
          id: 'baby-caretaker',
          heading: 'Baby Caretaker',
          summary: 'Trusted and qualified professionals to care for your little ones.',
          videoLink:japaVideo
        },
        {
          id: 'house-maid',
          heading: 'House Maid',
          summary: 'Efficient and reliable house cleaning services for your home.',
          videoLink: clotheWashingVideo
        },
        {
          id: '24-hrs-japa',
          heading: 'Japa-24-hrs',
          summary: 'Round-the-clock assistance for your Japa needs.',
          videoLink: japaVideo
        },
        {
          id: '24hrs-live-in',
          heading: '24 Hrs - Live In',
          summary: 'Live-in support for your daily needs and tasks.',
          videoLink: kitchenCleaningVideo
        }
      ];
  
     
  
      // Insert new documents
      if(ServiceHeroModel.countDocuments==0){
        await ServiceHeroModel.insertMany(services);
        console.log('Database seeded successfully');
      }
      
      
    } catch (error) {
      console.error('Error seeding database:', error);
      
    }
  }
  seedDatabase();

ServiceHeroModel.getServiceById = async (req, res) => {
    try {
      const service = await ServiceHeroModel.findOne({ id: req.params.serviceType });
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
export default ServiceHeroModel