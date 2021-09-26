// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { pullAll, sampleSize, shuffle } from 'lodash';

import { Card, Label, Header, Segment } from 'semantic-ui-react';

import { wordlist } from './Wordlist';

class AccountSetupElementsWordsConfirm extends Component<Props> {
  constructor(props) {
    super(props);
    const { words } = props;
    const reducedList = [...wordlist];
    pullAll(reducedList, words);
    const random = sampleSize(reducedList, 6);
    const mixed = shuffle([
      ...words,
      ...random,
    ]);
    this.state = {
      index: 0,
      mixed,
      selected: [],
      words: this.props.words,
    };
  }
  check = (index, word) => {
    const { words } = this.state;
    if (words[index] === word) {
      this.setState({
        index: this.state.index + 1,
        selected: [...this.state.selected, word],
      }, () => {
        if (this.state.selected.length === 6) {
          this.props.onVerified();
        }
      });
    }
  }
  render() {
    const { index, mixed, selected } = this.state;
    return (
      <React.Fragment>
        <Header size="large">
          Verify your encryption key
        </Header>
        <p>Click to select your encryption keywords in order to make sure you wrote them down correctly.</p>
        <Segment secondary>
          <Header>
            {(index >= 6)
              ? (
                <span>Word verified!</span>
              )
              : (
                <span>Select word #{index + 1}...</span>
              )
            }
          </Header>
          <Card.Group itemsPerRow={3}>
            {mixed.map((word, i) => {
              const isSelected = selected.includes(word);
              const selectedIndex = selected.indexOf(word) + 1;
              return (
                <Card key={word}>
                  <Card.Content
                    style={{
                      cursor: 'pointer',
                      padding: 0
                    }}
                    onClick={() => this.check(index, word)}
                  >
                    <Label
                      color={isSelected ? 'blue' : 'grey'}
                      size="large"
                      style={{
                          marginRight: '1em',
                          lineHeight: '1.4285em',
                      }}
                    >
                      {(isSelected)
                        ? (
                          <span>{selectedIndex}</span>
                        )
                        : (
                          <span>&nbsp;</span>
                        )
                      }
                    </Label>
                    <div
                      style={{
                        display: 'inline-block',
                        fontSize: '1.25em',
                        fontWeight: 'bold',
                      }}
                    >
                      {word}
                    </div>
                  </Card.Content>
                </Card>
            );
            })}
          </Card.Group>
        </Segment>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupElementsWordsConfirm);
