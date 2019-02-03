// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
  Header, Input,
  Segment,
  Table
} from 'semantic-ui-react';

import ToolsModalAirgrab from './Modal/Airgrab';

const airgrabs = [
  {
    symbol: 'ATD',
    account: 'eosatidiumio',
    method: 'signup',
    description: 'Payments & Budget Management Decentralized App Leveraging the Blockchain, Cryptocurrency and AI Technologies. Drops happen every 24 hours, Airgrab Today!',
    url: 'https://www.atidium.io/',
    startDate: '2019-02-02T22:40:49+00:00',
    endDate: '2019-03-02T22:40:49+00:00'
  },
  {
    symbol: 'BRM',
    account: 'openbrmeos11',
    method: 'open',
    description: 'Very First Open source Billing and Revenue Management on Blockchain. OpenBRM is a carrier-grade billing platform aimed at telecommunications, Subscription, Utilities and logistics organizations.',
    url: 'https://openbrm.io',
    startDate: '2019-02-02T22:40:49+00:00',
    endDate: '2019-02-12T22:40:49+00:00'
  }
];

class ToolsAirgrabs extends PureComponent<Props> {
  state = {
    claimingAirgrab: false
  };
  render() {
    const {
      actions,
      blockExplorers,
      settings,
      system,
      t
    } = this.props;
    const {
      claimingAirgrab,
      searchQuery
    } = this.state;
    return (
      <Segment basic>
        {claimingAirgrab && (
          <ToolsModalAirgrab
            actions={actions}
            airgrab={claimingAirgrab}
            blockExplorers={blockExplorers}
            onClose={() => this.setState({ claimingAirgrab: false })}
            settings={settings}
            system={system}
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
            {(airgrabs.filter((airgrab) => {
              return !searchQuery ||
                (airgrab.symbol &&
                  airgrab.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (airgrab.account &&
                  airgrab.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
            }).map((airgrab) => {
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
                      content={airgrab.endDate && new Date(airgrab.endDate).toLocaleDateString('en-US')}
                    />
                    <Table.Cell
                      textAlign="right"
                    >
                      <Button
                        onClick={() => this.setState({ claimingAirgrab: airgrab })}
                        content={t('tools_airgrabs_claim')}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              }))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsAirgrabs);
