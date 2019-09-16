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
      total: 0
    };

    this.handleClickMembers = this.fetchMembers.bind(this);
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
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div>
        {/* <button onClick={this.fetchMembers.bind(this)}>Members</button> */}
        <button onClick={this.handleClickMembers}>Members</button>
        <button onClick={this.fetchRepos}>Repos</button>
        <p>Total Results: {this.state.total}</p>
        <GitHubMembersList members={this.state.members} />
        <GitHubReposList repos={this.state.repos} />
      </div>
    );
  }
}

export default App;
