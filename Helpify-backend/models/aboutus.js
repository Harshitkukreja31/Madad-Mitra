import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  linkedin: { type: String, required: true },
  category: { type: String, required: true } // e.g., Founders, Advisors
});

 const teamMember = [
    {
      "name": "Deepanshu",
      "image": "/api/placeholder/120/120",
      "role": "Co-Founder & CEO",
      "description": "IIT Delhi Graduate, Ex-Google, 10+ years in tech",
      "linkedin": "https://linkedin.com",
      "category": "Founders"
    },
    {
      "name": "Harshit Kukreja",
      "image": "/api/placeholder/120/120",
      "role": "Co-Founder & COO",
      "description": "IIM Ahmedabad, Former McKinsey Consultant",
      "linkedin": "https://linkedin.com",
      "category": "Founders"
    },
    {
      "name": "Dr. Amit Kumar",
      "image": "/api/placeholder/120/120",
      "role": "Technical Advisor",
      "description": "PhD from MIT, 15+ years in service marketplace",
      "linkedin": "https://linkedin.com",
      "category": "Advisors"
    },
    {
      "name": "Maya Singh",
      "image": "/api/placeholder/120/120",
      "role": "Strategic Advisor",
      "description": "Former CEO of ServiceHub, Angel Investor",
      "linkedin": "https://linkedin.com",
      "category": "Advisors"
    },
    {
      "name": "Vikram Reddy",
      "image": "/api/placeholder/120/120",
      "role": "Head of Operations",
      "description": "Ex-Uber, Specialist in scaling operations",
      "linkedin": "https://linkedin.com",
      "category": "Operations"
    },
    {
      "name": "Anita Desai",
      "image": "/api/placeholder/120/120",
      "role": "Customer Success Lead",
      "description": "8+ years in customer experience management",
      "linkedin": "https://linkedin.com",
      "category": "Customer Success"
    },
    {
      "name": "Raj Malhotra",
      "image": "/api/placeholder/120/120",
      "role": "CTO",
      "description": "Full-stack developer, AWS certified architect",
      "linkedin": "https://linkedin.com",
      "category": "Technical Team"
    }
  ]
  
const TeamMemberModel = mongoose.model('TeamMember', TeamMemberSchema);


const insertifnotexist = async ()=>{
  try{
     const exitingcount =  await TeamMemberModel.countDocuments();

     if(exitingcount==0){
        await TeamMemberModel.insertMany(teamMember);
        console.log("Team Member data inserted successfully");
     }
  }
  catch(error){
    console.error("Error inserting Team Member Data",error);
  }
}
insertifnotexist();
export default TeamMemberModel;