// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
  Header,
  Label,
  Message,
  Popup,
  Segment,
  Table
} from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';
import { sortBy } from 'lodash';

import ToolsModalBidName from './Modal/BidName';

class ToolsProxy extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false
    };
  }

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.clearTables();
  }

  tick() {
    const {
      actions,
      settings
    } = this.props;

    const {
      openModal
    } = this.state;

    const {
      getBidForName
    } = actions;

    if (!openModal) {
      (get(settings, `recentBids.${settings.chainId}.${settings.account}`) || []).forEach((bid) => {
        getBidForName(bid.newname);
      });
    }
  }

  onFetchRecentBids = (e) => {
    const  { actions } = this.props;

    const {
      getBidsForAccount
    } = actions;

    getBidsForAccount();

    e.preventDefault();
  }

  onOpenModal = () => this.setState({ openModal: true });

  onCloseModal = () => {
    this.setState({
      openModal: false
    });
  }

  onOpenModal = () => {
    this.setState({
      openModal: true
    });
  }

  render() {
    const {
      accounts,
      actions,
      balances,
      blockExplorers,
      connection,
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

    const nameBids = get(settings, `recentBids.${settings.chainId}.${settings.account}`, []) || [];
    const relevantNameBids = nameBids.filter(nameBid =>
      !nameBid.bid || (!!nameBid.highestBid && Number(nameBid.highestBid.split(' ')[0]) >= Number(nameBid.bid.split(' ')[0]))
    );

    const relevantNameBidsSorted = sortBy(relevantNameBids, 'newname');

    return (
      <Segment basic>
        <ToolsModalBidName
          account={accounts[settings.account]}
          actions={actions}
          balance={balances[settings.account]}
          blockExplorers={blockExplorers}
          connection={connection}
          keys={keys}
          nameBidToRemove={nameBidToRemove}
          onClose={this.onCloseModal}
          onOpen={this.onOpenModal}
          openModal={openModal}
          settings={settings}
          system={system}
          validate={validate}
          wallet={wallet}
        />
        <Header
          content={t('tools_bid_name_info_header')}
          floated="left"
          subheader={t('tools_bid_name_info_content')}
        />
        <Message
          content={t('tools_bid_name_message_content')}
          header={t('tools_bid_name_message_header')}
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
        <Popup
          content={(t('tools_bidname_search_button_popup'))}
          inverted
          trigger={(
            <span>
              <Button
                disabled={system.NAMEBID === 'PENDING'}
                loading={system.NAMEBID === 'PENDING'}
                onClick={this.onFetchRecentBids}
              >
                {t('tools_bidname_search_recent_bids')}
              </Button>
            </span>
          )}
        />
        {(system.NAMEBID === 'PENDING') && (
          <React.Fragment>
            {t('tools_bidname_fetching_recent_bids')}
          </React.Fragment>
        )}

        {(relevantNameBidsSorted.length === 0)
          ? (
            <Message
              content={t('tools_bid_name_none_loaded')}
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
                  <Table.HeaderCell>
                    {t('tools_bid_name_highest_bid')}
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {relevantNameBidsSorted.map((nameBid) => {
                  const isHighestBid = !nameBid.bid || (nameBid.highestBid && Number(nameBid.highestBid.split(' ')[0])) === Number(nameBid.bid.split(' ')[0]);

                  return (
                    <Table.Row key={nameBid.newname}>
                      <Table.Cell>
                        {nameBid.newname}
                      </Table.Cell>
                      <Table.Cell>
                        {nameBid.bid || nameBid.highestBid}
                      </Table.Cell>
                      <Table.Cell>
                        {nameBid.highestBid}
                      </Table.Cell>
                      <Table.Cell>
                        <Label color={isHighestBid ? 'green' : 'red'}>
                          {isHighestBid ? t('tools_bid_highest_bid') : t('tools_bid_not_highest_bid')}
                        </Label>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsProxy);
