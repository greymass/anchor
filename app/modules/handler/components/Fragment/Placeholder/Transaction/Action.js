// @flow
import React, { Component } from 'react';
import { Placeholder, Segment } from 'semantic-ui-react';

class PromptFragmentPlaceholderTransactionAction extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Placeholder
          style={{
            display: 'inline-block',
            margin: '0.142em',
            height: '2em',
            width: 150
          }}
        >
          <Placeholder.Image />
        </Placeholder>
        <Placeholder
          style={{
            display: 'inline-block',
            margin: '0.142em',
            height: '2em',
            width: 150
          }}
        >
          <Placeholder.Image />
        </Placeholder>
        <Placeholder
          style={{
            height: '10em',
            margin: '1rem 0'
          }}
        >
          <Placeholder.Image />
        </Placeholder>
        <Placeholder
          style={{
            display: 'inline-block',
            margin: '0.142em',
            height: '27px',
            width: 150
          }}
        >
          <Placeholder.Image />
        </Placeholder>
      </React.Fragment>
    );
  }
}

export default PromptFragmentPlaceholderTransactionAction;
