'use client';

import { Wrench } from "lucide-react";;
import { useRouter } from 'next/navigation';

export default function UnderConstruction() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <Wrench className="text-6xl text-yellow-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Under Construction</h1>
                <p className="text-gray-600 mb-6">This page is currently under development.</p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
