import React from 'react';
import './App.css';
import Loading from './Loading';
import GitHubReposList from './GitHubReposList';
import GitHubMembersList from './GitHubMembersList';
import SearchForm from './SearchForm';
import { getMembers, getRepos } from './GitHubApi';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      members: [],
      loading: false
    };
  }
  handleSearch = async (searchValue) => {
    this.setState({ loading: true });

    let [members, repos] = await Promise.all([
      getMembers(searchValue),
      getRepos(searchValue)
    ]);

    this.setState({ members, repos, loading: false });
  }
  render() {
    return (
      <div>
        <SearchForm onSearch={this.handleSearch} />
        {this.state.loading && <Loading />}
        <div>
          <GitHubReposList repositories={this.state.repos} />
          <GitHubMembersList members={this.state.members} />
        </div>
      </div>
    );
  }
}

export default App;
