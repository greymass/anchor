// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Segment } from 'semantic-ui-react';

class GovernenceDisabled extends Component<Props> {
  render() {
    const { t } = this.props;
    
    return (
      <Segment>
        {t('main_components_governance_disabled_header')}
      </Segment>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GovernenceDisabled);
