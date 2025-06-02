import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// Types pour la validation
export interface ValidationResult {
  success: boolean;
  data?: any;
  errors?: string[];
}

export interface SecurityAuditLog {
  timestamp: string;
  event: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  ip?: string;
  userId?: string;
}

// Schémas de validation Zod pour les données communes
export const emailSchema = z.string()
  .email('Email invalide')
  .min(5, 'Email trop court')
  .max(100, 'Email trop long')
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format email invalide');

export const passwordSchema = z.string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .max(128, 'Mot de passe trop long')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre');

export const nameSchema = z.string()
  .min(2, 'Nom trop court')
  .max(50, 'Nom trop long')
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères invalides');

export const phoneSchema = z.string()
  .regex(/^(?:\+33|0)[1-9](?:[0-9]{8})$/, 'Numéro de téléphone invalide');

export const addressSchema = z.string()
  .min(5, 'Adresse trop courte')
  .max(200, 'Adresse trop longue')
  .regex(/^[a-zA-Z0-9À-ÿ\s,.-]+$/, 'Adresse contient des caractères invalides');

export const postalCodeSchema = z.string()
  .regex(/^[0-9]{5}$/, 'Code postal invalide (5 chiffres requis)');

// Schémas composés
export const userRegistrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  phone: phoneSchema.optional(),
  address: addressSchema.optional(),
  postalCode: postalCodeSchema.optional(),
  city: nameSchema.optional(),
});

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(5, 'Sujet trop court').max(100, 'Sujet trop long'),
  message: z.string().min(10, 'Message trop court').max(1000, 'Message trop long'),
});

export const donationSchema = z.object({
  amount: z.number().min(1, 'Montant minimum 1€').max(10000, 'Montant maximum 10 000€'),
  frequency: z.enum(['onetime', 'monthly']),
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  address: addressSchema.optional(),
  postalCode: postalCodeSchema.optional(),
  city: nameSchema.optional(),
});

// Classe principale de sécurité
export class SecurityValidator {
  private static auditLogs: SecurityAuditLog[] = [];
  
  // Logging de sécurité
  static logSecurityEvent(
    event: string, 
    severity: SecurityAuditLog['severity'], 
    details: string,
    ip?: string,
    userId?: string
  ) {
    const log: SecurityAuditLog = {
      timestamp: new Date().toISOString(),
      event,
      severity,
      details,
      ip,
      userId
    };
    
    this.auditLogs.push(log);
    
    // Logger en console selon la sévérité
    const logMessage = `🔒 [SECURITY-${severity.toUpperCase()}] ${event}: ${details}`;
    switch (severity) {
      case 'critical':
      case 'high':
        console.error(logMessage);
        break;
      case 'medium':
        console.warn(logMessage);
        break;
      default:
        console.log(logMessage);
    }
    
    // Garder seulement les 1000 derniers logs
    if (this.auditLogs.length > 1000) {
      this.auditLogs = this.auditLogs.slice(-1000);
    }
  }
  
