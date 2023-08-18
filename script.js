const fetchButton = document.getElementById('fetchButton');
const repositoryList = document.getElementById('repositoryList');

fetchButton.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  if (username) {
    repositoryList.innerHTML = 'Fetching repositories...';
    const response = await fetchRepositories(username);
    displayRepositories(response);
  } else {
    repositoryList.innerHTML = 'Please enter a username.';
  }
});

async function fetchRepositories(username) {
  const apiKey = '94727c0938msh21ff4614b2de0d1p12a2ddjsne6b846c1f726';
  const apiUrl = `https://github-repos.p.rapidapi.com/search?user=${username}`;
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'github-repos.p.rapidapi.com'
    }
  });
  
  return await response.json();
}

function displayRepositories(data) {
  repositoryList.innerHTML = '';

  if (data && data.repositories) {
    data.repositories.forEach(repo => {
      const repositoryItem = document.createElement('div');
      repositoryItem.classList.add('repository-item');

      const repositoryName = document.createElement('div');
      repositoryName.classList.add('repository-name');
      repositoryName.textContent = repo.name;

      const repositoryDescription = document.createElement('div');
      repositoryDescription.classList.add('repository-description');
      repositoryDescription.textContent = repo.description || 'No description available';

      const repositoryButton = document.createElement('a');
      repositoryButton.classList.add('button');
      repositoryButton.textContent = 'View Repository';
      repositoryButton.href = repo.url;
      repositoryButton.target = '_blank';

      repositoryItem.appendChild(repositoryName);
      repositoryItem.appendChild(repositoryDescription);
      repositoryItem.appendChild(repositoryButton);

      repositoryList.appendChild(repositoryItem);
    });
  } else {
    repositoryList.innerHTML = 'No repositories found.';
  }
}
