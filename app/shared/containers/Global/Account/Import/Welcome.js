// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Header, Icon, Segment, Tab } from 'semantic-ui-react';

class GlobalModalAccountImportWelcome extends Component<Props> {
  render() {
    const {
      connection,
      storage,
      t,
    } = this.props;
    return (
      <Tab.Pane>
        <Segment basic style={{ display: 'none' }}>
          <Header
            content={t('global_account_import_welcome_header_three')}
            subheader={t('global_account_import_welcome_subheader_three')}
          />
          <Button
            color="blue"
            content={t('global_account_import_welcome_button_three')}
            icon="user plus"
            onClick={() => this.props.onTabChange(null, { activeIndex: 1 })}
          />
        </Segment>
        <Segment basic>
          <Header
            content={t('global_account_import_welcome_header_two')}
            subheader={t('global_account_import_welcome_subheader_two')}
          />
          <Button
            color="blue"
            content={t('global_account_import_welcome_button_two')}
            icon="id card"
            onClick={() => this.props.onTabChange(null, { activeIndex: 2 })}
          />
        </Segment>
        <Segment basic>
          <Header
            content={t('global_account_import_welcome_header_one')}
            subheader={t('global_account_import_welcome_subheader_one', { connectionChain: connection.chain })}
          />
          {(!(storage.keys && storage.keys.length))
            ? (
              <p>
                <Icon color="grey" name="info circle" />
                {t('global_account_import_welcome_paragraph')}
              </p>
            )
            : false
          }
          <Button
            color="blue"
            content={t('global_account_import_welcome_button_one')}
            disabled={!(storage.keys && storage.keys.length)}
            icon="search"
            onClick={() => this.props.onTabChange(null, { activeIndex: 3 })}
          />
        </Segment>
      </Tab.Pane>
    );
  }
}


function mapStateToProps(state) {
  return {
    connection: state.connection,
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
