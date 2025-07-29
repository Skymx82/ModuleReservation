"use client";

import { useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Types pour les chambres
interface RoomType {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
}

export default function ContactModule() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Dates, 2: Chambre, 3: Coordonnées
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  });
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [formData, setFormData] = useState({
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

  // Données de démonstration pour les chambres
  const roomTypes: RoomType[] = [
    {
      id: 1,
      name: "Chambre Standard",
      description: "Chambre confortable avec vue sur le jardin",
      price: 120,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    },
    {
      id: 2,
      name: "Chambre Deluxe",
      description: "Spacieuse avec balcon et vue sur la mer",
      price: 180,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    },
    {
      id: 3,
      name: "Suite Présidentielle",
      description: "Luxueuse suite avec salon privé et jacuzzi",
      price: 350,
      capacity: 4,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

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
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    });
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
        className={`fixed bottom-6 right-6 z-50 rounded-full bg-blue-800 text-white p-4 shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center ${
          isOpen ? "rotate-45" : ""
        }`}
        aria-label="Ouvrir le formulaire de contact"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Overlay flou transparent */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleModule}
        style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        aria-hidden="true"
      />

      {/* Module de réservation */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
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
          <div className="flex justify-between mb-8">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
              <span className="text-xs mt-1">Dates</span>
            </div>
            <div className="relative flex-grow mx-2">
              <div className="absolute top-4 w-full h-0.5 bg-gray-200">
                <div className={`h-full bg-blue-600 transition-all duration-500`} style={{ width: currentStep > 1 ? '100%' : '0%' }}></div>
              </div>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
              <span className="text-xs mt-1">Chambre</span>
            </div>
            <div className="relative flex-grow mx-2">
              <div className="absolute top-4 w-full h-0.5 bg-gray-200">
                <div className={`h-full bg-blue-600 transition-all duration-500`} style={{ width: currentStep > 2 ? '100%' : '0%' }}></div>
              </div>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
              <span className="text-xs mt-1">Coordonnées</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Étape 1: Sélection des dates */}
            {currentStep === 1 && (
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Sélectionnez vos dates de séjour</h3>
                <div className="flex flex-col items-center">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      if (item.selection.startDate && item.selection.endDate) {
                        setDateRange({
                          startDate: item.selection.startDate,
                          endDate: item.selection.endDate,
                          key: 'selection'
                        });
                      }
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={[dateRange]}
                    months={2}
                    direction="horizontal"
                    locale={fr}
                    rangeColors={["#1e40af"]} 
                    minDate={new Date()}
                    className="rounded-md overflow-hidden shadow-md w-full"
                  />
                  <div className="w-full mt-6 bg-blue-50 p-4 rounded-md flex justify-between items-center">
                    <div>
                      <span className="font-medium">Arrivée:</span><br/>
                      <span className="text-lg">{format(dateRange.startDate, "dd MMMM yyyy", { locale: fr })}</span>
                    </div>
                    <div>
                      <span className="font-medium">Départ:</span><br/>
                      <span className="text-lg">{format(dateRange.endDate, "dd MMMM yyyy", { locale: fr })}</span>
                    </div>
                  </div>
                  <div className="w-full mt-3 text-center text-blue-800 font-medium text-lg">
                    {Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24))} nuits
                  </div>
                </div>
              </div>
            )}

            {/* Étape 2: Sélection de la chambre */}
            {currentStep === 2 && (
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Choisissez votre chambre</h3>
                <div className="space-y-4">
                  {roomTypes.map((room) => (
                    <div 
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`border ${selectedRoom?.id === room.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-lg p-3 cursor-pointer hover:border-blue-300 transition-all`}
                    >
                      <div className="flex">
                        <div className="w-24 h-24 overflow-hidden rounded-md mr-4">
                          <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{room.name}</h4>
                          <p className="text-sm text-gray-600">{room.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm">{room.capacity} personnes</span>
                            <span className="font-medium text-blue-700">{room.price}€ / nuit</span>
                          </div>
                        </div>
                      </div>
                      {selectedRoom?.id === room.id && (
                        <div className="mt-2 text-center text-blue-600 font-medium">
                          Sélectionnée
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <span>Prix par nuit:</span>
                    <span className="font-medium">{selectedRoom ? `${selectedRoom.price}€` : '-'}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Nombre de nuits:</span>
                    <span className="font-medium">{Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                  <div className="flex justify-between mt-2 text-lg font-medium">
                    <span>Total:</span>
                    <span className="text-blue-700">
                      {selectedRoom ? 
                        `${selectedRoom.price * Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24))}€` : 
                        '-'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Étape 3: Coordonnées */}
            {currentStep === 3 && (
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Vos coordonnées</h3>
                <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de famille
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Pays
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Canada">Canada</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="phoneCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Indicatif
                </label>
                <select
                  id="phoneCode"
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="+33">(+33) France</option>
                  <option value="+32">(+32) Belgique</option>
                  <option value="+41">(+41) Suisse</option>
                  <option value="+1">(+1) Canada</option>
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Laissez-nous un commentaire
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                value={formData.comment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
                </div>
              </div>
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
