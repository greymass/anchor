// @flow
import React, { Component } from 'react';
import { Accordion, Header, Icon, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class WalletMessageContractBase extends Component<Props> {
  state = { active: false }
  onClick = () => this.setState({ active: !this.state.active });
  render() {
    const { children, t } = this.props;
    const { active } = this.state;
    return (
      <Message color="violet" size="small">
        <Accordion fluid>
          <Accordion.Title active={active} onClick={this.onClick}>
            <Header size="small">
              <Icon name="dropdown" />
              {t('contract_terms')}
            </Header>
          </Accordion.Title>
          <Accordion.Content active={active}>
            {children}
          </Accordion.Content>
        </Accordion>
      </Message>
    );
  }
}

export default translate('contracts')(WalletMessageContractBase);
