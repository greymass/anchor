// @flow
import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
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
      <React.Fragment>
        <Header>
          {t('rex_lend_about_header')}
        </Header>
        <Segment basic size="large">
          <p>{t('rex_lend_about_1')}</p>
          <p>{t('rex_lend_about_2')}</p>
        </Segment>
        <Message
          warning
        >
          {t('rex_lend_about_warning')}
        </Message>
      </React.Fragment>
    );
  }
}

export default withTranslation('rex')(RexInterfaceAbout);
