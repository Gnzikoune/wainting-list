import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

interface EmailFormProps {
  onSubmit: (email: string) => void;
  isSubmitted: boolean;
}

export const EmailForm: React.FC<EmailFormProps> = ({ onSubmit, isSubmitted }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Veuillez entrer votre email');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Veuillez entrer un email valide');
      return;
    }
    
    setError('');
    onSubmit(email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl 
                      text-white placeholder-white/70 outline-none ring-0
                      border ${error ? 'border-red-400' : 'border-white/20'} 
                      focus:border-white/40 transition duration-200`}
          disabled={isSubmitted}
        />
        {error && (
          <p className="text-sm text-red-300 mt-2 mb-2">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitted}
        className={`w-full px-6 py-3 rounded-xl flex items-center justify-center
                    ${isSubmitted ? 'bg-green-500' : 'bg-white/20 hover:bg-white/30'} 
                    backdrop-blur-sm border border-white/20 hover:border-white/40
                    text-white font-medium transition-all duration-200
                    shadow-sm hover:shadow-md transform hover:-translate-y-0.5`}
      >
        {isSubmitted ? (
          <>
            <Check className="w-5 h-5 mr-2" /> Merci !
          </>
        ) : (
          <>
            Rejoindre <Send className="ml-2 w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};