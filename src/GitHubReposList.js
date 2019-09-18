import React from 'react';
import GitHubRepoCard from './GitHubRepoCard';

export default function GitHubReposList(props) {
  return (
    <div>
      {props.repositories.map((repo) => {
        return <GitHubRepoCard repo={repo} key={repo.id} />
      })}
    </div>
  );
}