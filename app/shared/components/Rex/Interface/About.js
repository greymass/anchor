// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Header,
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
        <Header
          warning
        >
          <Header.Subheader>
            {t('rex_interface_about_message')}
          </Header.Subheader>
        </Header>
        <Message
          warning
        >
          {t('rex_interface_about_warning')}
        </Message>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceAbout);
