import mongoose from "mongoose";


const AkshayImg = "../../src/assets/testimonialImages/Akshay.jpg"
const SwatiImg = "../../src/assets/testimonialImages/Swati.jpg"
const ShakuntlaImg = "../../src/assets/testimonialImages/Shakuntla.jpg"
const JanviImg = "../../src/assets/testimonialImages/Janvi.jpg"
const ShankarImg = "../../src/assets/testimonialImages/Shankar.jpg"




const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    rating: { 
        type: Number, 
        required: true,
        min: 1, // Minimum rating
        max: 5  // Maximum rating
    },
    text: { type: String, required: true },
    image: { type: String, required: true } 
  });
  const TestimonialModel = mongoose.model('Testimonial', TestimonialSchema);

  
async function seedDatabase() {
    try {
      // Services array with stringified icons
      const testimonials = [
        {
          name: "Shakuntla",
          title: "My life savers",
          rating: 4,
          text: "I have good experience with Broomees. I was searching for a reliable cook but with limited references and verification issues, I was stuck. Madad-Mitra helped me by providing verified and Experienced cook.",
          image: ShakuntlaImg
        },
        {
          name: "Swati",
          title: "Partner for life",
          rating: 4,
          text: "Living alone in a big city like Chandigarh, it's great to have the support and comfort that Madad-Mitra gives. I've been able to get help very easily from their customer service.",
          image: SwatiImg
        },
        {
          name: "Shankar",
          title: "Excellent Service",
          rating: 5,
          text: "The quality of service provided by Madad-Mitra is exceptional. They made the whole process seamless and their staff is very professional.",
          image: ShankarImg
        },
        {
          name: "Janvi",
          title: "Amazing Support",
          rating: 4,
          text: "The team at Madad-Mitra has been incredibly helpful. Their service quality and customer support are outstanding.",
          image: JanviImg
        },
        {
          name: "Akshay",
          title: "Reliable Partner",
          rating: 5,
          text: "Finding trustworthy help was a challenge until I found Madad-Mitra. Their verification process is thorough and reliable.",
          image: AkshayImg
        },
        
      ];
   
      if(TestimonialModel.countDocuments===0){
        // Insert new documents
        await TestimonialModel.insertMany(testimonials);
   
        console.log('Testimonial Database seeded successfully');
      }
       
   
      
       
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
  seedDatabase();

  TestimonialModel.getAllTestimonialCards = async (req, res) => {
    try {
      const cards = await TestimonialModel.find();
    
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export default TestimonialModel;