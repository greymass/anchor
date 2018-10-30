// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Icon, Segment, Header, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';
const CryptoJS = require('crypto-js');

import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
import GlobalFormFieldToken from '../../../../Global/Form/Field/Token';
import FormMessageError from '../../../../Global/Form/Message/Error';
import GovernanceProposalsFormProposalConfirming from './Proposal/Confirming';

import ipfs from '../../../../../actions/helpers/ipfs';

const formAttributes = ['title', 'ipfs_location', 'amount', 'send_to', 'cycles'];

class GovernanceProposalsFormProposal extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      amount,
      cycles,
      ipfs_location,
      send_to,
      title
    } = props;
    
    this.state = {
      amount,
      confirming: false,
      cycles,
      fileBuffer:'',
      fileInfo: '',
      ipfsHash:null,
      ipfsing: false,
      ipfsError: {
        address:'',
        code:'',
        errno:'',
        port: 0,
        syscall:'',
        message:''
      },
      ipfs_location,
      send_to,
      title,
      formErrors: {},
      submitDisabled: true
    };
  }

  uploadWorkerProposal =(e) => {
    e.stopPropagation();
    e.preventDefault();

    const proposalFile = e.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(proposalFile);
    reader.onloadend = async () => {
      const fileBuffer = await Buffer.from(reader.result);
      this.setState({
        fileBuffer, 
        fileInfo: proposalFile
      });
      this.onChange(e, {
        name: 'ipfs_location', 
        value: proposalFile, 
        valid: true});
    };
  };

  onSubmit = (e) => {
    if (!this.state.submitDisabled) {
      this.setState({
        confirming: true,
        ipfsing: false,
        ipfsError: {
          address:'',
          code:'',
          errno:'',
          port: 0,
          syscall:'',
          message:''
        }
      });
    }
    e.preventDefault();
    return false;
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);

      e.preventDefault();
      return false;
    }
  }

  onChange = debounce((e, { name, value, valid=true }) => {
    this.setState({
      submitDisabled: false,
      [name]: value
    }, () => {
      let {
        formErrors
      } = this.state;

      const {
        send_to
      } = this.state;

      const {
        actions
      } = this.props;

      const {
        checkAccountAvailability
      } = actions;

      if (name === 'send_to' && send_to.length !== 0) {
        checkAccountAvailability(send_to);
      }

      let submitDisabled = false;

      if (!valid) {
        formErrors[name] = `invalid_proposal_${name}`;
      } else {
        formErrors[name] = null;
      }

      ({ formErrors, submitDisabled } = this.errorsInForm(formErrors));

      this.setState({
        formErrors,
        submitDisabled
      });
    });
  }, 200)

  errorsInForm = (errors) => {
    const {
      amount,
      cycles,
      ipfs_location,
      title
    } = this.state;
    const formErrors = errors;
    let submitDisabled = false;

    formAttributes.forEach((attribute) => {
      formErrors[attribute] = null;
    });

    if ((!title || title.length < 10) && !submitDisabled) {
      formErrors.cycles = 'invalid_proposal_title';
      submitDisabled = true;
    }

    if ((!ipfs_location || ipfs_location.size < 1) && !submitDisabled) {
      formErrors.ipfs_location = 'invalid_proposal_ipfs_location';
      submitDisabled = true;
    }

    if ((Number(amount) < 1 || isNaN(amount)) && !submitDisabled) {
      formErrors.amount = 'invalid_proposal_amount';
      submitDisabled = true;
    }

    if ((Number(cycles) < 1 || isNaN(cycles)) && !submitDisabled) {
      formErrors.cycles = 'invalid_proposal_cycles';
      submitDisabled = true;
    }

    return { formErrors, submitDisabled };
  }

  onConfirm = async () => {
    this.setState({      
      ipfsing: true,
      ipfsError: {
        address:'',
        code:'',
        errno:'',
        port: 0,
        syscall:'',
        message:''
      }
    });

    const {
      actions,
      settings
    } = this.props;

    const {
      createProposal
    } = actions;

    const {
      amount,
      cycles,
      title,
      send_to
    } = this.state;

    // save proposal to IPFS, return its hash#, and submit contract to chain
    await ipfs.add(this.state.fileBuffer, (error, ipfsHash) => {
      if (error) {
        this.setState({ ipfsError:error });
      }
      
      // now we can finally add the proposal to the blockchain
      if (ipfsHash) {
        const ipfsLocation = "https://ipfs.telos.miami/ipfs/" + ipfsHash[0].hash;

        createProposal(title, ipfsLocation, parseInt(cycles), 
          amount + " " + settings.blockchain.tokenSymbol, send_to);

        this.setState({
          ipfsHash: ipfsHash[0].hash,
          ipfs_location: ipfsLocation
        });
      }

      this.setState({ipfsing: false});
    });
  }

  onBack = (e) => {
    this.setState({
      confirming: false,
      ipfsing: false
    });
    e.preventDefault();
    return false;
  }

  onClose = (e) => {
    this.setState({
      confirming: false,
      ipfsing: false,
      fileInfo: ''
    });

    this.props.onClose();
  }

  render() {
    const {
      actions,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    const {
      amount,
      confirming,
      cycles,
      fileInfo,
      formErrors,
      ipfsing,
      ipfsError,
      ipfsHash,
      ipfs_location,
      title,
      send_to
    } = this.state;
    let {
      submitDisabled
    } = this.state;

    let amountLabel = "Requested Amount (" + settings.blockchain.tokenSymbol + ")";

    if (send_to &&
        send_to.length !== 0 &&
        system.ACCOUNT_AVAILABLE === 'SUCCESS' &&
        system.ACCOUNT_AVAILABLE_LAST_ACCOUNT === send_to) {
      formErrors.send_to = 'invalid_proposal_send_to';
      submitDisabled = true;
    }

    if (system.ACCOUNT_AVAILABLE === 'SUCCESS' && !submitDisabled) { // account doesn't exist!
      submitDisabled = true;
    }

    const formErrorKeys = Object.keys(formErrors);
    const hasError = ipfsError.message && ipfsError.message.length > 0;
    return (
      <Form
        warning
        loading={ipfsing === true || system.GOVERNANCE_CREATEPROPOSAL === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        {(!confirming && !ipfsing) ? (
            <Segment basic clearing>
                {(hasError === true)
                  ? (
                    <Message
                    color="red"
                    header={ipfsError.message}
                    icon="x"
                    />
                  )
                  : ''
                }
              <Message
                content="The Worker Proposal system is a smart contract that allows EOSIO stakeholders to be involved in the governance of the blockchain. When a proposal is entered into the Worker Proposal contract, all accounts staking tokens will be allowed to vote Yes, No, or Abstain within a timeframe of a set number of cycles (each cycle represents ~29 days) on the matters presented in the proposal."
                warning
              />
              <GlobalFormFieldGeneric
                autoFocus
                label="Proposal Title:"
                name="title"
                onChange={this.onChange}
                value={title} 
              />
              <input 
                type = "file"
                onChange = {this.uploadWorkerProposal}
              />
              <GlobalFormFieldGeneric
                label={amountLabel}
                name="amount"
                onChange={this.onChange}
                value={amount}
              />
              <GlobalFormFieldAccount
                contacts={settings.contacts}
                label="Recipient:"
                name="send_to"
                onChange={this.onChange}
                value={send_to}
              />
              <GlobalFormFieldGeneric
                label="Cycles:"
                name="cycles"
                onChange={this.onChange}
                value={cycles}
              />
              <Divider />
              <FormMessageError
                errors={
                  formErrorKeys.length > 0 && formErrorKeys.reduce((errors, key) => {
                    const error = this.state.formErrors[key];
                    if (error) {
                      errors.push(error);
                    }
                    return errors;
                  }, [])
                }
                icon="warning sign"
              />
              <Button
                onClick={this.onClose}
              >
                <Icon name="x" /> {t('close')}
              </Button>
              <Button
                content={t('producers_form_proxy_confirm')}
                disabled={submitDisabled}
                floated="right"
                primary
              />
            </Segment>
          ) : ''}
        {(confirming)
          ? (
            <GovernanceProposalsFormProposalConfirming
              actions={actions}
              amount={amount}
              cycles={cycles}
              fileInfo={fileInfo}
              ipfsHash={ipfsHash}
              ipfs_location={ipfs_location}
              onBack={this.onBack}
              onClose={this.onClose}
              onConfirm={this.onConfirm}
              settings={settings}
              send_to={send_to}
              system={system}
              title={title}
              validate={validate}
              wallet={wallet}
            />
          ) : ''
        }
      </Form>
    );
  }
}

export default translate('producers')(GovernanceProposalsFormProposal);
