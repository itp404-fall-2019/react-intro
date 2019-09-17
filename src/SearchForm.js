import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: '' };
  }
  handleSearchInputChange = (event) => {
    this.setState({ searchValue: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchValue);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.searchValue} onChange={this.handleSearchInputChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}