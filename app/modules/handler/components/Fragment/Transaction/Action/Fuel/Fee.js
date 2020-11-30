// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Icon, Image, Label, Segment } from 'semantic-ui-react';

class PromptFragmentTransactionActionFuelFee extends Component<Props> {
  render() {
    const {
      action,
      index,
      total,
      t,
    } = this.props;
    console.log(this.props);
    const {
      amount,
      to,
      from,
      memo
    } = action.data;
    const [, source] = memo.split('=');
    return (
      <div key={index}>
        <Segment basic style={{ marginBottom: '0.25em' }}>
          <Label basic>
            {action.account.toString()}
            <Icon
              name="caret right"
              style={{ marginLeft: '1em' }}
            />
            {action.name.toString()}
          </Label>
          <Label>
            {t('handler_transaction_action_fuel_label_one', { index: index + 1, total })}
          </Label>
          Source: {source}
        </Segment>
      </div>
    );
  }
}

export default withTranslation('handler')(PromptFragmentTransactionActionFuelFee);
