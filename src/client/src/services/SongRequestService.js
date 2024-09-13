const mockApiDelay = 1000;
const MAX_REQUESTS_PER_USER = 3;
const REQUEST_COOLDOWN = 15 * 60 * 1000; // 15 minutos en milisegundos

let userRequests = {};
let requestQueue = [];

export const submitSongRequest = async (request, userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userRequests[userId]) {
        userRequests[userId] = [];
      }

      // Limpiar solicitudes antiguas
      const now = Date.now();
      userRequests[userId] = userRequests[userId].filter(
        req => now - req.timestamp < REQUEST_COOLDOWN
      );

      if (userRequests[userId].length >= MAX_REQUESTS_PER_USER) {
        reject({ 
          status: 'error', 
          message: `Has alcanzado el límite de ${MAX_REQUESTS_PER_USER} solicitudes en 15 minutos. Por favor, espera antes de hacer otra solicitud.` 
        });
      } else if (Math.random() > 0.1) { // 90% de probabilidad de éxito
        userRequests[userId].push({ timestamp: now });
        const newRequest = { id: Date.now(), ...request, status: 'pending' };
        requestQueue.push(newRequest);
        resolve({ status: 'success', message: 'Solicitud enviada con éxito' });
      } else {
        reject({ status: 'error', message: 'Error al enviar la solicitud' });
      }
    }, mockApiDelay);
  });
};

export const getRemainingRequests = (userId) => {
  if (!userRequests[userId]) {
    return MAX_REQUESTS_PER_USER;
  }

  const now = Date.now();
  const activeRequests = userRequests[userId].filter(
    req => now - req.timestamp < REQUEST_COOLDOWN
  );

  return Math.max(0, MAX_REQUESTS_PER_USER - activeRequests.length);
};

export const getRequestQueue = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(requestQueue.filter(req => req.status === 'pending'));
    }, 500);
  });
};

export const updateRequestStatus = async (requestId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = requestQueue.findIndex(req => req.id === requestId);
      if (index !== -1) {
        requestQueue[index].status = status;
        if (status === 'accepted' || status === 'rejected') {
          requestQueue.splice(index, 1);
        }
      }
      resolve({ status: 'success', message: 'Estado de la solicitud actualizado' });
    }, 500);
  });
};