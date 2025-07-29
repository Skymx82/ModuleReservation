"use client";

import { Calendar } from "react-date-range";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DateRangeType } from "./types";
import { useState, useEffect, useLayoutEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Type pour react-date-range
interface Range {
  startDate?: Date;
  endDate?: Date;
  key: string;
}

// Style personnalisé pour le calendrier
const calendarStyles = `
  .rdrMonth {
    width: 100% !important;
  }
  .rdrCalendarWrapper {
    width: 100% !important;
    max-width: 100% !important;
    font-size: 16px !important;
  }
  .rdrDateDisplayWrapper {
    background-color: #f0f9ff !important;
  }
  .rdrDateDisplay {
    margin: 0.5rem !important;
  }
  @media (min-width: 768px) {
    .rdrMonthsHorizontal {
      justify-content: space-between !important;
    }
  }
`;

interface DateSelectionStepProps {
  dateRange: DateRangeType;
  setDateRange: (dateRange: DateRangeType) => void;
}

export default function DateSelectionStep({ dateRange, setDateRange }: DateSelectionStepProps) {
  // État pour suivre la largeur de l'écran
  const [isMobile, setIsMobile] = useState(false);
  
  // Détecter la taille de l'écran
  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // États locaux pour la sélection des dates
  const [startDate, setStartDate] = useState<Date | undefined>(dateRange.startDate || undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(dateRange.endDate || undefined);
  const [selectingStart, setSelectingStart] = useState(true);
  const [hasSelection, setHasSelection] = useState(!!dateRange.startDate && !!dateRange.endDate);
  
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
      <h3 className="text-xl font-medium text-gray-800 mb-6 text-center">Sélectionnez vos dates de séjour</h3>
      <div className="flex flex-col items-center w-full px-2">
        {/* Style personnalisé pour le calendrier */}
        <style jsx global>{calendarStyles}</style>
        
        {/* Un seul calendrier pour toutes les tailles d'écran */}
        <div className="w-full">
          <div className="p-2 bg-white rounded-xl shadow-md">
            {/* Un seul calendrier pour toutes les tailles d'écran */}
            <Calendar
              date={selectingStart ? startDate : endDate}
              onChange={handleDateSelect}
              locale={fr}
              minDate={selectingStart ? new Date() : startDate || new Date()}
              color="#3b82f6"
              className="rounded-xl overflow-hidden w-full border-0"
              showMonthAndYearPickers={true}
              showDateDisplay={false}
            />
          </div>
        </div>
        
        {/* Message indicatif pour la sélection des dates */}
        <div className="mt-3 text-center w-full">
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
        
        {/* Affichage du résumé des dates */}
        {hasSelection && startDate && endDate && nights > 0 && (
          <div className="w-full mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center shadow-sm">
              <div className="text-center sm:text-left mb-3 sm:mb-0">
                <span className="font-medium text-gray-600">Arrivée</span><br/>
                <span className="text-base sm:text-lg font-semibold text-gray-800">
                  {format(startDate, "dd MMM yyyy", { locale: fr })}
                </span>
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
                <span className="text-base sm:text-lg font-semibold text-gray-800">
                  {format(endDate, "dd MMM yyyy", { locale: fr })}
                </span>
              </div>
            </div>
            <div className="w-full mt-3 text-center font-medium text-lg">
              <span className="px-4 py-1 bg-blue-600 text-white rounded-full">{nights} nuits</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
