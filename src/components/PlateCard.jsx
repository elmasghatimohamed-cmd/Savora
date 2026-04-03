import React from 'react';
import { Link } from 'react-router-dom';

function PlateCard({ plate }) {


    const isAvailable = plate.is_available !== false;

    return (
        <Link to={`/plates/${plate.id}`} className="plate-card-link">
            <div className="plate-card">
                <div className="plate-card-image">
                    <img
                        src={plate.image}
                        alt={plate.name}
                        onError={(e) => {
                            e.target.src = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
                        }}
                    />
                    {isAvailable && <div className="badge">DISPONIBLE</div>}
                </div>
                <div className="plate-card-content">
                    <h3 className="name">{plate.name}</h3>
                    <p className="desc">{plate.description}</p>
                    <div className="plate-card-footer">
                        <span className="price">{plate.price} MAD</span>
                        <button
                            className="view-details"
                            onClick={(e) => {
                                e.preventDefault();
                                e.currentTarget.blur();
                            }}
                        >
                            Voir détails
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PlateCard;
