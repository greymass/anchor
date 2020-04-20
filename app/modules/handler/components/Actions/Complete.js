// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Header, Icon } from 'semantic-ui-react';

class PromptActionComplete extends Component<Props> {
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
              {t('handler_close')}
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

export default withTranslation('global')(PromptActionComplete);
