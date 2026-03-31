import './App.css'
import PlateCard from "./components/PlateCard";
import { useState } from 'react';

const plats = [
  { id: 1, name: "Tajine poulet", price: 85, description: "Poulet avec legumes et citron", is_available: true },
  { id: 2, name: "Couscous", price: 120, description: "Semoule avec legumes et viandes", is_available: true },
  { id: 3, name: "Pastila poulet", price: 95, description: "Feuilleté sucré salé au poulet", is_available: true },
  { id: 4, name: "Harira marocain", price: 45, description: "Soupe traditionelle avec lentilles", is_available: true },
  { id: 5, name: "Brochettes merguez", price: 75, description: "Saucisses épicées grillées", is_available: true },
  { id: 6, name: "Rfissa poulet", price: 110, description: "Poulet avec msemen et fenugrec", is_available: true },
  { id: 7, name: "Tajine kefta", price: 90, description: "Boulettes viande avec oeufs", is_available: true },
  { id: 8, name: "Bastila pigeon", price: 150, description: "Feuilleté au pigeon et amandes", is_available: true },
  { id: 9, name: "Mrouzia agneau", price: 180, description: "Agneau confit avec raisins", is_available: true },
  { id: 10, name: "Salade marocaine", price: 55, description: "Salade avec tomates et oignons", is_available: true }
];

export default function App() {
  const [query, setQuery] = useState('');

  const filteredPlats = plats.filter(plat =>
    plat.is_available &&
    (plat.name.toLowerCase().includes(query.toLowerCase()) || plat.description.toLowerCase().includes(query.toLowerCase()))
  );

  const searchInput = (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Rechercher un plat..."
    />
  );

  if (filteredPlats.length === 0 && query !== '') {
    return (
      <div className="grid">
        {searchInput}
        <div className="no-results">
          No matches for <i>"{query}"</i>
        </div>
      </div>
    );
  }

  return (
    <div className="grid">
      {searchInput}
      {filteredPlats.map(plat => (
        <PlateCard key={plat.id} {...plat} />
      ))}
    </div>
  );
}