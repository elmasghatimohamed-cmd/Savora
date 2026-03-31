import React from 'react';

export default function PlateCard({ name, price, description }) {
    return (
        <div className="plate-card">
            <span className="badge available">Disponible</span>
            <h3 className="name">{name}</h3>
            <p className="desc">{description}</p>
            <p className="price">{price} MAD</p>
        </div>
    );
}