  // Sanitisation HTML
  static sanitizeHtml(input: string): string {
    if (typeof input !== 'string') return '';
    
    // Configuration stricte de DOMPurify
    const clean = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p'],
      ALLOWED_ATTR: [],
      FORBID_ATTR: ['style', 'class', 'id'],
      FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style', 'img'],
    });
    
    if (clean !== input) {
      this.logSecurityEvent(
        'HTML_SANITIZATION',
        'medium',
        `HTML potentiellement malveillant détecté et nettoyé`
      );
    }
    
    return clean;
  }
  
  // Validation et sanitisation des entrées
  static validateAndSanitize<T>(
    data: unknown,
    schema: z.ZodSchema<T>,
    options: { sanitizeHtml?: boolean; logValidation?: boolean } = {}
  ): ValidationResult {
    try {
      // Sanitisation HTML si demandée
      if (options.sanitizeHtml && typeof data === 'object' && data !== null) {
        data = this.sanitizeObjectStrings(data);
      }
      
      // Validation avec Zod
      const result = schema.safeParse(data);
      
      if (!result.success) {
        const errors = result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        
        if (options.logValidation) {
          this.logSecurityEvent(
            'VALIDATION_FAILED',
            'low',
            `Erreurs de validation: ${errors.join(', ')}`
          );
        }
        
        return {
          success: false,
          errors
        };
      }
      
      return {
        success: true,
        data: result.data
      };
      
    } catch (error) {
      this.logSecurityEvent(
        'VALIDATION_ERROR',
        'high',
        `Erreur lors de la validation: ${error}`
      );
      
      return {
        success: false,
        errors: ['Erreur de validation interne']
      };
    }
  }
  
  // Sanitisation récursive des chaînes dans un objet
  private static sanitizeObjectStrings(obj: any): any {
    if (typeof obj === 'string') {
      return this.sanitizeHtml(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObjectStrings(item));
    }
    
    if (typeof obj === 'object' && obj !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = this.sanitizeObjectStrings(value);
      }
      return sanitized;
    }
    
    return obj;
  }
  
  // Détection de tentatives d'injection SQL
  static detectSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /(\b(OR|AND)\s+['"]\s*['"]\s*=\s*['"])/gi,
      /(\b1\s*=\s*1\b)|(\b1\s*=\s*'1'\b)/gi,
      /(--|#|\/\*|\*\/)/g,
      /(\bUNION\s+SELECT\b)/gi,
      /(\bINTO\s+OUTFILE\b)/gi
    ];
    
    const found = sqlPatterns.some(pattern => pattern.test(input));
    
    if (found) {
      this.logSecurityEvent(
        'SQL_INJECTION_ATTEMPT',
        'critical',
        `Tentative d'injection SQL détectée: ${input.substring(0, 100)}`
      );
    }
    
    return found;
  }
  
  // Détection de tentatives XSS
  static detectXSS(input: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b/gi,
      /<object\b/gi,
      /<embed\b/gi,
      /expression\s*\(/gi,
      /vbscript:/gi
    ];
    
    const found = xssPatterns.some(pattern => pattern.test(input));
    
    if (found) {
      this.logSecurityEvent(
        'XSS_ATTEMPT',
        'critical',
        `Tentative XSS détectée: ${input.substring(0, 100)}`
      );
    }
    
    return found;
  }
  
  // Validation stricte pour les champs sensibles
  static validateSensitiveField(
    value: string, 
    fieldName: string,
    allowedPattern?: RegExp
  ): ValidationResult {
    // Vérifications de sécurité
    if (this.detectSQLInjection(value)) {
      return {
        success: false,
        errors: [`Le champ ${fieldName} contient des caractères interdits`]
      };
    }
    
    if (this.detectXSS(value)) {
      return {
        success: false,
        errors: [`Le champ ${fieldName} contient du contenu potentiellement dangereux`]
      };
    }
    
    // Validation du pattern si fourni
    if (allowedPattern && !allowedPattern.test(value)) {
      return {
        success: false,
        errors: [`Le champ ${fieldName} ne respecte pas le format requis`]
      };
    }
    
    return {
      success: true,
      data: this.sanitizeHtml(value)
    };
  }
  
  // Obfuscation des données sensibles pour les logs
  static obfuscate(data: string, type: 'email' | 'phone' | 'card' = 'email'): string {
    switch (type) {
      case 'email':
        const [local, domain] = data.split('@');
        if (!local || !domain) return '***@***.***';
        return `${local.charAt(0)}***@${domain}`;
        
      case 'phone':
        return data.replace(/(\d{2})(\d+)(\d{2})/, '$1***$3');
        
      case 'card':
        return data.replace(/(\d{4})(\d+)(\d{4})/, '$1****$3');
        
      default:
        return '***';
    }
  }
  
  // Récupération des logs de sécurité (pour l'admin)
  static getSecurityLogs(limit: number = 100): SecurityAuditLog[] {
    return this.auditLogs.slice(-limit);
  }
  
  // Nettoyage des logs anciens
  static clearOldLogs(olderThanDays: number = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
    
    this.auditLogs = this.auditLogs.filter(log => 
      new Date(log.timestamp) > cutoffDate
    );
  }
}

// Utilitaires de chiffrement simple (pour les données non-critiques)
export class SimpleEncryption {
  private static readonly SECRET_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production';
  
  // Encodage Base64 simple (pour les données non-sensibles)
  static encode(text: string): string {
    try {
      return Buffer.from(text, 'utf-8').toString('base64');
    } catch {
      return text;
    }
  }
  
  static decode(encoded: string): string {
    try {
      return Buffer.from(encoded, 'base64').toString('utf-8');
    } catch {
      return encoded;
    }
  }
  
  // Hash simple pour les identifiants (non réversible)
  static hash(text: string): string {
    // Note: En production, utilisez bcrypt pour les mots de passe
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }
}

// Export des utilitaires pour l'utilisation dans l'app
export const validateEmail = (email: string) => 
  SecurityValidator.validateAndSanitize(email, emailSchema);

export const validatePassword = (password: string) => 
  SecurityValidator.validateAndSanitize(password, passwordSchema);

export const validateContactForm = (data: unknown) => 
  SecurityValidator.validateAndSanitize(data, contactFormSchema, { sanitizeHtml: true, logValidation: true });

export const validateDonation = (data: unknown) => 
  SecurityValidator.validateAndSanitize(data, donationSchema, { sanitizeHtml: true, logValidation: true });

export const validateUserRegistration = (data: unknown) => 
  SecurityValidator.validateAndSanitize(data, userRegistrationSchema, { sanitizeHtml: true, logValidation: true }); 