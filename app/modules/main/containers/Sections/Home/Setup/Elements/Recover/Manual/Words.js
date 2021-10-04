// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { range } from 'lodash';

import { Button, Dimmer, Divider, Grid, Header, Icon, Image, Loader, Modal, Segment, Table } from 'semantic-ui-react';

import GlobalFormFieldWords from '../../../../../../../../../shared/components/Global/Form/Field/Words';

class AccountSetupRecoverMnemonicWords extends Component<Props> {
  state = {
    // Whether or not the edit modal is open
    isEditing: false,
  }
  onEdit = (word, i = false) => {
    this.setState({ isEditing: false });
    this.props.onEdit(word, i);
  }
  render() {
    const {
      editable,
      words,
    } = this.props;
    const {
      isEditing
    } = this.state;
    return (
      <Grid columns={4}>
        {range(1, 29).map((c, i) => (
          <Grid.Column style={{ padding: '0.5rem 1rem' }}>
            {(editable && i in words)
              ? (
                <Modal
                  open={isEditing === i}
                  onOpen={() => this.setState({ isEditing: i })}
                  onClose={() => this.setState({ isEditing: false })}
                  trigger={(
                    <Icon
                      name="edit"
                    />
                  )}
                >
                  <Modal.Header>
                    Change Word #{c}
                  </Modal.Header>
                  <Modal.Content>
                    <p>Enter the new word and press enter.</p>
                    <GlobalFormFieldWords
                      onAdd={this.onEdit}
                      word={words[i]}
                      wordNumber={c}
                    />
                  </Modal.Content>
                </Modal>
              )
              : false
            }
            {c}. {(i in words) ? words[i] : ''}
          </Grid.Column>
        ))}
      </Grid>
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
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupRecoverMnemonicWords);
