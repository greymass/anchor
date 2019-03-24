// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Message,
  Segment
} from 'semantic-ui-react';

class RexInterfaceAbout extends PureComponent<Props> {
  render() {
    const {
      t
    } = this.props;

    return (
      <Segment basic>
        <Message
          warning
        >
          {t('rex_interface_about_message')}
        </Message>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceAbout);
