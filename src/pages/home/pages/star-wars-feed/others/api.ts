import axios from 'axios';

/**
 * Initialisation de la communication avec l'API
 */
export const api = axios.create({
    baseURL: 'https://swapi.dev/api/',
});
