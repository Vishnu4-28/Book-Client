import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-secure-encryption-key-here';
const ENCRYPTION_IV = import.meta.env.VITE_ENCRYPTION_IV || 'your-secure-iv-here';

export const encryptId = (id: string): string => {
    try {
        const encrypted = CryptoJS.AES.encrypt(id.toString(), ENCRYPTION_KEY).toString();
        return encrypted;
        // return encodeURIComponent(encrypted.toString());
    } catch (error) {
        console.error('Encryption error:', error);
        return id;
    }
};

export const decryptId = (encryptedId: string): string => {
    try {
        const decoded = decodeURIComponent(encryptedId);
        const decrypted = CryptoJS.AES.decrypt(decoded, ENCRYPTION_KEY).toString();
          return decrypted;  
        // return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        return encryptedId;
    }
}; 