// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Icon, Image, Label, Segment } from 'semantic-ui-react';

import FuelFullLogo from '../../../../../../renderer/assets/images/fuel/greymassfuel-horizontal.png';

class PromptFragmentTransactionActionFuel extends Component<Props> {
  render() {
    const {
      action,
      index,
      total,
      t,
    } = this.props;
    return (
      <div key={index}>
        <Segment basic style={{ marginBottom: '0.5em' }}>
          <Label basic>
            {action.account}
            <Icon
              name="caret right"
              style={{ marginLeft: '1em' }}
            />
            {action.name}
          </Label>
          <Label>
            {t('handler_fuel_label_one', { index: index + 1, total })}
          </Label>
          <Image
            centered
            floated="right"
            src={FuelFullLogo}
            style={{
              height: '32px',
              margin: 0
            }}
          />
        </Segment>
      </div>
    );
  }
}

export default withTranslation('global')(PromptFragmentTransactionActionFuel);
