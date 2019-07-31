// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';

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

function mapStateToProps(state, ownProps) {
  const chainId = (ownProps.chainId) ? ownProps.chainId : state.settings.chainId;
  const blockchain = find(state.blockchains, { chainId });
  return {
    blockchain,
    blockExplorers: state.blockexplorers[blockchain._id],
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(GlobalBlockchainExplorerLink);
