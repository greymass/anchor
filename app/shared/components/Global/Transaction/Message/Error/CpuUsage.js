import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Header, Icon, List, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

export class GlobalTransactionMessageErrorCpuUsage extends Component<Props> {
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
            Insufficient Network Resources (CPU)
            <Header.Subheader>
              This account currently lacks the required network resources to perform this transaction.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <p>Address this issue by performing one of the following, then try again:</p>
        <List relaxed bulleted>
          <List.Item>Rent more CPU using the Resources interface and try again.</List.Item>
          <List.Item>Wait for your existing CPU to replenish within the next 24 hours.</List.Item>
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

export default withTranslation('global')(GlobalTransactionMessageErrorCpuUsage);
