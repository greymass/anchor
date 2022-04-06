// @flow
import React, { Component } from 'react';
import { Form, Input, Search } from 'semantic-ui-react';
import { debounce, filter } from 'lodash';


import { wordlist } from '../../../../../modules/main/containers/Sections/Home/Setup/Elements/Words/Wordlist';

export default class GlobalFormFieldWords extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      words: [],
    };
  }
  onSearch = (e, { value }) => {
    const matches = filter(wordlist, (w) => w.startsWith(value));
    const words = matches.map(w => ({
      title: w
    }));
    this.setState({
      value,
      words,
    });
  }
  onAdd = (e, data) => {
    this.props.onAdd(data.result.title, this.props.wordNumber);
    this.setState({
      value: undefined,
      words: [],
    });
  }
  render() {
    const {
      loading,
      placeholder,
      wordNumber,
    } = this.props;
    const {
      value,
      words
    } = this.state;
    return (
      <Search
        autoFocus
        loading={loading}
        key={value}
        onResultSelect={this.onAdd}
        onSearchChange={this.onSearch}
        placeholder={(wordNumber) ? `Enter ${ordinal(wordNumber)} word...` : 'Enter word...'}
        results={words}
        selectFirstResult
        value={value}
      />
    );
  }
}

function ordinal(number) {
  const suffix = ['th', 'st', 'nd', 'rd'];
  const value = number % 100;
  return number + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
}
