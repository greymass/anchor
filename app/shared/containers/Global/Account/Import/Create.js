// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Header, Segment, Tab } from 'semantic-ui-react';

import GlobalModalAccountImportRequest from './Request';
import GlobalModalAccountImportContractsSetupAccount from './Contracts';

class GlobalModalAccountImportWelcome extends Component<Props> {
  state = {
    pane: false
  };
  onClose = () => this.setState({ pane: false })
  onClick = (e, { pane }) => this.setState({ pane })
  render() {
    const {
      t,
    } = this.props;
    const {
      pane,
    } = this.state;
    if (pane) {
      switch (pane) {
        case 'request':
          return <GlobalModalAccountImportRequest onClose={this.onClose} />;
        case 'contract':
          return <GlobalModalAccountImportContractsSetupAccount onClose={this.onClose} />;
        default:
          break;
      }
    }
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content={t('global_import_create_header_two')}
            subheader={t('global_import_create_subheader_two')}
          />
          <Button
            color="blue"
            content={t('global_import_create_button_two')}
            icon="user"
            pane="request"
            onClick={this.onClick}
          />
        </Segment>
        <Segment basic style={{ display: 'none' }}>
          <Header
            content={t('global_import_create_header_one')}
            subheader={t('global_import_create_subheader_one')}
          />
          <Button
            color="blue"
            content={t('global_import_create_button_one')}
            icon="user"
            pane="contract"
            onClick={this.onClick}
          />
        </Segment>
      </Tab.Pane>
    );
  }
}


function mapStateToProps(state) {
  return {
    storage: state.storage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withTranslation('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportWelcome);
