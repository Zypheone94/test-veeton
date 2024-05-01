async function api({ request_type, request_url, request_body, setter }) {
    try {
      const response = await fetch(request_url, {
        method: request_type,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request_body),
      });
  
      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
      }
  
      const data = await response.json();
  
      if (typeof setter === 'function') {
        setter({ status: response.status, data: data });
      }

      return { status: response.status, data: data }

    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      throw error;
    }
  }
  
  export default api;
  