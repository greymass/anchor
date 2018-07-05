// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';
import { Header, Icon, Segment } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import DangerLink from '../../../../../Global/Modal/DangerLink';

class WalletStatusActionsTableRowGeneric extends Component<Props> {
  render() {
    const {
      action,
      t
    } = this.props;
    const {
      act
    } = action.action_trace;
    return (
      <React.Fragment>
        <Segment attached="top" clearing size="small" tertiary>
          <Header
            floated="right"
            size="tiny"
            style={{ margin: 0 }}
          >
            <TimeAgo date={`${action.block_time}z`} />
            {' - '}
            <DangerLink
              content={t('actions_link_content')}
              link={`https://eospark.com/MainNet/tx/${action.trx_id}`}
            />
          </Header>
          <Header
            floated="left"
            size="tiny"
          >
            <Icon name="clipboard outline" />
            {`${act.account}   ${act.name}`}
          </Header>
        </Segment>
        <ReactJson
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          name={null}
          src={act.data}
          style={{ padding: '1em' }}
          theme="harmonic"
        />
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowGeneric);
