import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const dietaryOptions = [
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten_free', label: 'Gluten Free' },
    { id: 'dairy_free', label: 'Dairy Free' },
    { id: 'nut_free', label: 'Nut Free' },
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' }
];

const registerSchema = z
    .object({
        name: z.string().min(1, 'Le nom est requis'),
        email: z.string().email('Email invalide'),
        password: z.string().min(8, 'Minimum 8 caractères'),
        confirmPassword: z.string().min(8, 'Confirmation requise'),
        dietary_tags: z.array(z.string()).optional()
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Les mots de passe doivent correspondre'
            });
        }
    });

export default function Register() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting }
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            dietary_tags: []
        }
    });

    const onSubmit = async (data) => {
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    dietary_tags: data.dietary_tags ?? []
                })
            });

            const responseData = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setError(responseData.message || 'Registration failed');
            }
        } catch {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Join Savora today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className={errors.name ? 'invalid' : ''}
                            {...register('name')}
                            placeholder="Enter your full name"
                        />
                        {errors.name && <p className="field-error">{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className={errors.email ? 'invalid' : ''}
                            {...register('email')}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="field-error">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={errors.password ? 'invalid' : ''}
                            {...register('password')}
                            placeholder="Create a password (min 8 characters)"
                        />
                        {errors.password && <p className="field-error">{errors.password.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={errors.confirmPassword ? 'invalid' : ''}
                            {...register('confirmPassword')}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="field-error">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Dietary Preferences (Optional)</label>
                        <div className="dietary-tags">
                            {dietaryOptions.map((option) => (
                                <label key={option.id} className="tag-checkbox">
                                    <input
                                        type="checkbox"
                                        value={option.id}
                                        {...register('dietary_tags')}
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
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <a href="/login">Sign In</a></p>
                </div>
            </div>
        </div>
    );
}
