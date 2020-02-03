// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Image, Label, List, Segment } from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';
import { attempt, isError } from 'lodash';

import FuelFullLogo from '../../../../../../renderer/assets/images/fuel/greymassfuel-horizontal.png';

class PromptFragmentTransactionActionFuel extends Component<Props> {
  render() {
    const {
      action,
      index,
      total,
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
            Action {index + 1} of {total}
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

export default translate('global')(PromptFragmentTransactionActionFuel);
