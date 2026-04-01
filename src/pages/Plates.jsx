import React, { useState } from 'react';
import PlateCard from '../components/PlateCard';

const plats = [
    { id: 1, name: 'Tajine poulet', price: 120, description: 'Tajine traditionnel au poulet avec légumes et épices marocaines', is_available: true },
    { id: 2, name: 'Couscous royal', price: 150, description: 'Couscous avec viande, légumes et raisins secs', is_available: true },
    { id: 3, name: 'Pastilla au pigeon', price: 180, description: 'Pastilla sucrée-salée traditionnelle au pigeon', is_available: true },
    { id: 4, name: 'Harira', price: 45, description: 'Soupe traditionnelle ramadan aux lentilles et pois chiches', is_available: true },
    { id: 5, name: 'Méchoui', price: 200, description: 'Agneau rôti lentement aux herbes aromatiques', is_available: true },
    { id: 6, name: 'Briouates', price: 60, description: 'Feuilletés fourrés au fromage ou viande hachée', is_available: true },
    { id: 7, name: 'Tagine d\'agneau', price: 140, description: 'Tajine tendre d\'agneau aux pruneaux et amandes', is_available: true },
    { id: 8, name: 'Salade marocaine', price: 35, description: 'Salade fraîche aux tomates, concombres et épices', is_available: true },
    { id: 9, name: 'Msemen', price: 25, description: 'Crêpes marocaines feuilletées au miel', is_available: true },
    { id: 10, name: 'Thé à la menthe', price: 20, description: 'Thé vert sucré à la menthe fraîche', is_available: true }
];

export default function Plates() {
    const [query, setQuery] = useState('');

    const filteredPlats = plats.filter(plate =>
        plate.is_available &&
        (plate.name.toLowerCase().includes(query.toLowerCase()) || plate.description.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div className="main-content">
            <div className="header">
                <div className="profile-section">
                    <img src="/src/images/womanizer-toys-8oB43mw658c-unsplash.jpg" alt="Profile" className="profile-pic" />
                    <div className="user-name">Mohamed</div>
                </div>
                <div className="notification-section">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                </div>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Rechercher un plat..."
                />
            </div>


            {filteredPlats.length === 0 ? (
                <div className="no-results">
                    No matches for <i>"{query}"</i>
                </div>
            ) : (
                <div className="grid">
                    {filteredPlats.map(plate => (
                        <PlateCard key={plate.id} plate={plate} />
                    ))}
                </div>
            )}
        </div>
    );
}
