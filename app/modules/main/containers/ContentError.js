// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import { withTranslation } from 'react-i18next';

import { Container, Form, Header, Segment } from 'semantic-ui-react';

import NavigationActions from '../actions/navigation';

const { getCurrentWindow } = require('electron').remote;

class ContentErrorContainer extends Component<Props> {
  reset = () => {
    this.props.actions.changeModule('/');
    getCurrentWindow().reload();
  };
  render = () => {
    const { t } = this.props;

    return (
      <Container fluid>
        <Segment size="large">
          <Header
            content={t('main_content_error_header')}
            subheader=""
          />
          <p>
            {t('main_content_error_paragraph_one')}
          </p>
          <p>
            {t('main_content_error_paragraph_two')}
          </p>
          <Form>
            <Form.Field>
              <label>{t('main_content_error_label')}</label>
              <Form.TextArea
                rows={12}
                style={{ whiteSpace: 'nowrap' }}
                value={this.props.error.stack}
              />
            </Form.Field>
            <Form.Button
              content={t('main_content_error_button')}
              icon="refresh"
              onClick={this.reset}
              primary
            />
          </Form>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    settings: state.settings,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions
    }, dispatch)
  };
}

export default compose(
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(ContentErrorContainer);
