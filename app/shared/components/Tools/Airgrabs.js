// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { orderBy } from 'lodash';
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

const blackListedMethodAttributes = ['to', 'from'];
const whiteListedMethods = ['claim', 'open', 'signup'];

class ToolsAirgrabs extends PureComponent<Props> {
  state = {
    abis: {},
    claimingAirgrab: false,
  };
  componentDidMount() {
    this.fetchAirgrabsData();
  }

  componentDidUpdate(prevProps) {
    const { app, settings } = this.props;

    const currentAirgrabs = get(app, 'constants.airgrabs') || [];
    const prevAirgrabs = get(prevProps.app, 'constants.airgrabs') || [];

    if (
      currentAirgrabs.length !== prevAirgrabs.length
      || settings.account !== prevProps.settings.account
      || settings.chainId !== prevProps.settings.chainId
    ) {
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
    const { actions, app, settings, tables, validate } = this.props;

    if (validate.NODE === 'SUCCESS') {
      actions.getConstants();

      const airgrabs = get(app, 'constants.airgrabs') || [];

      airgrabs.forEach((airgrab) => {

        const airgrabAccounts = get(tables, `${airgrab.account}.${settings.account}.accounts.rows`) || [];
        if (airgrabAccounts.length > 0) {
          return;
        }
        actions.getTable(airgrab.account, settings.account, 'accounts');
      });
    }
  };

  render() {
    const {
      app,
      actions,
      blockExplorers,
      pubkeys,
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

    const airgrabs = get(app, 'constants.airgrabs') || [];


    const filtered = airgrabs.filter((airgrab) => {
      const methodWhiteListed = whiteListedMethods.includes(airgrab.method);
      const noAttributesBlackListed =
        Object.keys(airgrab.methodAttributes).filter(attribute => {
          return blackListedMethodAttributes.includes(attribute);
        }).length === 0;
      const airgrabStarted = !airgrab.startTime || new Date(airgrab.startTime) < new Date();
      const airgrabEnded = new Date(airgrab.endTime) < new Date();
      const matchesSearchQuery = !searchQuery ||
        (airgrab.symbol &&
        airgrab.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (airgrab.account &&
          airgrab.symbol.toLowerCase().includes(searchQuery.toLowerCase()));

      return methodWhiteListed && noAttributesBlackListed &&
        airgrabStarted && !airgrabEnded && matchesSearchQuery;
    });
    const filteredAirgrabs = orderBy(filtered, ['symbol']);
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        {claimingAirgrab && (
          <ToolsModalAirgrab
            actions={actions}
            airgrab={claimingAirgrab}
            blockExplorers={blockExplorers}
            pubkeys={pubkeys}
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
        <Segment style={{ marginTop: '60px', marginBottom: '10px' }} basic>
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
              <Table.HeaderCell textAlign="center">
                <Button
                  size="mini"
                  style={{ pointerEvents: 'auto' }}
                  loading={system.GETCONSTANTS === 'PENDING'}
                  onClick={this.fetchConstants}
                  content={t('tools_airgrabs_refresh')}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('tools_airgrabs_account')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('tools_airgrabs_until')}
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                {t('tools_airgrabs_unclaimed')}
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredAirgrabs.map((airgrab) => {
              const airgrabAccounts = get(tables, `${airgrab.account}.${settings.account}.accounts.rows`) || [];
              const unclaimedBalance = (airgrabAccounts && airgrabAccounts.length && airgrabAccounts[0].claimed === 0);
              const claimed = (airgrabAccounts.length > 0 && !unclaimedBalance);
              return (
                <Table.Row key={airgrab.symbol}>
                  <Table.Cell>
                    <Header size="small">
                      {airgrab.symbol}
                      <Header.Subheader>
                        <DangerLink
                          content={airgrab.url}
                          link={airgrab.url}
                          settings={settings}
                        />
                      </Header.Subheader>
                    </Header>
                  </Table.Cell>
                  <Table.Cell
                    content={airgrab.account}
                  />
                  <Table.Cell
                    content={airgrab.endTime ?
                      new Date(airgrab.endTime).toLocaleDateString('en-US') :
                      t('tools_airgrabs_unknown_date')
                    }
                  />
                  <Table.Cell
                    collapsing
                    content={unclaimedBalance ?
                      airgrabAccounts[0].balance :
                      '~'
                    }
                    textAlign="right"
                  />
                  <Table.Cell
                    collapsing
                    textAlign="right"
                  >
                    <Button
                      disabled={claimed}
                      color={claimed ? 'grey' : 'blue'}
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
