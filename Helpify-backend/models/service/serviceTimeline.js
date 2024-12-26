import mongoose from "mongoose";

const ServiceTimelineSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    header: { type: String, required: true },
    icon: { type: String, required: true } ,
    color: { type: String, required: true },
    description: { type: String, required: true } ,
    column: { type: String, enum: ['left', 'right'], required: true }
  });

  const ServiceTimelineModel = mongoose.model('ServiceTimeline', ServiceTimelineSchema);

  async function seedServiceTimeline() {
    try {
     
  
      // Left Column Steps
      const leftColumnSteps = [
        {
          number: '01',
          header: 'Book Service',
          icon: JSON.stringify({
            component: 'Calendar',
            props: { className: "icon" }
          }),
          color: '#FF6B6B',
          description: 'Choose your desired service, fill in your requirements and make a booking on our platform.',
          column: 'left'
        },
        {
          number: '02',
          header: 'Confirm Details',
          icon: JSON.stringify({
            component: 'FileText',
            props: { className: "icon" }
          }),
          color: '#FFB84C',
          description: 'Confirm your requirements with the relationship manager assigned to you.',
          column: 'left'
        },
        {
          number: '03',
          header: 'Worker Selection',
          icon: JSON.stringify({
            component: 'UserCheck',
            props: { className: "icon" }
          }),
          color: '#82CD47',
          description: 'Sit tight while our relationship manager finds the right fit for your home.',
          column: 'left'
        }
      ];
  
      // Right Column Steps
      const rightColumnSteps = [
        {
          number: '04',
          header: 'Interview',
          icon: JSON.stringify({
            component: 'PhoneCall',
            props: { className: "icon" }
          }),
          color: '#4BC0C0',
          description: 'Have a brief interview with selected candidates to ensure they meet your expectations.',
          column: 'right'
        },
        {
          number: '05',
          header: 'Home Visit',
          icon: JSON.stringify({
            component: 'Home',
            props: { className: "icon" }
          }),
          color: '#36A2EB',
          description: 'Schedule a home visit to familiarize the worker with your home and requirements.',
          column: 'right'
        },
        {
          number: '06',
          header: 'Confirmation',
          icon: JSON.stringify({
            component: 'CheckCircle',
            props: { className: "icon" }
          }),
          color: '#9BA4B5',
          description: 'Finalize the agreement and welcome your new household help.',
          column: 'right'
        }
      ];
  
      // Insert steps
      if(ServiceTimelineModel.countDocuments===0){
        await ServiceTimelineModel.insertMany([...leftColumnSteps, ...rightColumnSteps]);
        console.log('Service Timeline seeded successfully');
      }
      
    } catch (error) {
      console.error('Error seeding Service Timeline:', error);
    }
  }
  seedServiceTimeline();
  ServiceTimelineModel.getTimeline=async (req, res) => {
    try {
      const leftColumnSteps = await ServiceTimelineModel.find({ column: 'left' });
      const rightColumnSteps = await ServiceTimelineModel.find({ column: 'right' });
      
      res.json({
        leftColumnSteps,
        rightColumnSteps
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export default ServiceTimelineModel;