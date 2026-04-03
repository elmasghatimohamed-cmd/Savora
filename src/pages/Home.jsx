import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Bienvenue chez Savora</h1>
                <p>Découvrez notre cuisine marocaine authentique</p>
                <Link to="/plates" className="cta-button">
                    Voir nos plats
                </Link>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <h3>Cuisine Traditionnelle</h3>
                    <p>Des recettes authentiques transmises de génération en génération</p>
                </div>
                <div className="feature-card">
                    <h3>Ingrédients Frais</h3>
                    <p>Des produits locaux et de saison pour une qualité exceptionnelle</p>
                </div>
                <div className="feature-card">
                    <h3>Livraison Rapide</h3>
                    <p>Recevez vos commandes chaudes et prêtes à déguster</p>
                </div>
            </div>
        </div>
    );
}
