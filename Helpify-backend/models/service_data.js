import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    types: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      rating: { type: Number, required: true },
      duration: { type: Number, default: 4 },
      image: { type: String, default: '' },
      questions: { type: mongoose.Schema.Types.Mixed }
    }]
});

const serviceData = {
    allRounder: {
      id: 'all-rounders',
      name: 'All Rounder',
      types: [
        {
          id: '4h',
          name: '4 Hours per day',
          price: 10000,
          rating: 4.9,
          duration:4,
          image:"../../../src/assets/images/Service_data/4hr.jpeg",
          questions: {
            cleaning: [
              { name: 'Brooming/Mopping', price: 0 },
              { name: 'Brooming/Mopping/Dusting', price: 0 },
              { name: 'Not required', price: 0 }
            ],
            dishwashing: [
              { name: 'Required', price:0 },
              { name: 'Not required', price: 0 }
            ],
            cooking: [
              { name: 'Breakfast', price: 0 },
              { name: 'Lunch', price: 0},
              { name: 'Dinner', price: 0 },
              { name: 'All meals', price: 1500 },
              { name: 'Not required', price: 0 }
            ],
            Laundry: [
              { name: 'Laundry using washing Machine', price: 0 },
              { name: 'Not required', price: 0 }
            ],
            House_Size: [
              { name: '1BHK', price: 0 },
              { name: '2BHK', price: 0 },
              { name: '3BKH(less than 2000sqft)', price: 0 },
              { name: '3BKH(more than 2000sqft)', price: 0 },
              { name: '4BKH(less than 3000sqft)', price: 550 },
              { name: '4BKH(more than 3000sqft)', price: 650 },
              { name: '5BHK', price: 750 },
              { name: '6BHK', price: 850 }
            ],
            Floors: [
              { name: '1floor', price: 0 },
              { name: '2 floors', price: 0 },
              { name: '3 floors', price: 500 },
              { name: '4 floors', price: 750 },
              { name: '5 floors', price: 900 }
            ],
            People: [
              { name: '1 person', price: 0 },
              { name: '2 people', price: 0 },
              { name: '3 people', price: 0 },
              { name: '4 people', price: 0 },
              { name: '5-6 people', price: 400 },
              { name: '7-8 people', price: 550 }
            ],
            Bathroom_Cleaning: [
              { name: '1-2 bathrooms', price: 0 },
              { name: '3-4 bathrooms', price: 0 },
              { name: '5-6 bathrooms', price: 400 },
              { name: 'Not required', price: 0 }
            ]
          }
        },
        {
          id: '6h',
          name: '6 Hours per day',
          price: 14000,
          rating: 4.8,
          duration:6,
          image:"../../../src/assets/images/Service_data/4hr.jpeg",
          questions: {
            cleaning: [
              { name: 'Brooming/Mopping', price: 0 },
              { name: 'Brooming/Mopping/Dusting', price: 0 },
              { name: 'Not required', price: 0 }
            ],
            dishwashing: [
              { name: 'Required', price:0 },
              { name: 'Not required', price: 0 }
            ],
            cooking: [
              { name: 'Breakfast', price: 0 },
              { name: 'Lunch', price: 0},
              { name: 'Dinner', price: 0 },
              { name: 'All meals', price: 1500 },
              { name: 'Not required', price: 0 }
            ],
            Laundry: [
              { name: 'Laundry using washing Machine', price: 0 },
              { name: 'Not required', price: 0 }
            ],
            House_Size: [
              { name: '1BHK', price: 0 },
              { name: '2BHK', price: 0 },
              { name: '3BKH(less than 2000sqft)', price: 0 },
              { name: '3BKH(more than 2000sqft)', price: 0 },
              { name: '4BKH(less than 3000sqft)', price: 550 },
              { name: '4BKH(more than 3000sqft)', price: 650 },
              { name: '5BHK', price: 750 },
              { name: '6BHK', price: 850 }
            ],
            Floors: [
              { name: '1floor', price: 0 },
              { name: '2 floors', price: 0 },
              { name: '3 floors', price: 500 },
              { name: '4 floors', price: 750 },
              { name: '5 floors', price: 900 }
            ],
            People: [
              { name: '1 person', price: 0 },
              { name: '2 people', price: 0 },
              { name: '3 people', price: 0 },
              { name: '4 people', price: 0 },
              { name: '5-6 people', price: 400 },
              { name: '7-8 people', price: 550 }
            ],
            Bathroom_Cleaning: [
              { name: '1-2 bathrooms', price: 0 },
              { name: '3-4 bathrooms', price: 0 },
              { name: '5-6 bathrooms', price: 400 },
              { name: 'Not required', price: 0 }
            ]
          }
        },
        {
          id: '8h',
          name: '8 Hours per day',
          price: 16000,
          rating: 4.9,
          duration:8,
          image:"../../../src/assets/images/Service_data/8hr.jpeg",
          questions: {
            cleaning: [
              { name: 'Brooming/Mopping', price: 0 },
              { name: 'Brooming/Mopping/Dusting', price: 0 },
              { name: 'Not required', price: 0 }
            ],
            dishwashing: [
              { name: 'Required', price:0 },
              { name: 'Not required', price: 0 }
            ],
            cooking: [
              { name: 'Breakfast', price: 0 },
              { name: 'Lunch', price: 0},
              { name: 'Dinner', price: 0 },
              { name: 'All meals', price: 1500 },
              { name: 'Not required', price: 0 }
            ],
            Laundry: [
              { name: 'Laundry using washing Machine', price: 0 },
              { name: 'Not required', price: 0 }
            ],
            House_Size: [
              { name: '1BHK', price: 0 },
              { name: '2BHK', price: 0 },
              { name: '3BKH(less than 2000sqft)', price: 0 },
              { name: '3BKH(more than 2000sqft)', price: 0 },
              { name: '4BKH(less than 3000sqft)', price: 550 },
              { name: '4BKH(more than 3000sqft)', price: 650 },
              { name: '5BHK', price: 750 },
              { name: '6BHK', price: 850 }
            ],
            Floors: [
              { name: '1floor', price: 0 },
              { name: '2 floors', price: 0 },
              { name: '3 floors', price: 500 },
              { name: '4 floors', price: 750 },
              { name: '5 floors', price: 900 }
            ],
            People: [
              { name: '1 person', price: 0 },
              { name: '2 people', price: 0 },
              { name: '3 people', price: 0 },
              { name: '4 people', price: 0 },
              { name: '5-6 people', price: 400 },
              { name: '7-8 people', price: 550 }
            ],
            Bathroom_Cleaning: [
              { name: '1-2 bathrooms', price: 0 },
              { name: '3-4 bathrooms', price: 0 },
              { name: '5-6 bathrooms', price: 400 },
              { name: 'Not required', price: 0 }
            ]
          }
        },
        {
            id: '10h',
            name: '10 Hours per day',
            price: 16000,
            rating: 4.9,
            duration:10,
            image:"../../../src/assets/images/Service_data/8hr.jpeg",
            questions: {
              cleaning: [
                { name: 'Brooming/Mopping', price: 0 },
                { name: 'Brooming/Mopping/Dusting', price: 0 },
                { name: 'Not required', price: 0 }
              ],
              dishwashing: [
                { name: 'Required', price:0 },
                { name: 'Not required', price: 0 }
              ],
              cooking: [
                { name: 'Breakfast', price: 0 },
                { name: 'Lunch', price: 0},
                { name: 'Dinner', price: 0 },
                { name: 'All meals', price: 1500 },
                { name: 'Not required', price: 0 }
              ],
              Laundry: [
                { name: 'Laundry using washing Machine', price: 0 },
                { name: 'Not required', price: 0 }
              ],
              House_Size: [
                { name: '1BHK', price: 0 },
                { name: '2BHK', price: 0 },
                { name: '3BKH(less than 2000sqft)', price: 0 },
                { name: '3BKH(more than 2000sqft)', price: 0 },
                { name: '4BKH(less than 3000sqft)', price: 550 },
                { name: '4BKH(more than 3000sqft)', price: 650 },
                { name: '5BHK', price: 750 },
                { name: '6BHK', price: 850 }
              ],
              Floors: [
                { name: '1floor', price: 0 },
                { name: '2 floors', price: 0 },
                { name: '3 floors', price: 500 },
                { name: '4 floors', price: 750 },
                { name: '5 floors', price: 900 }
              ],
              People: [
                { name: '1 person', price: 0 },
                { name: '2 people', price: 0 },
                { name: '3 people', price: 0 },
                { name: '4 people', price: 0 },
                { name: '5-6 people', price: 400 },
                { name: '7-8 people', price: 550 }
              ],
              Bathroom_Cleaning: [
                { name: '1-2 bathrooms', price: 0 },
                { name: '3-4 bathrooms', price: 0 },
                { name: '5-6 bathrooms', price: 400 },
                { name: 'Not required', price: 0 }
              ]
            }
          }
      ]
    },
      babyCareService: {
        id: 'baby-caretaker',
        name: 'Baby Caretaker',
        types: [
          {
            id: '0-2months',
            name: '0-2 Months Japa',
            price: 25000,
            rating: 4.9,
            duration: 8,
            image: "../../../src/assets/images/Service_data/0-2month.jpeg",
            questions: {
              massage_service: [
                { name: 'For baby', price: 0 },
                { name: 'For mother', price: 1500 },
                { name: 'Both', price: 2000 },
                { name: 'Not required', price: 0 }
              ],
              cooking_service: [
                { name: 'Special food for mother', price: 2000 },
                { name: 'Regular family food', price: 1500 },
                { name: 'Not required', price: 0 }
              ],
              additional_services: [
                { name: 'Baby laundry', price: 500 },
                { name: 'Sterilizing bottles/equipment', price: 300 },
                { name: 'Baby room cleaning', price: 500 }
              ],
              experience_level: [
                { name: '1-3 years', price: 0 },
                { name: '3-5 years', price: 500 },
                { name: '5+ years', price: 700 }
              ]
            }
          },
          {
            id: '2-12months',
            name: '2-12 Months Japa',
            price: 20000,
            rating: 4.8,
            duration: 8,
            image: "../../../src/assets/images/Service_data/2-12month.jpeg",
            questions: {
              feeding_support: [
                { name: 'Bottle feeding', price: 0 },
                { name: 'Solid food introduction', price: 500 },
                { name: 'Both', price: 800 }
              ],
              additional_services: [
                { name: 'Baby laundry', price: 500 },
                { name: 'Sterilizing bottles/equipment', price: 300 },
                { name: 'Baby room cleaning', price: 500 }
              ],
              experience_level: [
                { name: '1-3 years', price: 0 },
                { name: '3-5 years', price: 500 },
                { name: '5+ years', price: 800 }
              ]
            }
          },
          {
            id: '1-2years',
            name: '1-2 Years Japa',
            price: 18000,
            rating: 4.7,
            duration: 8,
            image: "../../../src/assets/images/Service_data/1-2year.jpeg",
            questions: {
              meal_preparation: [
                { name: 'Required', price: 1000 },
                { name: 'Not required', price: 0 }
              ],
              activities: [
                { name: 'Basic learning activities', price: 0 },
                { name: 'Educational activities', price: 800 },
                { name: 'Not required', price: 0 }
              ],
              experience_level: [
                { name: '1-3 years', price: 0 },
                { name: '3-5 years', price: 500 },
                { name: '5+ years', price: 800 }
              ]
            }
          },
          {
            id: '2-4years',
            name: '2-4 Years Japa',
            price: 16000,
            rating: 4.6,
            duration: 8,
            image: "../../../src/assets/images/Service_data/2-4year.jpeg",
            questions: {
              educational_support: [
                { name: 'Basic education support', price: 0 },
                { name: 'Homework assistance', price: 500 },
                { name: 'Both', price: 800 }
              ],
              outdoor_activities: [
                { name: 'Required', price: 500 },
                { name: 'Not required', price: 0 }
              ],
              experience_level: [
                { name: '1-3 years', price: 0 },
                { name: '3-5 years', price: 500 },
                { name: '5+ years', price: 800 }
              ]
            }
          },
          {
            id: 'above4years',
            name: 'Above 4 Years Japa',
            price: 15000,
            rating: 4.5,
            duration: 8,
            image: "../../../src/assets/images/Service_data/more4.jpeg",
            questions: {
              school_support: [
                { name: 'School pickup/drop', price: 1000 },
                { name: 'Homework assistance', price: 500 },
                { name: 'Both', price: 1300 }
              ],
              extra_activities: [
                { name: 'Sports activities', price: 500 },
                { name: 'Art & Craft', price: 500 },
                { name: 'Both', price: 800 },
                { name: 'Not required', price: 0 }
              ],
              experience_level: [
                { name: '1-3 years', price: 0 },
                { name: '3-5 years', price: 500 },
                { name: '5+ years', price: 800 }
              ]
            }
          }
        ]
      },
      cleaningMaid: {
        id: 'cleaning-maid',
        name: 'Cleaning Maid',
        types: [
          {
            id: 'broomingMopping',
            name: 'Brooming/Mopping',
            price: 2500,
            rating: 4.5,
            duration: 2,
            image: "../../../src/assets/images/Service_data/brooming.jpeg",
            questions: {
              house_size: [
                { name: '1BHK', price: 0 },
                { name: '2BHK', price: 500 },
                { name: '3BHK', price: 1000 },
                { name: '4BHK', price: 1500 }
              ],
              floor_type: [
                { name: 'Regular flooring', price: 0 },
                { name: 'Marble/Wooden flooring', price: 500 }
              ],
              floors_count: [
                { name: 'Single floor', price: 0 },
                { name: 'Two floors', price: 800 },
                { name: 'Three floors', price: 1500 }
              ]
            }
          },
          {
            id: 'dusting',
            name: 'Dusting',
            price: 2000,
            rating: 4.4,
            duration: 1,
            image: "../../../src/assets/images/Service_data/dusting.jpeg",
            questions: {
              house_size: [
                { name: '1BHK', price: 0 },
                { name: '2BHK', price: 400 },
                { name: '3BHK', price: 800 },
                { name: '4BHK', price: 1200 }
              ],
              furniture_type: [
                { name: 'Basic furniture', price: 0 },
                { name: 'Extensive furniture', price: 500 }
              ]
            }
          },
          {
            id: 'dishwashing',
            name: 'Dish Washer',
            price: 1500,
            rating: 4.6,
            duration: 1,
            image: "../../../src/assets/images/Service_data/dish_washing.jpeg",
            questions: {
              family_size: [
                { name: '1-2 members', price: 0 },
                { name: '3-4 members', price: 500 },
                { name: '5-6 members', price: 1000 },
                { name: '7+ members', price: 1500 }
              ],
              utensil_type: [
                { name: 'Regular utensils', price: 0 },
                { name: 'Heavy cookware included', price: 500 }
              ]
            }
          }
        ]
      },
      cook: {
        id: 'cooking-maid',
        name: 'Cook',
        types: [
          {
            id: 'regularCook',
            name: 'Regular Cook',
            price: 8000,
            rating: 4.7,
            duration: 3,
            image: "../../../src/assets/images/Service_data/cook.png",
            questions: {
              meal_type: [
                { name: 'Vegetarian', price: 0 },
                { name: 'Non-vegetarian', price: 800 },
                { name: 'Both', price: 1000 }
              ],
              meals_per_day: [
                { name: 'One meal', price: 0 },
                { name: 'Two meals', price: 3000 },
                { name: 'Three meals', price: 5000 }
              ],
              cuisine_type: [
                { name: 'North Indian', price: 0 },
                { name: 'South Indian', price: 0 },
                { name: 'Both', price: 1000 }
              ],
              family_size: [
                { name: '1-2 members', price: 0 },
                { name: '3-4 members', price: 0 },
                { name: '5-6 members', price: 1000 },
                { name: '7+ members', price: 2000 }
              ],
              special_requirements: [
                { name: 'Diet food', price: 1000 },
                { name: 'Jain food', price: 1000 },
                { name: 'Regular food', price: 0 }
              ],
              experience_level: [
                { name: '1-3 years', price: 0 },
                { name: '3-5 years', price: 1000 },
                { name: '5+ years', price: 2000 }
              ]
            }
          }
        ]
      },
      Japa24hr : {
        id: '24-hrs-japa',
        name: '24-hrs-japa',
        types: [
          {
            id: '24-hrs-japa',
            name: '24-hrs-japa',
            price: 20000,
            rating: 4.7,
            duration: 12,
            image: "../../../src/assets/images/Service_data/2-12month.jpeg",
            questions: {
              "Age of Baby": [
                { name: '0-2 month', price: 0 },
                { name: '2-12 month', price: 2000 },
                { name: '2-4 year', price: 4000 },
                { name: '2-4 year', price: 5000 },
              ],
              "Number of children": [
                { name: 'Single', price: 0 },
                { name: 'Twin', price: 50000 },
              ],
              meal_preparation:[
              { name: 'Required', price: 1000 },
              { name: 'Not required', price: 0 },
              ],
              additional_services: [
                { name: 'Baby laundry', price: 500 },
                { name: 'Sterilizing bottles/equipment', price: 300 },
                { name: 'Baby room cleaning', price: 500 }
              ],
              experience_level: [
                { name: '1-3 years', price: 0 },
                { name: '3-5 years', price: 1000 },
                { name: '5+ years', price: 2000 }
              ]
            }
          }
        ]
      },
      Live24hr : {
        id: '24-hrs-live-in',
        name: '24-hrs-live-in',
        types: [
          {
            id: 'regularCook',
            name: 'Regular Cook',
            price: 8000,
            rating: 4.7,
            duration: 12,
            image: "../../../src/assets/images/Service_data/cook.png",
            questions: {
              meal_type: [
                { name: 'Vegetarian', price: 0 },
                { name: 'Non-vegetarian', price: 800 },
                { name: 'Both', price: 1000 }
              ],
              meals_per_day: [
                { name: 'One meal', price: 0 },
                { name: 'Two meals', price: 3000 },
                { name: 'Three meals', price: 5000 }
              ],
              cuisine_type: [
                { name: 'North Indian', price: 0 },
                { name: 'South Indian', price: 0 },
                { name: 'Both', price: 1000 }
              ],
              family_size: [
                { name: '1-2 members', price: 0 },
                { name: '3-4 members', price: 0 },
                { name: '5-6 members', price: 1000 },
                { name: '7+ members', price: 2000 }
              ],
              special_requirements: [
                { name: 'Diet food', price: 1000 },
                { name: 'Jain food', price: 1000 },
                { name: 'Regular food', price: 0 }
              ],
              experience_level: [
                { name: '1-3 years', price: 0 },
                { name: '3-5 years', price: 1000 },
                { name: '5+ years', price: 2000 }
              ]
            }
          },
          {
            id: 'HouseKeeper',
            name: 'HouseKeeper',
            price: 20000,
            rating: 4.5,
            duration: 12,
            image: "../../../src/assets/images/Service_data/brooming.jpeg",
            questions: {
              house_size: [
                { name: '1BHK', price: 0 },
                { name: '2BHK', price: 500 },
                { name: '3BHK', price: 1000 },
                { name: '4BHK', price: 1500 }
              ],
              floor_type: [
                { name: 'Regular flooring', price: 0 },
                { name: 'Marble/Wooden flooring', price: 500 }
              ],
              floors_count: [
                { name: 'Single floor', price: 0 },
                { name: 'Two floors', price: 800 },
                { name: 'Three floors', price: 1500 }
              ],
              People: [
                { name: '1 person', price: 0 },
                { name: '2 people', price: 0 },
                { name: '3 people', price: 0 },
                { name: '4 people', price: 0 },
                { name: '5-6 people', price: 400 },
                { name: '7-8 people', price: 550 }
              ],
            }
          },
          {
            id: 'All Rounder',
            name: 'All Rounder',
            price: 24000,
            rating: 4.9,
            duration:12,
            image:"../../../src/assets/images/Service_data/8hr.jpeg",
            questions: {
              cleaning: [
                { name: 'Brooming/Mopping', price: 0 },
                { name: 'Brooming/Mopping/Dusting', price: 0 },
                { name: 'Not required', price: 0 }
              ],
              dishwashing: [
                { name: 'Required', price:0 },
                { name: 'Not required', price: 0 }
              ],
              cooking: [
                { name: 'Breakfast', price: 0 },
                { name: 'Lunch', price: 0},
                { name: 'Dinner', price: 0 },
                { name: 'All meals', price: 1500 },
                { name: 'Not required', price: 0 }
              ],
              Laundry: [
                { name: 'Laundry using washing Machine', price: 0 },
                { name: 'Not required', price: 0 }
              ],
              House_Size: [
                { name: '1BHK', price: 0 },
                { name: '2BHK', price: 0 },
                { name: '3BKH(less than 2000sqft)', price: 0 },
                { name: '3BKH(more than 2000sqft)', price: 0 },
                { name: '4BKH(less than 3000sqft)', price: 550 },
                { name: '4BKH(more than 3000sqft)', price: 650 },
                { name: '5BHK', price: 750 },
                { name: '6BHK', price: 850 }
              ],
              Floors: [
                { name: '1floor', price: 0 },
                { name: '2 floors', price: 0 },
                { name: '3 floors', price: 500 },
                { name: '4 floors', price: 750 },
                { name: '5 floors', price: 900 }
              ],
              People: [
                { name: '1 person', price: 0 },
                { name: '2 people', price: 0 },
                { name: '3 people', price: 0 },
                { name: '4 people', price: 0 },
                { name: '5-6 people', price: 400 },
                { name: '7-8 people', price: 550 }
              ],
              Bathroom_Cleaning: [
                { name: '1-2 bathrooms', price: 0 },
                { name: '3-4 bathrooms', price: 0 },
                { name: '5-6 bathrooms', price: 400 },
                { name: 'Not required', price: 0 }
              ]
            }
          }

        ]
      },


  };

const ServiceModel = mongoose.model('servicedata' , ServiceSchema);

const insertServiceData = async()=>{
    try{
      const existingservicecount = await ServiceModel.countDocuments();

      if(existingservicecount==0){
        const documentsToInsert = Object.values(serviceData).map(service => ({
          id: service.id,
          name: service.name,
          types: service.types
      }));

      await ServiceModel.insertMany(documentsToInsert);
      console.log('Services inserted successfully');
      }
    }
    catch(err){
       console.log('Error inserting service' , err);
    }
}


ServiceModel.getservice = async(req , successCallback , errorCallback)=>{

    const idfromreq = req?.params?.id;

    try{
        console.log(idfromreq);
        const dbRes = await ServiceModel.find({id:idfromreq});
        console.log("GET | dbRes is: ", dbRes);
        successCallback(dbRes);
    }
    catch(dbErr){
        console.error("GET | dbErr is: ", dbErr.Error);
        errorCallback(dbErr);
    }
}

insertServiceData();

export default ServiceModel;



