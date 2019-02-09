// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import {
  Button,
  Header,
  Input,
  Message,
  Segment,
  Table
} from 'semantic-ui-react';

import ToolsModalAirgrab from './Modal/Airgrab';

const airgrabs = [
  {
    symbol: 'ATD',
    account: 'eosatidiumio',
    method: 'signup',
    methodAttributes: {
      owner: '{account}',
      quantity: '0.0000 ATD'
    },
    description: 'Payments & Budget Management Decentralized App Leveraging the Blockchain, Cryptocurrency and AI Technologies. Drops happen every 24 hours, Airgrab Today!',
    url: 'https://www.atidium.io/',
    startTime: '2019-02-02T22:40:49+00:00',
    endTime: '2019-03-20T22:40:49+00:00'
  },
  {
    symbol: 'BRM',
    account: 'openbrmeos11',
    method: 'open',
    methodAttributes: {
      owner: '{account}',
      quantity: '0.0000 BRM',
      ram_payer: '{account}'
    },
    description: 'Very First Open source Billing and Revenue Management on Blockchain. OpenBRM is a carrier-grade billing platform aimed at telecommunications, Subscription, Utilities and logistics organizations.',
    url: 'https://openbrm.io'
  },
  {
    symbol: 'NEB',
    account: 'nebulatokenn',
    method: 'open',
    methodAttributes: {
      owner: '{account}',
      symbol: '0.0000 NEB',
      ram_payer: '{account}'
    },
    description: 'Nebula is a decentralized, curated list of professionals and job opportunities.',
    url: 'https://nebulaprotocol.com'
  },
  {
    symbol: 'POOR',
    account: 'poormantoken',
    method: 'signup',
    methodAttributes: {
      owner: '{account}',
      quantity: '0.0000 POOR'
    },
    description: 'A reward for people who STAKE and VOTE for EOS Block Producers with MONTHLY drops.',
    url: 'https://eostoolkit.io/airgrab',
  },
  {
    symbol: 'WIZZ',
    account: 'wizznetwork1',
    method: 'signup',
    methodAttributes: {
      owner: '{account}',
      quantity: '0.0000 WIZZ'
    },
    description: 'Modern Decentralized Ecosystem, Built on EOSIO. Tools, Rewards, Chat, and more. AIGRAB NOW!',
    url: 'https://wizz.network',
  },
];

class ToolsAirgrabs extends PureComponent<Props> {
  state = {
    claimingAirgrab: false
  };
  componentDidMount() {
    const { actions, settings, tables } = this.props;

    airgrabs.forEach((airgrab) => {
      const airgrabAccounts = get(tables, `${airgrab.account}.${settings.account}.accounts.rows`) || [];
      if (airgrabAccounts.length > 0) {
        return;
      }
      actions.getTable(airgrab.account, settings.account, 'accounts');
    });
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.clearTables();
  }

  render() {
    const {
      actions,
      blockExplorers,
      keys,
      settings,
      system,
      t,
      tables,
      validate,
      wallet
    } = this.props;
    const {
      claimingAirgrab,
      searchQuery
    } = this.state;

    const filteredAirgrabs = airgrabs.filter((airgrab) => {
      const airgrabStarted = !airgrab.startTime || new Date(airgrab.startTime) < new Date();
      const airgrabEnded = new Date(airgrab.endTime) < new Date();
      const matchesSearchQuery = !searchQuery ||
        (airgrab.symbol &&
        airgrab.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (airgrab.account &&
          airgrab.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
      return airgrabStarted && !airgrabEnded && matchesSearchQuery;
    });
    return (
      <Segment basic>
        {claimingAirgrab && (
          <ToolsModalAirgrab
            actions={actions}
            airgrab={claimingAirgrab}
            blockExplorers={blockExplorers}
            keys={keys}
            onClose={() => this.setState({ claimingAirgrab: false })}
            settings={settings}
            system={system}
            validate={validate}
            wallet={wallet}
          />
          )}
        <Header floated="left">
          {t('tools_airgrabs_header')}
          <Header.Subheader>
            {t('tools_airgrabs_subheader')}
          </Header.Subheader>
        </Header>
        <Segment
          basic
          floated="right"
          style={{ margin: 0 }}
        >
          <Input
            floated="right"
            placeholder={t('tools_airgrabs_search_placeholder')}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
          />
        </Segment>
        <Table definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>
                {t('tools_airgrabs_account')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('tools_airgrabs_until')}
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredAirgrabs.map((airgrab) => {
              const airgrabAccounts = get(tables, `${airgrab.account}.${settings.account}.accounts.rows`) || [];
              const claimed = airgrabAccounts.length > 0;
              return (
                <Table.Row key={airgrab.symbol}>
                  <Table.Cell>
                    <Header
                      content={airgrab.symbol}
                      size="small"
                    />
                  </Table.Cell>
                  <Table.Cell
                    content={airgrab.account}
                  />
                  <Table.Cell
                    content={airgrab.endTime && new Date(airgrab.endTime).toLocaleDateString('en-US')}
                  />
                  <Table.Cell
                    textAlign="right"
                  >
                    <Button
                      disabled={claimed}
                      onClick={() => this.setState({ claimingAirgrab: airgrab })}
                      content={claimed ? t('tools_airgrabs_already_claimed') : t('tools_airgrabs_claim')}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        {filteredAirgrabs.length === 0 && (
          <Message
            content={t('tools_airgrabs_no_match')}
            warning
          />
        )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsAirgrabs);
