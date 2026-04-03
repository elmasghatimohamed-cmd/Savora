import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';

export default function Profile() {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        dietary_tags: [],
        role: 'user'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    const { token, logout } = useAuth();

    const hasFetched = useRef(false); // 🔥 anti double appel

    const dietaryOptions = [
        { id: 'vegan', label: 'Vegan' },
        { id: 'no_sugar', label: 'No Sugar' },
        { id: 'no_cholesterol', label: 'No Cholesterol' },
        { id: 'gluten_free', label: 'Gluten Free' },
        { id: 'no_lactose', label: 'No Lactose' }
    ];

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await api.get('/profile');
            setProfileData(response.data);

        } catch (err) {
            if (err.response?.status === 401) {
                logout();
                navigate('/login');
            } else {
                setError('Erreur lors du chargement du profil');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTagToggle = (tag) => {
        if (!isEditing) return;

        setProfileData(prev => ({
            ...prev,
            dietary_tags: prev.dietary_tags.includes(tag)
                ? prev.dietary_tags.filter(t => t !== tag)
                : [...prev.dietary_tags, tag]
        }));
    };

    const handleUpdate = async () => {
        setUpdating(true);
        setError('');
        setSuccess('');

        try {
            await api.put('/profile', {
                dietary_tags: profileData.dietary_tags
            });

            setSuccess('Profil mis à jour avec succès');
            setIsEditing(false);

        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
        } finally {
            setUpdating(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        fetchProfile();
        setError('');
        setSuccess('');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="profile-container">
                <div className="loading">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <img
                            src={profileData.avatar || 'https://picsum.photos/seed/default-profile/150/150.jpg'}
                            alt="Profile"
                        />
                    </div>
                    <div className="profile-info">
                        <h1>{profileData.name}</h1>
                        <p className="role-badge">{profileData.role}</p>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="profile-content">
                    <div className="profile-section">
                        <h3>Personal Information</h3>
                        <p>{profileData.email}</p>
                    </div>

                    <div className="profile-section">
                        <div className="section-header">
                            <h3>Dietary Preferences</h3>

                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)}>
                                    Edit
                                </button>
                            ) : (
                                <>
                                    <button onClick={handleCancel}>Cancel</button>
                                    <button onClick={handleUpdate} disabled={updating}>
                                        {updating ? 'Saving...' : 'Save'}
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="dietary-tags">
                            {dietaryOptions.map(option => (
                                <label key={option.id}>
                                    <input
                                        type="checkbox"
                                        checked={profileData.dietary_tags.includes(option.id)}
                                        onChange={() => handleTagToggle(option.id)}
                                        disabled={!isEditing}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}