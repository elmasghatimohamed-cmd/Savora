import React from 'react';
import { Link } from 'react-router-dom';

function PlateCard({ plate }) {
    const getFoodImage = (name) => {
        const foodImages = {
            'tajine poulet': 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'couscous royal': 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'pastilla au pigeon': 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'harira': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'méchoui': 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'briouates': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'tagine d\'agneau': 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'salade marocaine': 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'msemen': 'https://images.pexels.com/photos/1092727/pexels-photo-1092727.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'thé à la menthe': 'https://images.pexels.com/photos/1625507/pexels-photo-1625507.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'salade césar': 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'burger classique': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            'saumon teriyaki': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        };

        return foodImages[name.toLowerCase()] || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
    };

    const isAvailable = plate.is_available !== false;

    return (
        <Link to={`/plates/${plate.id}`} className="plate-card-link">
            <div className="plate-card">
                <div className="plate-card-image">
                    <img
                        src={getFoodImage(plate.name)}
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
