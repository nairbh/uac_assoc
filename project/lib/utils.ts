import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction utilitaire pour l'affichage des noms d'utilisateur
export function formatUserName(firstName: string | null | undefined, lastName: string | null | undefined, email?: string | null | undefined): string {
  // Si on a les deux noms et qu'ils ne sont pas null/undefined
  if (firstName && lastName && firstName !== 'null' && lastName !== 'null') {
    return `${firstName} ${lastName}`;
  }
  
  // Si on a seulement le prénom
  if (firstName && firstName !== 'null') {
    return firstName;
  }
  
  // Si on a seulement le nom
  if (lastName && lastName !== 'null') {
    return lastName;
  }
  
  // Valeur par défaut plus générique
  return 'Membre';
}

// Fonction pour obtenir les initiales d'un utilisateur
export function getUserInitials(firstName: string | null | undefined, lastName: string | null | undefined, email?: string | null | undefined): string {
  // Si on a les deux noms et qu'ils ne sont pas null
  if (firstName && lastName && firstName !== 'null' && lastName !== 'null') {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  
  // Si on a seulement le prénom
  if (firstName && firstName !== 'null') {
    return firstName.substring(0, 2).toUpperCase();
  }
  
  // Si on a seulement le nom
  if (lastName && lastName !== 'null') {
    return lastName.substring(0, 2).toUpperCase();
  }
  
  // Valeur par défaut
  return 'ME';
}