// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Grid, Header, Icon, Image, Label, Segment } from 'semantic-ui-react';

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
      <Grid key={index}>
        <Grid.Row columns={2}>
          <Grid.Column>
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
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Header block>
              Network Resources Provided by...
            </Header>
            <Segment basic>
              <Image
                centered
                src={FuelFullLogo}
                style={{
                  height: '48px',
                }}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withTranslation('handler')(PromptFragmentTransactionActionFuel);
