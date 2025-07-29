"use client";

import { useState } from "react";
import { addDays } from "date-fns";

import DateSelectionStep from "./DateSelectionStep";
import RoomSelectionStep from "./RoomSelectionStep";
import ContactFormStep from "./ContactFormStep";
import StepIndicator from "./StepIndicator";
import { roomTypes } from "./roomData";
import { FormData, RoomType, DateRangeType } from "./types";

export default function ContactModule() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Dates, 2: Chambre, 3: Coordonnées
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    country: "France",
    email: "",
    phoneCode: "+33",
    phone: "",
    comment: "",
  });

  const toggleModule = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCurrentStep(1); // Réinitialiser à l'étape 1 lors de l'ouverture
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pourriez ajouter la logique d'envoi du formulaire
    if (dateRange.startDate && dateRange.endDate) {
      console.log("Réservation soumise:", {
        ...formData,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        room: selectedRoom,
        nights: Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24))
      });
      alert("Merci pour votre réservation ! Nous vous contacterons bientôt pour la confirmation.");
      setIsOpen(false);
      setCurrentStep(1);
      setSelectedRoom(null);
      setDateRange({
        startDate: null,
        endDate: null,
        key: "selection",
      });
    }
    setFormData({
      firstName: "",
      lastName: "",
      country: "France",
      email: "",
      phoneCode: "+33",
      phone: "",
      comment: "",
    });
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={toggleModule}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-40 transition-all"
        aria-label="Réserver"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {/* Overlay flou très clair */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleModule}
        style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
      />

      {/* Module de réservation */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        <div className="p-6 text-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Réservation</h2>
            <button
              onClick={toggleModule}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fermer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Indicateur d'étapes */}
          <StepIndicator currentStep={currentStep} totalSteps={3} />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Étape 1: Sélection des dates */}
            {currentStep === 1 && (
              <DateSelectionStep 
                dateRange={dateRange} 
                setDateRange={setDateRange} 
              />
            )}

            {/* Étape 2: Sélection de la chambre */}
            {currentStep === 2 && (
              <RoomSelectionStep 
                roomTypes={roomTypes} 
                selectedRoom={selectedRoom} 
                setSelectedRoom={setSelectedRoom}
                dateRange={dateRange}
              />
            )}

            {/* Étape 3: Coordonnées */}
            {currentStep === 3 && (
              <ContactFormStep 
                formData={formData} 
                handleChange={handleChange} 
              />
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                >
                  Précédent
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={currentStep === 2 && !selectedRoom}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${currentStep === 2 && !selectedRoom ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                >
                  Réserver
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
