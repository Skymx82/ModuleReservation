"use client";

import { FormData } from "./types";

interface ContactFormStepProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function ContactFormStep({ formData, handleChange }: ContactFormStepProps) {
  return (
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

      <div className="mt-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Nom
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

      <div className="mt-4">
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

      <div className="mt-4">
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

      <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 gap-2">
        <div className="col-span-1">
          <label htmlFor="phoneCode" className="block text-sm font-medium text-gray-700 mb-1">
            Indicatif
          </label>
          <select
            id="phoneCode"
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          >
            <option value="+33">+33</option>
            <option value="+32">+32</option>
            <option value="+41">+41</option>
            <option value="+1">+1</option>
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
            required
            placeholder="Votre numéro"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Commentaire (optionnel)
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
  );
}
