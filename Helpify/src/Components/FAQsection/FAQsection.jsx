import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQsection.css'; // You'll need to create this CSS file

const FAQsection = () => {
  const faqs = [
    {
      question: "What if I'm not satisfied with the services?",
      answer: "While all our helpers undergo an intensive verification regime before being certified as a Madad-Mitra, we still believe that there's always room for improvement. In order to ensure that you obtain the optimum fit for your home, we provide an 'unlimited replacement' policy as part of your membership. Just reach out to your relationship manager or mail us at support@Madad-Mitra.com.",
      category: "Services"
    },
    {
      question: "How much will a cook/maid/babysitter cost in Tricity?",
      answer: "The average wage of our helpers is completely dependent on your requirements and location. It can vary anywhere between ₹4,000 to ₹25,000/per month.",
      category: "Pricing"
    },
    {
      question: "Why do your services seem more expensive than other helpers in the market?",
      answer: "Unlike maid services/agencies we don't charge a hefty commission fee from our clients, just a nominal booking amount. The entire wage as estimated by our wage estimation matrix(based on the Minimum Wages Act Of 1948) is paid in full to the helper.",
      category: "Pricing"
    },
    {
      question: "Is a maid/cook/babysitter from Mdad-Mitra reliable?",
      answer: "Every Madad-Mitra helper goes through a thorough background check using their Aadhar and police records, and is only sent to your homes after a successful vetting process.",
      category: "Safety"
    },
    {
      question: "Is it safe to hire a maid/cook/babysitter during the pandemic?",
      answer: "In order to ensure your safety, every Madad-Mitra helper goes through a RT-PCR test and are sent to your home via a private cab.",
      category: "Safety"
    }
  ];

  const [activeIndices, setActiveIndices] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  const toggleFAQ = (index) => {
    const newActiveIndices = new Set(activeIndices);
    if (newActiveIndices.has(index)) {
      newActiveIndices.delete(index);
    } else {
      newActiveIndices.add(index);
    }
    setActiveIndices(newActiveIndices);
  };

  const filteredFaqs = faqs.filter(faq => 
    selectedCategory === 'All' || faq.category === selectedCategory
  );

  return (
    <div className="faq-container ">
      <div className="decorative-bg">
        <div className="blur-circle-1"></div>
        <div className="blur-circle-2"></div>
        <div className="blur-circle-3"></div>
      </div>

      <div className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-11">
            {/* Header Section */}
            <div className="text-center mb-4 mb-md-5">
              <h2 className="gradient-text display-5 display-md-4 fw-bold mb-2 mb-md-3">
                Frequently Asked Questions
              </h2>
              <p className="text-secondary fs-6 fs-md-5">
                Find answers to common questions about our services
              </p>
            </div>

            {/* Category Filter */}
            <div className="category-filters d-flex flex-wrap justify-content-center gap-2 mb-4 mb-md-5">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ Cards */}
            <div className="faq-list">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="faq-card card mb-3">
                  <button
                    className="faq-question border-0 bg-transparent w-100 text-start p-3 p-md-4 d-flex justify-content-between align-items-center"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={activeIndices.has(index)}
                  >
                    <span className="question-text">{faq.question}</span>
                    <div className="d-flex align-items-center gap-2 gap-md-3">
                      <span className="category-tag">{faq.category}</span>
                      {activeIndices.has(index) ? (
                        <ChevronUp className="chevron active" />
                      ) : (
                        <ChevronDown className="chevron" />
                      )}
                    </div>
                  </button>
                  
                  <div className={`faq-answer ${activeIndices.has(index) ? 'show' : ''}`}>
                    <div className="p-3 p-md-4 pt-0 border-top answer-text">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default FAQsection;