// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon } from 'semantic-ui-react';

class PromptActionCancel extends Component<Props> {
  render() {
    const {
      onClick,
      t,
    } = this.props;
    return (
      <Button
        content={(
          <Header
            textAlign="left"
          >
            <Icon name="x" />
            <Header.Content>
              <Header.Subheader>

              </Header.Subheader>
              Cancel
            </Header.Content>
          </Header>
        )}
        onClick={onClick}
        style={{ minHeight: '58px' }}
      />
    );
  }
}

export default translate('global')(PromptActionCancel);
