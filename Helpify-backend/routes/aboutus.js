import express from "express";
import TeamMemberModel from "../models/aboutus.js";
const router = express.Router();
router.get('/' , async(req,res)=>{
    try {
        const teamMembers = await TeamMemberModel.find();
        const groupedData = teamMembers.reduce((acc, member) => {
          const category = member.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({
            id: member._id,
            name: member.name,
            image: member.image,
            role: member.role,
            description: member.description,
            linkedin: member.linkedin,
          });
          return acc;
        }, {});
        res.status(200).json(groupedData);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch team members' });
      }
})
export default router;