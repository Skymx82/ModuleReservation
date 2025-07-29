"use client";

import { useState, useEffect } from "react";

interface GuestCountStepProps {
  guestCount: number;
  setGuestCount: (count: number) => void;
}

export default function GuestCountStep({ guestCount, setGuestCount }: GuestCountStepProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  // Synchroniser le nombre total avec les props
  useEffect(() => {
    setGuestCount(adults + children);
  }, [adults, children, setGuestCount]);
  
  // Initialiser les valeurs à partir du guestCount
  useEffect(() => {
    if (guestCount > 0 && adults + children !== guestCount) {
      // Par défaut, on suppose que ce sont des adultes
      setAdults(Math.min(guestCount, 6));
      setChildren(Math.max(0, guestCount - 6));
    }
  }, []);

  const handleDecreaseAdults = () => {
    if (adults > 1) {
      setAdults(adults - 1);
    }
  };

  const handleIncreaseAdults = () => {
    if (adults < 6) {
      setAdults(adults + 1);
    }
  };
  
  const handleDecreaseChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  const handleIncreaseChildren = () => {
    if (children < 4) {
      setChildren(children + 1);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium text-gray-800 mb-6 text-center">Voyageurs</h3>
      
      <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
        {/* Section Adultes */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <h4 className="font-medium text-gray-800">Adultes</h4>
            <p className="text-sm text-gray-500">13 ans et plus</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleDecreaseAdults}
              disabled={adults <= 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${adults <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              aria-label="Diminuer le nombre d'adultes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            
            <span className="w-6 text-center font-medium">{adults}</span>
            
            <button
              type="button"
              onClick={handleIncreaseAdults}
              disabled={adults >= 6}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${adults >= 6 ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              aria-label="Augmenter le nombre d'adultes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Section Enfants */}
        <div className="flex items-center justify-between py-4">
          <div>
            <h4 className="font-medium text-gray-800">Enfants</h4>
            <p className="text-sm text-gray-500">De 2 à 12 ans</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleDecreaseChildren}
              disabled={children <= 0}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${children <= 0 ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              aria-label="Diminuer le nombre d'enfants"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            
            <span className="w-6 text-center font-medium">{children}</span>
            
            <button
              type="button"
              onClick={handleIncreaseChildren}
              disabled={children >= 4}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${children >= 4 ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              aria-label="Augmenter le nombre d'enfants"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-blue-700 font-medium">
            {adults + children} {adults + children > 1 ? 'voyageurs' : 'voyageur'} au total
          </span>
        </div>
      </div>
    </div>
  );
}
