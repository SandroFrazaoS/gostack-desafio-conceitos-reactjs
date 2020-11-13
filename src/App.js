import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

import Header from './components/Header';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo Repository ${Date.now()}`,
      url: 'https://github.com/SandroFrazaoS', 
      techs: ['Node.js', 'ReacrJS']
    });

    const repository = response.data;
    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
        repository => repository.id != id));
  }

  return (
    <>
      <Header title="Homepage"/>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
             </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
