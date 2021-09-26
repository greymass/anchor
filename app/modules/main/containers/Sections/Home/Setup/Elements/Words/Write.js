// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Card, Header, Label, Segment } from 'semantic-ui-react';

class AccountSetupElementsWordsWrite extends Component<Props> {
  render() {
    const { words } = this.props;
    return (
      <React.Fragment>
        <Header size="large">
          Write encryption key
          <Header.Subheader />
        </Header>
        <p>Write down these six words <strong>on the certificate</strong> you just printed out and <strong>keep it safe</strong>.</p>
        <Segment secondary>
          <Card.Group itemsPerRow={3}>
            {words.map((word, index) => (
              <Card key={word}>
                <Card.Content style={{ padding: 0 }}>
                  <Label
                    color="blue"
                    size="large"
                    style={{
                        marginRight: '1em',
                        lineHeight: '1.4285em',
                    }}
                  >
                    {index + 1}
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
          ))}
          </Card.Group>
        </Segment>
        <p>You will need both the encryption key (these six words) and the backup sheet in order to recover your account.</p>
        <p><em>Tip: Use a ballpoint pen or a permanant marker.</em></p>
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
)(AccountSetupElementsWordsWrite);
