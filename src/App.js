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
      loading: false,
      searchValue: ''
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
  handleSearchInputChange = (event) => {
    this.setState({
      searchValue: event.target.value
    });
  }
  handleSearch = async (event) => {
    event.preventDefault();
    console.log(this.state.searchValue);
    this.setState({ loading: true });

    let [members, repos] = await Promise.all([
      getMembers(this.state.searchValue),
      getRepos(this.state.searchValue)
    ]);

    this.setState({ members, repos, loading: false });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input
            type="text"
            value={this.state.searchValue}
            onChange={this.handleSearchInputChange} />
          <button type="submit">Search</button>
        </form>
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
