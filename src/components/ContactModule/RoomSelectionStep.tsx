"use client";

import { RoomType, DateRangeType } from "./types";

interface RoomSelectionStepProps {
  roomTypes: RoomType[];
  selectedRoom: RoomType | null;
  setSelectedRoom: (room: RoomType) => void;
  dateRange: DateRangeType;
}

export default function RoomSelectionStep({ 
  roomTypes, 
  selectedRoom, 
  setSelectedRoom,
  dateRange 
}: RoomSelectionStepProps) {
  const nights = dateRange.startDate && dateRange.endDate ? Math.ceil(
    (dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) : 0;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Choisissez votre chambre</h3>
      <div className="space-y-4">
        {roomTypes.map((room) => (
          <div 
            key={room.id}
            onClick={() => setSelectedRoom(room)}
            className={`border ${selectedRoom?.id === room.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-lg p-3 cursor-pointer hover:border-blue-300 transition-all`}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-24 h-32 sm:h-24 overflow-hidden rounded-md sm:mr-4 mb-3 sm:mb-0">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 text-center sm:text-left">{room.name}</h4>
                <p className="text-sm text-gray-600 text-center sm:text-left">{room.description}</p>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-2 sm:gap-0">
                  <span className="text-sm">{room.capacity} personnes</span>
                  <span className="font-medium text-blue-700 text-lg">{room.price}€ / nuit</span>
                </div>
              </div>
            </div>
            {selectedRoom?.id === room.id && (
              <div className="mt-2 text-center text-blue-600 font-medium bg-blue-100 py-1 rounded-md">
                ✓ Sélectionnée
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
          <span className="font-medium">{nights}</span>
        </div>
        <div className="flex justify-between mt-2 text-lg font-medium">
          <span>Total:</span>
          <span className="text-blue-700">
            {selectedRoom ? 
              `${selectedRoom.price * nights}€` : 
              '-'}
          </span>
        </div>
      </div>
    </div>
  );
}
