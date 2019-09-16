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
      loading: true
    };
  }
  async componentDidMount() {
    let [members, repos] = await Promise.all([
      getMembers('emberjs'),
      getRepos('emberjs')
    ]);

    this.setState({ members, repos, loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div>
        <p>{this.state.members.length} Members of Ember.js</p>
        <GitHubMembersList members={this.state.members} />
        <GitHubReposList repos={this.state.repos} />
      </div>
    );
  }
}

export default App;
