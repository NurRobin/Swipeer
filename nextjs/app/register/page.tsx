'use client';
import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-secondary)] py-12 px-4">
            <div className="w-full max-w-lg bg-[var(--background-primary)] rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                {/* Dekorative Elemente */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary-color)] to-transparent opacity-10 rounded-bl-full -z-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--secondary-color)] to-transparent opacity-10 rounded-tr-full -z-10"></div>
                
                <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">
                    Registrierung
                </h1>
                <p className="text-[var(--text-secondary)] mb-6">Erstelle ein neues Konto und starte mit Swipeer.</p>
                <RegisterForm />
            </div>
        </div>
    );
}