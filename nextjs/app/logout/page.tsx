'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import pb from '@/lib/pocketbase';

export default function LogoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get('callbackUrl') || '/';

    useEffect(() => {
        pb.authStore.clear();
        router.push(callbackUrl);
    }, [router, callbackUrl]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <p>Logging out...</p>
        </div>
    );
}
