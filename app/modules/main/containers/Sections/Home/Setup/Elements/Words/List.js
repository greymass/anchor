// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Card, Label } from 'semantic-ui-react';

class AccountSetupElementsWordsList extends Component<Props> {
  render() {
    const { words } = this.props;
    return (
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
)(AccountSetupElementsWordsList);
