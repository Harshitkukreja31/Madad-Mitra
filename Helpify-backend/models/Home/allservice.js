import mongoose from 'mongoose';

const AllServiceSchema = new mongoose.Schema({
    rating: { 
      type: Number, 
      required: true,
      min: 0,
      max: 5,
      default: 0
    },
    icon: {
      type: {
        className: { type: String, default: '' },
        emoji: { type: String, default: '' }
      },
      default: () => ({})
    },
    category: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    href: { 
      type: String, 
      required: true 
    }
  });
  
  const AllServiceModel = mongoose.model('AllService', AllServiceSchema);

  async function seedDatabase() {
    try {
      // Ensure database connection
    
  
      // Services data (transformed to match schema)
      const services = [
        {
          rating: 4.8,
          icon: {
            className: 'sh-icon sh-icon--orange',
            emoji: '👩‍🍳'
          },
          category: "Expert Cook",
          description: "Professional cooks to prepare delicious meals according to your preferences",
          href: "/services/cooking-maid"
        },
        {
          rating: 4.9,
          icon: {
            className: 'sh-icon sh-icon--purple',
            emoji: '👶'
          },
          category: "Baby Sitter /JAPA",
          description: "Experienced and caring baby sitters for your little ones",
          href: "/services/baby-caretaker"
        },
        {
          rating: 4.7,
          icon: {
            className: 'sh-icon sh-icon--blue',
            emoji: '🧹'
          },
          category: "Domestic Help",
          description: "Reliable domestic help for all your household chores",
          href: "/services/house-maid"
        },
        {
          rating: 4.8,
          icon: {
            className: 'sh-icon sh-icon--green',
            emoji: '🧺'
          },
          category: "All-rounder",
          description: "all types of professional domestic and other required services at your convenience",
          href: "/services/all-rounders"
        },
        {
          rating: 4.9,
          icon: {
            className: 'sh-icon sh-icon--blue',
            emoji: '🏠'
          },
          category: "24Hrs Live-in",
          description: "Reliable live-in helpers providing round-the-clock assistance and care",
          href: "/services/24hrs-live-in"
        },
        {
          rating: 4.9,
          icon: {
            className: 'sh-icon sh-icon--blue',
            emoji: '🔄'
          },
          category: "24Hrs JAPA",
          description: "Reliable live-in JAPA helpers providing round-the-clock care to your little ones",
          href: "/services/24-hrs-japa"
        }
      ];
  
      if(AllServiceModel.countDocuments===0){
         // Insert new services
          const insertedServices = await AllServiceModel.insertMany(services);
          console.log(`Successfully seeded ${insertedServices.length} services`);
      }
  

    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  }
  seedDatabase();
  AllServiceModel.getAllservices = async (req, res) => {
    try {
      const services = await AllServiceModel.find();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export default AllServiceModel;
  