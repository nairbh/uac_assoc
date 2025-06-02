'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  showStrength?: boolean;
  className?: string;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Mot de passe",
  label,
  required = false,
  showStrength = false,
  className = ""
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Validation du mot de passe
  const isValidLength = value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumbers = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const getStrengthScore = () => {
    let score = 0;
    if (isValidLength) score++;
    if (hasUpperCase) score++;
    if (hasLowerCase) score++;
    if (hasNumbers) score++;
    if (hasSpecialChar) score++;
    return score;
  };

  const getStrengthText = () => {
    const score = getStrengthScore();
    if (score < 2) return { text: 'Très faible', color: 'text-red-600' };
    if (score < 3) return { text: 'Faible', color: 'text-orange-600' };
    if (score < 4) return { text: 'Moyen', color: 'text-yellow-600' };
    if (score < 5) return { text: 'Fort', color: 'text-blue-600' };
    return { text: 'Très fort', color: 'text-green-600' };
  };

  const getStrengthBarColor = () => {
    const score = getStrengthScore();
    if (score < 2) return 'bg-red-500';
    if (score < 3) return 'bg-orange-500';
    if (score < 4) return 'bg-yellow-500';
    if (score < 5) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Validation minimum 8 caractères */}
      {value.length > 0 && !isValidLength && (
        <p className="mt-1 text-sm text-red-600">
          Le mot de passe doit contenir au moins 8 caractères
        </p>
      )}

      {/* Indicateur de force du mot de passe */}
      {showStrength && value.length > 0 && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Force du mot de passe :</span>
            <span className={`text-sm font-medium ${getStrengthText().color}`}>
              {getStrengthText().text}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getStrengthBarColor()}`}
              style={{ width: `${(getStrengthScore() / 5) * 100}%` }}
            ></div>
          </div>

          <div className="mt-2 text-xs text-gray-600">
            <div className="grid grid-cols-2 gap-1">
              <div className={isValidLength ? 'text-green-600' : 'text-gray-400'}>
                ✓ Au moins 8 caractères
              </div>
              <div className={hasUpperCase ? 'text-green-600' : 'text-gray-400'}>
                ✓ Une majuscule
              </div>
              <div className={hasLowerCase ? 'text-green-600' : 'text-gray-400'}>
                ✓ Une minuscule
              </div>
              <div className={hasNumbers ? 'text-green-600' : 'text-gray-400'}>
                ✓ Un chiffre
              </div>
              <div className={hasSpecialChar ? 'text-green-600' : 'text-gray-400'}>
                ✓ Un caractère spécial
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 