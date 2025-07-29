import Image from "next/image";
import ContactModule from "../components/ContactModule";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-800">Hôtel Riviera</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-800">Accueil</a>
            <a href="#" className="text-gray-600 hover:text-blue-800">Chambres</a>
            <a href="#" className="text-gray-600 hover:text-blue-800">Services</a>
            <a href="#" className="text-gray-600 hover:text-blue-800">À propos</a>
            <a href="#" className="text-gray-600 hover:text-blue-800">Contact</a>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenue à l'Hôtel Riviera</h1>
          <p className="text-xl md:text-2xl mb-8">Une expérience inoubliable au cœur de la côte</p>
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Réserver maintenant
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Découvrez notre hôtel</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                Situé face à la mer Méditerranée, l'Hôtel Riviera vous accueille dans un cadre exceptionnel. Nos chambres élégantes, notre restaurant gastronomique et nos installations de bien-être vous promettent un séjour de détente absolue.
              </p>
              <p className="text-gray-600 mb-4">
                Que vous veniez pour des vacances en famille, un voyage d'affaires ou une escapade romantique, notre équipe attentionnée veillera à ce que votre séjour soit parfait à tous points de vue.
              </p>
              <div className="flex space-x-4 mt-6">
                <button className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold py-2 px-4 rounded transition duration-300">
                  En savoir plus
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chambre d'hôtel" width={400} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Restaurant" width={400} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Piscine" width={400} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Spa" width={400} height={300} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nos chambres</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Room Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="relative h-64">
                <Image src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chambre Standard" width={500} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Chambre Standard</h3>
                <p className="text-gray-600 mb-4">Une chambre confortable avec tout le nécessaire pour un séjour agréable.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-800">99€ / nuit</span>
                  <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Réserver
                  </button>
                </div>
              </div>
            </div>

            {/* Room Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="relative h-64">
                <Image src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chambre Deluxe" width={500} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Chambre Deluxe</h3>
                <p className="text-gray-600 mb-4">Une chambre spacieuse avec vue sur la mer et balcon privé.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-800">159€ / nuit</span>
                  <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Réserver
                  </button>
                </div>
              </div>
            </div>

            {/* Room Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="relative h-64">
                <Image src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Suite Présidentielle" width={500} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Suite Présidentielle</h3>
                <p className="text-gray-600 mb-4">Notre suite la plus luxueuse avec jacuzzi et service personnalisé.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-800">299€ / nuit</span>
                  <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for Reservation Module */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Réservez votre séjour</h2>
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600 mb-6 text-lg">C'est ici que s'intégrera votre module de réservation</p>
            <div className="bg-gray-100 p-6 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
              <span className="text-xl text-gray-500 font-medium">Module de réservation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hôtel Riviera</h3>
              <p className="text-gray-300">Un séjour de luxe au bord de la mer Méditerranée.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Accueil</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Chambres</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="text-gray-300 not-italic">
                <p>123 Boulevard de la Mer</p>
                <p>06400 Cannes, France</p>
                <p className="mt-2">+33 4 93 XX XX XX</p>
                <p>contact@hotel-riviera.fr</p>
              </address>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-300 mb-4">Inscrivez-vous pour recevoir nos offres spéciales.</p>
              <div className="flex">
                <input type="email" placeholder="Votre email" className="px-4 py-2 w-full rounded-l text-gray-800" />
                <button className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-r">
                  OK
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Hôtel Riviera. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
      
      {/* Module de contact flottant */}
      <ContactModule />
    </div>
  );
}
