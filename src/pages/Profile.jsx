import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';
import { useProfile, useUpdateProfile } from '../hooks/useProfile';

export default function Profile() {
    const navigate = useNavigate();
    const { logout, updateUser } = useAuth();
    const { data: profileData, isLoading, error: profileError } = useProfile();
    const updateProfileMutation = useUpdateProfile();

    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({
        name: '',
        email: '',
        dietary_tags: [],
        role: 'user',
    });

    const dietaryOptions = [
        { id: 'vegan', label: 'Vegan' },
        { id: 'no_sugar', label: 'No Sugar' },
        { id: 'no_cholesterol', label: 'No Cholesterol' },
        { id: 'gluten_free', label: 'Gluten Free' },
        { id: 'no_lactose', label: 'No Lactose' },
    ];

    useEffect(() => {
        if (!profileData) return;

        setProfileForm({
            name: profileData.name || '',
            email: profileData.email || '',
            dietary_tags: Array.isArray(profileData.dietary_tags) ? profileData.dietary_tags : [],
            role: profileData.role || 'user',
        });
    }, [profileData]);

    const handleTagToggle = (tag) => {
        if (!isEditing) return;

        setProfileForm((prev) => ({
            ...prev,
            dietary_tags: prev.dietary_tags.includes(tag)
                ? prev.dietary_tags.filter((t) => t !== tag)
                : [...prev.dietary_tags, tag],
        }));
    };

    const handleUpdate = async () => {
        try {
            await updateProfileMutation.mutateAsync({
                dietary_tags: profileForm.dietary_tags,
            });

            const meResponse = await api.get('/me');
            updateUser(meResponse.data);

            toast.success('Profil mis à jour avec succès');
            setIsEditing(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Erreur lors de la mise à jour');
            setProfileForm((prev) => ({
                ...prev,
                dietary_tags: profileData?.dietary_tags || prev.dietary_tags,
            }));
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setProfileForm({
            name: profileData?.name || '',
            email: profileData?.email || '',
            dietary_tags: profileData?.dietary_tags || [],
            role: profileData?.role || 'user',
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (isLoading) {
        return (
            <div className="profile-container">
                <div className="loading">Loading profile...</div>
            </div>
        );
    }

    if (profileError) {
        return (
            <div className="profile-container">
                <div className="error-message">Erreur lors du chargement du profil</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <img
                            src={profileData?.avatar || 'https://picsum.photos/seed/default-profile/150/150.jpg'}
                            alt="Profile"
                        />
                    </div>
                    <div className="profile-info">
                        <h1>{profileData?.name}</h1>
                        <p className="role-badge">{profileData?.role}</p>
                    </div>
                </div>

                <div className="profile-content">
                    <div className="profile-section">
                        <h3>Personal Information</h3>
                        <p>{profileData?.email}</p>
                    </div>

                    <div className="profile-section">
                        <div className="section-header">
                            <h3>Dietary Preferences</h3>

                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                            ) : (
                                <>
                                    <button onClick={handleCancel}>Cancel</button>
                                    <button
                                        onClick={handleUpdate}
                                        disabled={updateProfileMutation.isLoading}
                                    >
                                        {updateProfileMutation.isLoading ? 'Saving...' : 'Save'}
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="dietary-tags">
                            {dietaryOptions.map((option) => (
                                <label key={option.id}>
                                    <input
                                        type="checkbox"
                                        checked={profileForm.dietary_tags.includes(option.id)}
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