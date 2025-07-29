"use client";

import { Calendar } from "react-date-range";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DateRangeType } from "./types";
import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateSelectionStepProps {
  dateRange: DateRangeType;
  setDateRange: (dateRange: DateRangeType) => void;
}

export default function DateSelectionStep({ dateRange, setDateRange }: DateSelectionStepProps) {
  // États locaux pour la sélection des dates
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectingStart, setSelectingStart] = useState(true);
  const [hasSelection, setHasSelection] = useState(false);
  
  // Calcul du nombre de nuits seulement si des dates sont sélectionnées
  const nights = startDate && endDate ? Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) : 0;
  
  // Mettre à jour le dateRange parent quand les dates locales changent
  useEffect(() => {
    if (startDate && endDate) {
      setDateRange({
        startDate,
        endDate,
        key: 'selection'
      });
      setHasSelection(true);
    }
  }, [startDate, endDate, setDateRange]);
  
  // Gérer la sélection des dates
  const handleDateSelect = (date: Date) => {
    if (selectingStart) {
      setStartDate(date);
      setEndDate(undefined);
      setSelectingStart(false);
    } else {
      // Vérifier que la date de fin est après la date de début
      if (startDate && date >= startDate) {
        setEndDate(date);
        setSelectingStart(true);
      } else {
        // Si l'utilisateur sélectionne une date antérieure, on recommence
        setStartDate(date);
        setEndDate(undefined);
        setSelectingStart(false);
      }
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium text-gray-800 mb-6">Sélectionnez vos dates de séjour</h3>
      <div className="flex flex-col items-center w-full px-2">
        <div className="mb-6 w-full">
          {/* Calendriers avec affichage adaptatif */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Premier calendrier (arrivée) - visible uniquement sur desktop */}
            <div className="hidden md:block w-full md:w-1/2">
              <div className="p-2 bg-white rounded-xl shadow-md">
                <Calendar
                  date={startDate}
                  onChange={handleDateSelect}
                  locale={fr}
                  minDate={new Date()}
                  color="#3b82f6"
                  className="rounded-xl overflow-hidden w-full border-0 text-base"
                  showMonthAndYearPickers={true}
                  showDateDisplay={false}
                />
              </div>
            </div>
            
            {/* Deuxième calendrier (départ) - visible uniquement sur desktop */}
            <div className="hidden md:block w-full md:w-1/2">
              <div className="p-2 bg-white rounded-xl shadow-md">
                <Calendar
                  date={endDate}
                  onChange={handleDateSelect}
                  locale={fr}
                  minDate={new Date()}
                  color="#3b82f6"
                  className="rounded-xl overflow-hidden w-full border-0 text-base"
                  showMonthAndYearPickers={true}
                  showDateDisplay={false}
                />
              </div>
            </div>
            
            {/* Calendrier unique pour mobile - alterne entre arrivée et départ */}
            <div className="block md:hidden w-full">
              <div className="p-2 bg-white rounded-xl shadow-md">
                <Calendar
                  date={selectingStart ? startDate : endDate}
                  onChange={handleDateSelect}
                  locale={fr}
                  minDate={selectingStart ? new Date() : startDate || new Date()}
                  color="#3b82f6"
                  className="rounded-xl overflow-hidden w-full border-0 text-sm"
                  showMonthAndYearPickers={true}
                  showDateDisplay={false}
                />
              </div>
              <div className="mt-3 text-center">
                <div className="bg-blue-100 py-2 px-3 rounded-lg">
                  <span className="text-blue-700 font-medium">
                    {selectingStart ? "Sélectionnez votre date d'arrivée" : "Sélectionnez votre date de départ"}
                  </span>
                </div>
                {startDate && !selectingStart && (
                  <div className="mt-2 text-sm text-gray-600">
                    Date d'arrivée sélectionnée: {format(startDate, "dd/MM/yyyy", { locale: fr })}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            {selectingStart ? (
              <div className="text-blue-600 font-medium text-lg">Sélectionnez votre date d'arrivée</div>
            ) : (
              <div className="text-blue-600 font-medium text-lg">Sélectionnez votre date de départ</div>
            )}
          </div>
        </div>
        
        {hasSelection && startDate && endDate && (
          <>
            <div className="w-full mt-6 bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center shadow-sm">
              <div className="text-center sm:text-left mb-3 sm:mb-0">
                <span className="font-medium text-gray-600">Arrivée</span><br/>
                <span className="text-base sm:text-lg font-semibold text-gray-800">{format(startDate, "dd MMM yyyy", { locale: fr })}</span>
              </div>
              <div className="text-blue-400 hidden sm:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <div className="text-blue-400 block sm:hidden mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="text-center sm:text-right">
                <span className="font-medium text-gray-600">Départ</span><br/>
                <span className="text-base sm:text-lg font-semibold text-gray-800">{format(endDate, "dd MMM yyyy", { locale: fr })}</span>
              </div>
            </div>
            <div className="w-full mt-3 text-center font-medium text-lg">
              <span className="px-4 py-1 bg-blue-600 text-white rounded-full">{nights} nuits</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
