import React from 'react';
import './App.css';
import Loading from './Loading';
import GitHubReposList from './GitHubReposList';
import GitHubMembersList from './GitHubMembersList';
import { getMembers, getRepos } from './GitHubApi';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      members: [],
      loading: false
    };

    this.handleClickReposButton = this.fetchRepos.bind(this);
  }
  async fetchRepos() {
    this.setState({ loading: true });
    let repos = await getRepos('emberjs');
    this.setState({ repos, loading: false, members: [] });
  }
  fetchMembers = async () => {
    this.setState({ loading: true });
    let members = await getMembers('emberjs');
    this.setState({ members, loading: false, repos: [] });
  }
  render() {
    return (
      <div>
        {this.state.loading && <Loading />}
        <button onClick={this.handleClickReposButton}>Repos</button>
        <button onClick={this.fetchMembers}>Members</button>
        <div>
          <GitHubReposList repositories={this.state.repos} />
          <GitHubMembersList members={this.state.members} />
        </div>
      </div>
    );
  }
}

export default App;
