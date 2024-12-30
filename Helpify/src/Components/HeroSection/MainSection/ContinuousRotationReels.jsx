
import ashaimg from "../../../assets/images/Testimonials/Testimonial-1.jpg"
import aiysha from "../../../assets/images/Testimonials/Aiysha.jpeg"
import gayathiri from "../../../assets/images/Testimonials/Gayathiri.jpeg"
import rita from "../../../assets/images/Testimonials/Rita.jpeg"
import sandeep from "../../../assets/images/Testimonials/Sandeep.jpg"
import savitaimg from "../../../assets/images/Testimonials/savita.jpg"
import raviimg from "../../../assets/images/Testimonials/Ravi.png"
import shivamimg from "../../../assets/images/Testimonials/Shivam.jpg"
import React, { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";
import "./MainSection.css"

const ContinuousRotationReels = () => {
  const [mountComplete, setMountComplete] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showReels, setShowReels] = useState(false);

  const movieData = [
    { title: "Asha", genre: "All-rounder", image: ashaimg },
    { title: "Aiysha", genre: "Baby CareTaker", image: aiysha},
    { title: "Gayathiri", genre: "House Maid", image: gayathiri },
    { title: "Rita", genre: "24-Hrs-JAPA", image: rita },
    { title: "Sandeep", genre: "Domestic Worker", image:sandeep},
    { title: "Savita", genre: "Cooking Maid", image: savitaimg},
    { title: "Ravi", genre: "24-Hrs-Live-in", image: raviimg },
    { title: "Shivam", genre: "All-rounder", image: shivamimg }
  ];

  useEffect(() => {
    // Ensure component is mounted
    setMountComplete(true);
    
    // Start the animation sequence immediately after mount
    const titleTimer = setTimeout(() => setShowTitle(true), 100);
    const reelsTimer = setTimeout(() => setShowReels(true), 1000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(reelsTimer);
    };
  }, []);

  if (!mountComplete) {
    return <div className="movie-container min-h-screen w-full bg-gray-900" />;
  }



  return (
    <div className="movie-container position-relative w-full mx-auto min-h-screen bg-gray-900">
      {/* Title Overlay */}
      <div className={`title-overlay ${showTitle ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`overlay-content ${showTitle ? 'translate-y-0' : 'translate-y-4'}`}>
          <h1 className="main-title">
            Welcome To Madad-Mitra
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className={`content-wrapper ${showReels ? 'opacity-100' : 'opacity-0'}`}>
        {/* Film strip holes decoration */}
        <div className="film-strip left-strip">
          {Array(10).fill(null).map((_, i) => (
            <div key={`left-${i}`} className="film-hole" />
          ))}
        </div>
        <div className="film-strip right-strip">
          {Array(10).fill(null).map((_, i) => (
            <div key={`right-${i}`} className="film-hole" />
          ))}
        </div>

        {/* Movie Reels */}
        <div className="reels-container">
          {/* Upper Reel */}
          <div className="reel-wrapper">
            <div className={`reel ${showReels ? 'slide-from-left' : ''}`}>
              {[...movieData, ...movieData].map((movie, index) => (
                <MovieCard
                  key={`upper-${index}`}
                  title={movie.title}
                  genre={movie.genre}
                  image={movie.image}
                />
              ))}
            </div>
          </div>

          <div className="reel-separator" />

          {/* Lower Reel */}
          <div className="reel-wrapper">
            <div className={`reel ${showReels ? 'slide-from-right' : ''}`}>
              {[...movieData, ...movieData].map((movie, index) => (
                <MovieCard
                  key={`lower-${index}`}
                  title={movie.title}
                  genre={movie.genre}
                  image={movie.image}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="gradient-overlays">
          <div className="gradient-left" />
          <div className="gradient-right" />
        </div>
      </div>
    </div>
  );
};

export default ContinuousRotationReels;