// @flow
import React, { Component } from 'react';
import { Accordion, Header, Icon, Message } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

export class GlobalMessageContractBase extends Component<Props> {
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
              <React.Fragment>
                <Icon name="dropdown" />
                {t('contract_terms')}
              </React.Fragment>
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

export default withTranslation('contracts')(GlobalMessageContractBase);
