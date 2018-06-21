// @flow
import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

type Props = {
  action: {}
};

export default class GlobalTransactionViewAction extends Component<Props> {
  props: Props;
  render() {
    const {
      action
    } = this.props;
    return (
      <React.Fragment>
        <Label color="grey" size="large" ribbon>
          <Icon name="clipboard outline" />
          {action.account}
          <Label.Detail>{action.name}</Label.Detail>
        </Label>
        <ReactJson
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          name={null}
          src={action}
          style={{ padding: '1em' }}
          theme="harmonic"
        />
      </React.Fragment>
    );
  }
}
