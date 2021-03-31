// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Checkbox, Icon, Header, List, Segment } from 'semantic-ui-react';
import { isEmpty, sum, sumBy } from 'lodash';

import { retryWithFee } from '../../../../../actions/fuel';
import { setSetting } from '../../../../../actions/settings';

class GlobalTransactionMessageErrorResourceUsage extends PureComponent<Props> {
  componentDidMount = () => {
    const { fuel, settings, system } = this.props;
    if (settings.transactionFees) {
      this.props.actions.retryWithFee(system.latestFailure, fuel.alternative.request);
    }
  }
  toggle = (e, { checked }) => {
    this.props.actions.setSetting('transactionFees', checked);
  }
  prompt = () => {
    const { fuel, system } = this.props;
    this.props.actions.retryWithFee(system.latestFailure, fuel.alternative.request);
  }
  render() {
    const {
      fuel,
      system,
      t
    } = this.props;
    const canProceedWithFee = (fuel && fuel.alternative && fuel.alternative.request && fuel.alternative.request.code === 402);
    return (
      <Segment basic>
        <Header
          content="Transaction Fee"
          icon="stop"
          size="large"
          subheader="Your account lacks the network resources for this transaction to succeed."
        />
        <Segment stacked size="large" textAlign="center">
          <p>To perform this transaction, you will either need to pay a fee or use the Resources section of the wallet to manage your account resources.</p>
          <Header
            content={fuel.alternative.request.data.fee}
            subheader="Transaction Fee"
          />
          <Button
            content={`Proceed with ${fuel.alternative.request.data.fee} fee`}
            onClick={this.prompt}
            primary
            size="large"
          />
          <div style={{ margin: '1em 0' }}>
            <Checkbox
              label="Automatically display fee-based transactions."
              onChange={this.toggle}
              size="large"
            />
          </div>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  fuel: state.fuel,
  settings: state.settings,
  system: state.system,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      retryWithFee,
      setSetting,
    }, dispatch)
  };
}

export default compose(
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalTransactionMessageErrorResourceUsage);
