// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Message, Modal, Segment } from 'semantic-ui-react';

import GlobalModalSettingsBlockchainConfirm from './Blockchains/Confirm';
import GlobalModalSettingsBlockchainForm from './Blockchains/Form';

const initialState = {
  blockchainInfo: {
    blockchain: '',
    prefix: '',
    node: '',
    chainId:''
  },
  loading: false,
  chainExists: false
};

class GlobalModalSettingsBlockchains extends Component<Props> {
  state = initialState;
  componentWillReceiveProps(nextProps) {
    const {
      validate,
      settings
    } = this.props;

    if (validate.NODE !== 'SUCCESS' && nextProps.validate.NODE === 'SUCCESS') {
      const { blockchainInfo, loading } = this.state;
      blockchainInfo.prefix = blockchainInfo.prefix.toUpperCase();
      
      if (loading) {
        const {
          blockchains
        } = settings;

        const chain = blockchains.filter(c => c.chainId == nextProps.connection.chainId);
        if (chain.length > 0) {
          this.setState({
            chainExists: true
          });
        } else {
          this.setState({
            loading: false,
            chainExists: false,
            blockchainInfo: {
              ...blockchainInfo,
              chainId: nextProps.connection.chainId
            }
          });
        }
      }
    }
  }

  getChainInfo = () => {
    const { blockchainInfo } = this.state;
    const { actions } = this.props;

    if (blockchainInfo.node){
      actions.validateNode(blockchainInfo.node);

      this.setState({
        loading: true
      });
    }
  }
  addBlockchain = () => {
    const { actions, onClose } = this.props;
    const { blockchainInfo } = this.state;
    actions.addBlockchain(
      blockchainInfo.blockchain, 
      blockchainInfo.prefix, 
      blockchainInfo.node,
      blockchainInfo.chainId);
    this.setState({ 
      blockchainInfo: {
        blockchain: '', 
        prefix: '',
        node: '',
        chainId: ''
      }}, () => {
      onClose();
    });
  }
  onChange = (e, { name, value }) => {
    this.setState({ 
      blockchainInfo: {
        ...this.state.blockchainInfo,
        [name]: value
      }
    });
  };
  onClose = () => {
    this.setState(initialState);
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  render() {
    const {
      blockchainInfo,
      loading,
      chainExists
    } = this.state;
    const {
      open,
      settings,
      t,
      validate
    } = this.props;
    const {
      blockchains
    } = settings;
    
    return (
      <Modal
        onClose={this.onClose}
        open={open}
        size="small"
      >
        <Modal.Header>
          {t('global_modal_settings_blockchain_header')}
        </Modal.Header>
        <Modal.Content>
          <p>{t('global_modal_settings_blockchain_description')}</p>
          {(blockchainInfo.chainId !== '' && blockchainInfo.node !== '')
            ? (
              <GlobalModalSettingsBlockchainConfirm
                blockchain={blockchainInfo}
                onSubmit={this.addBlockchain}
              />
            )
            : (
              <GlobalModalSettingsBlockchainForm
                onChange={this.onChange}
                onSubmit={this.getChainInfo}
                ref={(c) => { this.form = c; }}
                values={this.state.blockchainInfo}
              />
            )
          }
          {(loading && validate.NODE === 'FAILURE')
            ? (
              <Message error icon="warning sign">
                <Header>
                  {t('global_modal_settings_blockchain_notfound_header')}
                  <Header.Subheader>
                    {t('global_modal_settings_blockchain_notfound_subheader')}
                  </Header.Subheader>
                </Header>
              </Message>
            )
            : false
          }
          {(chainExists)
            ? (
              <Message error icon="warning sign">
                <Header>
                  {t('global_modal_settings_blockchain_exists_header')}
                  <Header.Subheader>
                    {t('global_modal_settings_blockchain_exists_subheader')}
                  </Header.Subheader>
                </Header>
              </Message>
            )
            : false
          }

        </Modal.Content>
        <Modal.Actions>
          <Segment basic clearing>
            <Button
              content={t('close')}
              onClick={this.onClose}
              primary
            />
          </Segment>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('global')(GlobalModalSettingsBlockchains);
