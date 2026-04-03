import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { platesService } from '../api/plates';

export default function PlateDetail() {
    const { id } = useParams();

    const [plate, setPlate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const lastFetchedId = useRef(null);

    useEffect(() => {
        if (lastFetchedId.current === id) return;

        lastFetchedId.current = id;
        loadPlate();
    }, [id]);

    const loadPlate = async () => {
        try {
            setLoading(true);
            setError('');

            const data = await platesService.getById(id);
            setPlate(data);

        } catch {
            setError('Plat non trouvé ou erreur de chargement.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="plate-detail">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Chargement du plat...</p>
                </div>
            </div>
        );
    }

    if (error || !plate) {
        return (
            <div className="plate-detail">
                <div className="not-found">
                    <h2>Plat non trouvé</h2>
                    <p>{error || "Le plat que tu cherches n'existe pas."}</p>
                    <Link to="/plates" className="back-button">
                        Retour aux plats
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="plate-detail">
            <div className="plate-header">
                <Link to="/plates" className="back-link">
                    ← Retour aux plats
                </Link>
                <h1>{plate.name}</h1>
            </div>

            <div className="plate-content">
                <div className="plate-image">
                    <img
                        src={
                            plate.image ||
                            'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'
                        }
                        alt={plate.name}
                    />
                </div>

                <div className="plate-info">
                    <div className="price-section">
                        <span className="price">{plate.price} MAD</span>
                        <span className={`availability ${plate.is_available ? 'available' : 'unavailable'}`}>
                            {plate.is_available ? 'Disponible' : 'Indisponible'}
                        </span>
                    </div>

                    <div className="description">
                        <h3>Description</h3>
                        <p>{plate.description}</p>
                    </div>

                    <div className="actions">
                        <button
                            className="analyze-btn"
                            disabled={!plate.is_available}
                        >
                            Analyser le plat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}