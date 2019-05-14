// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Label, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class PromptFragmentTransactionAction extends Component<Props> {
  render() {
    const {
      action,
      index,
      t,
    } = this.props;
    return (
      <Segment secondary key={index}>
        <Label basic size="large">
          #1
        </Label>
        <Label color="blue" size="large">
          Contract
          <Label.Detail>{action.account}</Label.Detail>
        </Label>
        <Label color="blue" size="large">
          Action
          <Label.Detail>{action.name}</Label.Detail>
        </Label>
        <Segment inverted>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            name={null}
            src={action.data}
            style={{ padding: '0.5em' }}
            theme="harmonic"
          />
        </Segment>
        {action.authorization.map((auth, idx) => (
          <Label basic key={`${idx}@${auth.actor}@${auth.permission}`}>
            <Icon name="pencil" />
            Authorization:
            <Label.Detail>
              {auth.actor}@{auth.permission}
            </Label.Detail>
          </Label>
        ))}
      </Segment>
    );
  }
}

export default translate('global')(PromptFragmentTransactionAction);
