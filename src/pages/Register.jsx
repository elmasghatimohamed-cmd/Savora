import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dietary_tags: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const dietaryOptions = [
        { id: 'vegan', label: 'Vegan' },
        { id: 'vegetarian', label: 'Vegetarian' },
        { id: 'gluten_free', label: 'Gluten Free' },
        { id: 'dairy_free', label: 'Dairy Free' },
        { id: 'nut_free', label: 'Nut Free' },
        { id: 'halal', label: 'Halal' },
        { id: 'kosher', label: 'Kosher' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTagToggle = (tag) => {
        setFormData(prev => ({
            ...prev,
            dietary_tags: prev.dietary_tags.includes(tag)
                ? prev.dietary_tags.filter(t => t !== tag)
                : [...prev.dietary_tags, tag]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error. Please try again.', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Join Savora today</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Create a password (min 6 characters)"
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <label>Dietary Preferences (Optional)</label>
                        <div className="dietary-tags">
                            {dietaryOptions.map(option => (
                                <label key={option.id} className="tag-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={formData.dietary_tags.includes(option.id)}
                                        onChange={() => handleTagToggle(option.id)}
                                    />
                                    <span className="tag-label">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <a href="/login">Sign In</a></p>
                </div>
            </div>
        </div>
    );
}
