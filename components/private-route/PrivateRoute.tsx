'use client'
import { useAuth } from '@/app/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [router, user]);

    return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;