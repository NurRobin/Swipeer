import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg auto-shadow">
                <h1 className="text-3xl font-bold text-center text-gray-900">Register</h1>
                <RegisterForm />
            </div>
        </div>
    );
}