// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ExplorerLink from '../../../../shared/components/Global/Modal/ExplorerLink';

class GlobalBlockchainExplorerLink extends PureComponent<Props> {
  render = () => (
    <ExplorerLink
      blockExplorers={this.props.blockExplorers}
      content={this.props.content}
      linkData={this.props.linkData}
      linkType={this.props.linkType}
      settings={this.props.settings}
    />
  );
}

function mapStateToProps(state) {
  return {
    blockExplorers: state.blockexplorers[state.connection.chainKey],
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(GlobalBlockchainExplorerLink);
