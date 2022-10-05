import cryptoJS from 'crypto-js/core'
import CryptoAES from'crypto-js/aes';

export function cryptText(data) {
    return CryptoAES.encrypt(data, import.meta.env.VITE_CRYPTO_PWD).toString(); 
}

export function decryptText(data) {
    var bytes = CryptoAES.decrypt(data, import.meta.env.VITE_CRYPTO_PWD);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export function cryptObject(data) {
    return CryptoAES.encrypt(JSON.stringify(data), import.meta.env.VITE_CRYPTO_PWD).toString();
}

export function decryptObject(data) {
    var bytes = CryptoAES.decrypt(data, import.meta.env.VITE_CRYPTO_PWD);
    return decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

