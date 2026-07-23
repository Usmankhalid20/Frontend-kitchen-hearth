import apiClient from './apiClient';

export const generateRecipe = async (prompt) => {
    const response = await apiClient.post('/ai/generate', { prompt });
    return response.data;
};
