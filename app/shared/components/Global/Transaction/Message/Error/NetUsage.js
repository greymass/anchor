import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, List, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

export class GlobalTransactionMessageErrorNetUsage extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;
    return (
      <Segment basic color="red" size="large">
        <Header size="medium">
          <Icon name="warning sign" />
          <Header.Content>
            Insufficient Network Resources (NET)
            <Header.Subheader>
              This account currently lacks the required staked EOS to perform this transaction.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <p>Before trying this transaction again, address this issue by taking one or more of the following steps:</p>
        <List relaxed bulleted>
          <List.Item>Enable Greymass Fuel from the upper right menu and try again.</List.Item>
          <List.Item>Rent more NET via REX using the Resources interface and try again.</List.Item>
          <List.Item>Stake more EOS as NET using the Resources interface and try again.</List.Item>
          <List.Item>Wait for your existing NET to replenish within the next 24 hours.</List.Item>
        </List>
        {(typeof error === 'object' && error.json) ? (
          <ReactJson
            collapsed={1}
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={error.json.error}
            style={{ padding: '1em' }}
          />
        ) : ''}
      </Segment>
    );
  }
}

export default translate('global')(GlobalTransactionMessageErrorNetUsage);
