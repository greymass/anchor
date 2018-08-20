// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, Message, Segment, Transition, Table } from 'semantic-ui-react';

import ExplorerLink from '../../../Global/Modal/ExplorerLink';
import ActionsTableRow from './Table/Row';

class WalletStatusActionsTable extends Component<Props> {
  render() {
    const {
      amount,
      actionHistory,
      blockExplorers,
      chain,
      settings,
      t
    } = this.props;
    const loading = (actionHistory.list.length < 1);
    let baseTable = <Table.Body />;
    if (!loading) {
      let fullResults = actionHistory.list.slice(0, amount);

      const filterSpamTransfersUnder = settings.filterSpamTransfersUnder || 0.0000;

      if (filterSpamTransfersUnder !== 0.0000) {
        fullResults = fullResults.filter(action => {
          const {
            act
          } = action.action_trace;

          if (act.name !== 'transfer') {
            return true;
          }

          const {
            from,
            quantity
          } = act.data;

          if (Number(quantity.split(' ')[0]) > filterSpamTransfersUnder || from === settings.account) {
            return true;
          }

          return false;
        });
      }

      baseTable = (
        <Table.Body key="FullResults">
          {fullResults.map((action) => (
            <ActionsTableRow
              action={action}
              blockExplorers={blockExplorers}
              chain={chain}
              key={action.account_action_seq}
              settings={settings}
            />
          ))}
        </Table.Body>
      );
    }
    return (
      <Segment basic loading={loading} vertical>
        <Message
          icon
          warning
        >
          <Icon name="warning sign" />
          <Message.Content>
            <Message.Header>
              {t('actions_table_warning_header')}
            </Message.Header>
            <p>
              {t('actions_table_warning_content')}
            </p>
            <Message.Header
              size="small"
            >
              <Header.Content>
                <ExplorerLink
                  blockExplorers={blockExplorers}
                  content={t('actions_table_view_explorer')}
                  linkData={settings.account}
                  linkType="account"
                  settings={settings}
                />
              </Header.Content>
            </Message.Header>
          </Message.Content>
        </Message>
        <Table
          attached
          size="small"
          striped
          style={{ borderRadius: 0 }}
          unstackable
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>
                {t('actions_table_header_one')}
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>
                {t('actions_table_header_two')}
              </Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>
          <Transition animation="slide down" duration={200}>
            {baseTable}
          </Transition>
        </Table>
      </Segment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTable);
