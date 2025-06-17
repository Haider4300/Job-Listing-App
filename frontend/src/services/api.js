const API_URL = 'http://localhost:5000';

async function handleRequest(url, method, body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_URL}${url}`, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all') params.append(key, value);
  });
  return handleRequest(`/jobs?${params.toString()}`, 'GET');
};

export const addJob = async (job) => {
  return handleRequest('/jobs', 'POST', job);
};

export const updateJob = async (id, job) => {
  return handleRequest(`/jobs/${id}`, 'PUT', job);
};

export const deleteJob = async (id) => {
  return handleRequest(`/jobs/${id}`, 'DELETE');
};