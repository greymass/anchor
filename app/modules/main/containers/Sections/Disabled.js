// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { withTranslation } from 'react-i18next';

import { Segment } from 'semantic-ui-react';

class VersionContainer extends Component<Props> {
  render() {
    const { t } = this.props;

    return (
      <Segment>
        {t('main_components_disabled_segment')}
      </Segment>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(VersionContainer);
