// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
  Header,
  Message,
  Segment,
  Table
} from 'semantic-ui-react';
import { sortBy } from 'lodash';

import ToolsModalBidName from './Modal/BidName';

class ToolsProxy extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false
    };
  }

  onOpenModal = () => this.setState({ openModal: true });

  onCloseModal = () => {
    this.setState({
      openModal: false
    });
  }

  render() {
    const {
      accounts,
      actions,
      balances,
      blockExplorers,
      keys,
      settings,
      system,
      validate,
      wallet,
      t
    } = this.props;

    const {
      nameBidToRemove,
      openModal,
      successMessage
    } = this.state;

    const nameBids = settings.recentBids && settings.recentBids[settings.account];

    return (
      <Segment basic>
        <ToolsModalBidName
          account={accounts[settings.account]}
          actions={actions}
          balance={balances[settings.account]}
          blockExplorers={blockExplorers}
          nameBidToRemove={nameBidToRemove}
          keys={keys}
          onClose={this.onCloseModal}
          openModal={openModal}
          settings={settings}
          system={system}
          validate={validate}
          wallet={wallet}
        />
        <Header
          content={t('tools_bid_name_header_text')}
          floated="left"
          subheader={t('tools_bid_name_subheader_text')}
        />
        <Message
          content={t('tools_bid_name_info_content')}
          header={t('tools_bid_name_info_header')}
          icon="circle question"
          info
        />
        {(successMessage)
          ? (
            <Message
              content={t(successMessage)}
              success
            />
          ) : false }
        <h2>
          {t('tools_bid_name_table_header')}
        </h2>

        {(!nameBids || nameBids.length === 0)
          ? (
            <Message
              content={t('tools_bid_name_none')}
              warning
            />
          ) : (
            <Table>
              <Table.Header>
                <Table.Row key="tools_contacts_headers">
                  <Table.HeaderCell>
                    {t('tools_bid_name_newname')}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {t('tools_bid_name_bid')}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {nameBids.map((nameBid) => (
                  <Table.Row>
                    <Table.Cell>
                      {nameBid.newname}
                    </Table.Cell>
                    <Table.Cell>
                      {nameBid.bid}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsProxy);
