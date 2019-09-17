import React from 'react';
import './App.css';
import GitHubMembersList from './GitHubMembersList';
import GitHubReposList from './GitHubReposList';
import Loading from './Loading';
import { getMembers, getRepos } from './GitHubApi';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      members: [],
      repos: [],
      total: 0,
      searchValue: ''
    };

    this.handleClickMembers = this.fetchMembers.bind(this);
    this.handleSearch = this.fetchResults.bind(this);
  }
  async fetchMembers() {
    this.setState({ loading: true });
    let members = await getMembers('emberjs');
    this.setState({
      members,
      repos: [],
      total: members.length,
      loading: false
    });
  }
  async fetchResults(event) {
    event.preventDefault();
    this.setState({ loading: true });

    let org = this.state.searchValue;

    let [members, repos] = await Promise.all([
      getMembers(org),
      getRepos(org)
    ]);

    this.setState({ members, repos, loading: false });
  }
  fetchRepos = async () => {
    this.setState({ loading: true });
    let repos = await getRepos('emberjs');
    this.setState({
      repos,
      members: [],
      total: repos.length,
      loading: false
    });
  }
  handleSearchInputChange = (event) => {
    this.setState({ searchValue: event.target.value });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" value={this.state.searchValue} onChange={this.handleSearchInputChange} />
          <button type="submit">Search</button>
        </form>
        <p>Total Results: {this.state.total}</p>
        <GitHubMembersList members={this.state.members} />
        <GitHubReposList repos={this.state.repos} />
      </div>
    );
  }
}

export default App;
