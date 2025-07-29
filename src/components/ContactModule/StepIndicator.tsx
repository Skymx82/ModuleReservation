"use client";

import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-between mb-6 sm:mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className={`flex flex-col items-center ${currentStep >= index + 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-base ${currentStep >= index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {index + 1}
            </div>
            <span className="text-[10px] sm:text-xs mt-1 hidden xs:block">
              {index === 0 ? 'Dates' : index === 1 ? 'Chambre' : 'Contact'}
            </span>
          </div>
          
          {index < totalSteps - 1 && (
            <div className="relative flex-grow mx-1 sm:mx-2">
              <div className="absolute top-3 sm:top-4 w-full h-0.5 bg-gray-200">
                <div 
                  className={`h-full bg-blue-600 transition-all duration-500`} 
                  style={{ width: currentStep > index + 1 ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
