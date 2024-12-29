import mongoose from "mongoose";


const ServiceCarouselSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  icon: { type: String, required: true } // Stores stringified icon configuration
});

const ServiceCarouselModel = mongoose.model('ServiceCarousel', ServiceCarouselSchema);

async function seedDatabase() {
  try {
    // Services array with stringified icons
    const slides = [
      {
        title: "Verification & Assessment",
        description: "Employing AI, we enhance our rigorous physical and telephonic verification processes to ensure the highest quality assessments of our workers.",
        color: "blue",
        icon: JSON.stringify({
          component: 'Shield',
          props: { className: "w-8 h-8 text-blue-600" }
        })
      },
      {
        title: "Transparent Pricing",
        description: "You get what you pay for. Additionally, you get replacement guarantee, Covid-19 test reports, verification documents and more!",
        color: "green",
        icon: JSON.stringify({
          component: 'DollarSign',
          props: { className: "w-8 h-8 text-green-600" }
        })
      },
      {
        title: "Customer Support",
        description: "Our executives will always be there to hear you out and solve your issues promptly with dedication and care.",
        color: "pink",
        icon: JSON.stringify({
          component: 'Headphones',
          props: { className: "w-8 h-8 text-pink-600" }
        })
      },
      {
        title: "24/7 Availability",
        description: "Access our services any time of day or night. We're always ready to assist you with your home service needs.",
        color: "purple",
        icon: JSON.stringify({
          component: 'Clock',
          props: { className: "w-8 h-8 text-purple-600" }
        })
      },
      {
        title: "Quality Service",
        description: "Our trained professionals deliver exceptional service quality, ensuring your complete satisfaction every time.",
        color: "emerald",
        icon: JSON.stringify({
          component: 'Star',
          props: { className: "w-8 h-8 text-emerald-600" }
        })
      },
      {
        title: "Verified Professionals",
        description: "All our service providers undergo thorough background checks and skill assessments for your peace of mind.",
        color: "indigo",
        icon: JSON.stringify({
          component: 'UserCheck',
          props: { className: "w-8 h-8 text-indigo-600" }
        })
      }
    ];
 
    
    if(ServiceCarouselModel.countDocuments===0){
      await ServiceCarouselModel.insertMany(slides);
      console.log('ServiceCarousel Database seeded successfully');
    }
   
    
     
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
seedDatabase();

ServiceCarouselModel.getAllCarouselCards = async (req, res) => {
    try {
      const services = await ServiceCarouselModel.find();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export default ServiceCarouselModel;