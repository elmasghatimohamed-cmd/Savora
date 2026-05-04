import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(8, 'Minimum 8 caractères')
});

export default function Login() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, error: authError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting }
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        setError('');

        try {
            await login(data.email, data.password);
            navigate('/plates');
        } catch (err) {
            const message = err?.response?.data?.message || authError || 'Login failed';
            setError(message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your Savora account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="field-error">{errors.password.message}</p>}
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <a href="/register">Sign Up</a></p>
                    <p><a href="/forgot-password" className="forgot-password">Forgot your password?</a></p>
                </div>
            </div>
        </div>
    );
}
