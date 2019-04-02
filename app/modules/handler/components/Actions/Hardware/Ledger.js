// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon } from 'semantic-ui-react';

class PromptActionHardwareLedger extends Component<Props> {
  render() {
    const {
      onClick,
      t,
    } = this.props;
    return (
      <Button
        color="blue"
        content={(
          <Header
            style={{ color: '#ececec' }}
            textAlign="left"
          >
            <Icon name="x" />
            <Header.Content>
              <Header.Subheader>

              </Header.Subheader>
              Close
            </Header.Content>
          </Header>
        )}
        floated="right"
        onClick={onClick}
        style={{ minHeight: '58px' }}
      />
    );
  }
}

export default translate('global')(PromptActionHardwareLedger);
