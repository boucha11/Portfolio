// src/api/projectsApi.js 
const API_URL = 'https://694be681da5ddabf00358f9d.mockapi.io/projet';

export async function getProjects() { const res = await
fetch(API_URL);
if (!res.ok) { throw new Error('Error loading projects');
} return res.json();
}

export async function createProject(project) { const res = await
fetch(API_URL, { method: 'POST'

, headers: { 'Content-Type':

'application/json' }, body: JSON.stringify(project), });
if (!res.ok) { throw new Error('Error creating project');
}
return res.json();} export async function updateProject(id, project) {
const res = await fetch(`${API_URL}/${id}`, { method: 'PUT'

, headers: {
'Content-Type': 'application/json' }, body: JSON.stringify(project), });
if (!res.ok) { throw new Error('Error updating project');
} return res.json();}

export async function deleteProject(id) { const res = await
fetch(`${API_URL}/${id}`, { method: 'DELETE'
, });

if (!res.ok) { throw new Error('Error deleting project');
} return true;
}