// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import DangerLink from '../../../shared/components/Global/Modal/DangerLink';

class GlobalBlockchainDangerLink extends PureComponent<Props> {
  render = () => (
    <DangerLink
      content={this.props.content}
      link={this.props.link}
      settings={this.props.settings}
    />
  );
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(GlobalBlockchainDangerLink);
