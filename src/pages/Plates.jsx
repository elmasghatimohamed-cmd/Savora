import React, { useState, useEffect, useRef } from 'react';
import PlateCard from '../components/PlateCard';
import { platesService } from '../api/plates';

export default function Plates() {
    const [query, setQuery] = useState('');
    const [plates, setPlates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        loadPlates();
    }, []);

    const loadPlates = async () => {
        try {
            setLoading(true);
            setError('');

            const data = await platesService.getAll();
            const platesArray = Array.isArray(data)
                ? data
                : data?.data || data?.plates || [];

            setPlates(platesArray);

        } catch {
            setError('Impossible de charger les plats. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const filteredPlates = plates.filter(plate =>
        plate.is_available &&
        (
            plate.name?.toLowerCase().includes(query.toLowerCase()) ||
            plate.description?.toLowerCase().includes(query.toLowerCase())
        )
    );

    if (loading) {
        return (
            <div className="main-content">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Chargement des plats...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="main-content">
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={loadPlates} className="retry-button">
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Rechercher un plat..."
                />
            </div>

            {filteredPlates.length === 0 ? (
                <div className="no-results">
                    Aucun résultat pour <i>"{query}"</i>
                </div>
            ) : (
                <div className="grid">
                    {filteredPlates.map(plate => (
                        <PlateCard key={plate.id} plate={plate} />
                    ))}
                </div>
            )}
        </div>
    );
}