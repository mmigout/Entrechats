import { get, post, put, del } from 'aws-amplify/api';

const API_NAME = 'adherentsApi';

/**
 * Récupère tous les adhérents
 */
export const getAdherents = async () => {
  try {
    const restOperation = get({
      apiName: API_NAME,
      path: '/adherents'
    });
    const response = await restOperation.response;
    const data = await response.body.json();
    return data.adherents || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des adhérents:', error);
    throw error;
  }
};

/**
 * Crée un nouvel adhérent
 */
export const createAdherent = async (adherent) => {
  try {
    const restOperation = post({
      apiName: API_NAME,
      path: '/adherents',
      options: {
        body: adherent
      }
    });
    const response = await restOperation.response;
    const data = await response.body.json();
    return data.adherent;
  } catch (error) {
    console.error('Erreur lors de la création de l\'adhérent:', error);
    throw error;
  }
};

/**
 * Met à jour un adhérent existant
 */
export const updateAdherent = async (id, adherent) => {
  try {
    const restOperation = put({
      apiName: API_NAME,
      path: `/adherents/${id}`,
      options: {
        body: adherent
      }
    });
    const response = await restOperation.response;
    const data = await response.body.json();
    return data.adherent;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'adhérent:', error);
    throw error;
  }
};

/**
 * Supprime un adhérent
 */
export const deleteAdherent = async (id) => {
  try {
    const restOperation = del({
      apiName: API_NAME,
      path: `/adherents/${id}`
    });
    const response = await restOperation.response;
    await response.body.json();
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'adhérent:', error);
    throw error;
  }
};
