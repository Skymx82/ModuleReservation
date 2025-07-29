import { RoomType } from "./types";

// Données de démonstration pour les chambres
export const roomTypes: RoomType[] = [
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
