// @flow
import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Header,
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
          {t('rex_rent_about_header')}
        </Header>
        <Segment basic size="large">
          {t('rex_rent_about_subheader')}
        </Segment>
      </React.Fragment>
    );
  }
}

export default withTranslation('rex')(RexInterfaceAbout);
