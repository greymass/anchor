// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Tab } from 'semantic-ui-react';

import Tools from '../components/Tools';
import ToolsKeys from '../components/Tools/Keys';

class ToolsContainer extends Component<Props> {
  props: Props;
  render() {
    const { t } = this.props;
    const panes = [
      {
        menuItem: t('tools_menu_index'),
        render: () => <Tab.Pane><Tools {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_keys'),
        render: () => <Tab.Pane><ToolsKeys {...this.props} /></Tab.Pane>,
      }
    ];
    return (
      <Tab
        menu={{
          fluid: true,
          vertical: true,
          secondary: true,
          pointing: true
        }}
        panes={panes}
        defaultActiveIndex={0}
      />
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('tools'),
  connect(mapStateToProps, mapDispatchToProps)
)(ToolsContainer);
