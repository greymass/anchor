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
import DangerLink from '../Global/Modal/DangerLink';
import ToolsModalAirgrab from './Modal/Airgrab';

class ToolsAirgrabs extends PureComponent<Props> {
  state = {
    claimingAirgrab: false
  };
  componentDidMount() {
    this.fetchAirgrabsData();
  }

  componentDidUpdate(prevProps) {
    const { app, settings } = this.props;

    const currentAirgrabs = get(app, `constants.airdrops.${settings.account}`) || [];
    const prevAirgrabs = get(prevProps.app, `constants.airdrops.${settings.account}`) || [];

    if (currentAirgrabs.length !== prevAirgrabs.length) {
      this.fetchAirgrabsData();
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.clearTables();
  }

  fetchConstants = () => {
    const { actions } = this.props;

    actions.getConstants();
  };

  fetchAirgrabsData = () => {
    const { actions, settings, tables } = this.props;

    const airgrabs = get(app, `constants.airdrops.${settings.chainId}`) || [];

    airgrabs.forEach((airgrab) => {
      const airgrabAccounts = get(tables, `${airgrab.account}.${settings.account}.accounts.rows`) || [];
      if (airgrabAccounts.length > 0) {
        return;
      }
      actions.getTable(airgrab.account, settings.account, 'accounts');
    });
  };

  render() {
    const {
      app,
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

    const airgrabs = get(app, `constants.airdrops.${settings.chainId}`) || [];

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
        <Segment style={{ marginTop: '60px', marginBottom: '10px' }}basic>
          <Message
            textAlign="left"
            content={
              <React.Fragment>
                {t('tools_airgrab_anything_missing')}
                &nbsp;
                <DangerLink
                  content={'https://t.me/eoswalletgreymass'}
                  link={'https://t.me/eoswalletgreymass'}
                  settings={settings}
                />
              </React.Fragment>
            }
            warning
          />
        </Segment>
        <Table definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Button
                onClick={this.fetchConstants}
                content={t('tools_airgrabs_reload')}
              />
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
