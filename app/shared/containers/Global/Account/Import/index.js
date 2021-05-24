// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Segment, Tab } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import { setSetting } from '../../../../../shared/actions/settings';
import { swapBlockchain } from '../../../../../shared/actions/blockchains';

import GlobalFragmentChainLogo from '../../../../../shared/components/Global/Fragment/ChainLogo';
import GlobalModalAccountImportCold from '../../../../../shared/containers/Global/Account/Import/Cold';
import GlobalModalAccountImportCreate from '../../../../../shared/containers/Global/Account/Import/Create';
import GlobalModalAccountImportDetect from '../../../../../shared/containers/Global/Account/Import/Detect';
import GlobalModalAccountImportExisting from '../../../../../shared/containers/Global/Account/Import/Existing';
import GlobalModalAccountImportWelcome from '../../../../../shared/containers/Global/Account/Import/Welcome';

class GlobalAccountImport extends Component<Props> {
  state = {
    activeIndex: 0
  }
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
  getPanes = () => {
    const {
      initializing,
      settings,
      storage,
      t
    } = this.props;
    const panes = [];

    const welcome = {
      menuItem: {
        key: 'welcome',
        icon: 'home',
        // content: t('global_modal_account_import_welcome_wallet'),
      },
      render: () => <GlobalModalAccountImportWelcome onTabChange={this.handleTabChange} onClose={this.props.onClose} />
    };

    const existing = {
      menuItem: {
        key: 'existing',
        icon: 'id card',
        content: t('global_modal_account_import_existing_account'),
      },
      render: () => <GlobalModalAccountImportExisting onTabChange={this.handleTabChange} onClose={this.props.onClose} />
    };

    const create = {
      menuItem: {
        key: 'create',
        icon: 'user plus',
        content: t('global_modal_account_import_create_account'),
        style: {
          display: 'none'
        }
      },
      render: () => <GlobalModalAccountImportCreate onTabChange={this.handleTabChange} onClose={this.props.onClose} />
    };

    const detect = {
      menuItem: {
        key: 'detect',
        icon: 'search',
        disabled: !(storage.keys && storage.keys.length),
        content: t('global_modal_account_import_existing_wallet'),
      },
      render: () => <GlobalModalAccountImportDetect onClose={this.props.onClose} />
    };

    const coldWallet = {
      menuItem: {
        key: 'cold',
        icon: 'snowflake',
        content: t('global_modal_account_import_cold_wallet'),
      },
      render: () => <GlobalModalAccountImportCold onClose={this.props.onClose} />
    };

    switch (settings.walletMode) {
      case 'cold': {
        panes.push(coldWallet);
        break;
      }
      default: {
        if (initializing) {
          panes.push(
            welcome,
            create,
            existing,
          );
        } else {
          panes.push(
            welcome,
            create,
            existing,
            detect,
          );
        }
        break;
      }
    }

    return panes;
  };
  render() {
    const { activeIndex } = this.state;
    const { connection, t } = this.props;
    const panes = this.getPanes();
    return (
      <React.Fragment>
        <Segment
          attached="top"
          style={{ marginTop: 0 }}
        >
          <Header
            size="large"
          >
            <GlobalFragmentChainLogo
              chainId={connection.chainId}
              noPopup
              size="medium"
              style={{
                verticalAlign: 'top'
              }}
            />
            <Header.Content>
              {t('global_import_index_header_one', { connectionChain: connection.chain })}
              <Header.Subheader>
                {t('global_import_index_subheader_one')}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
        <Tab
          activeIndex={activeIndex}
          attached
          defaultActiveIndex={0}
          menu={{
            attached: true,
            fluid: true,
            pointing: true,
            secondary: true,
            style: {
              margin: 0,
              borderTop: 'none'
            }
          }}
          onTabChange={this.handleTabChange}
          panes={panes}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    initializing: !(state.storage.keys && state.storage.keys.length),
    settings: state.settings,
    storage: state.storage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSetting,
      swapBlockchain,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountImport);
