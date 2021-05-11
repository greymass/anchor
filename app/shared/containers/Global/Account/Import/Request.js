// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { debounce, find } from 'lodash';
import compose from 'lodash/fp/compose';
import { Button, Form, Header, Icon, Message, Modal, Segment, Tab } from 'semantic-ui-react';

import { PrivateKey } from '@greymass/eosio';

import GlobalFormFieldAccount from '../../../../components/Global/Form/Field/Account';
import GlobalButtonElevate from '../../../../../shared/containers/Global/Button/Elevate';

import eos from '../../../../actions/helpers/eos';
import AccountActions from '../../../../actions/accounts';
import PendingActions from '../../../../actions/pending';
import WalletActions from '../../../../actions/wallets';

import makeGetKeysUnlocked from '../../../../selectors/getKeysUnlocked';

const { SigningRequest, PlaceholderName, PlaceholderPermission } = require('eosio-signing-request');
const { ipcRenderer } = require('electron');

const defaultState = {
  account: false,
  available: false,
  keys: {
    active: false,
    owner: false,
  },
  processing: false,
  savedKeys: false,
  uri: false,
  valid: false
};

const zlib = require('zlib');
const util = require('util');

const textEncoder = new util.TextEncoder();
const textDecoder = new util.TextDecoder();
const { clipboard } = require('electron');

class GlobalModalAccountImportRequest extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, defaultState);
  }

  componentWillReceiveProps(nextProps) {
    const { account } = this.state;
    const { system } = this.props;

    if (
      system.ACCOUNT_AVAILABLE === 'PENDING'
      && nextProps.system.ACCOUNT_AVAILABLE === 'SUCCESS'
      && nextProps.system.ACCOUNT_AVAILABLE_LAST_ACCOUNT === account
    ) {
      this.setState({
        available: true,
        processing: false,
      });
    }

    if (
      system.ACCOUNT_AVAILABLE === 'PENDING'
      && nextProps.system.ACCOUNT_AVAILABLE === 'FAILURE'
    ) {
      this.setState({
        available: false,
        processing: false,
      });
    }
  }

  copyToClipboard = (data) => clipboard.writeText(data)

  onChange = debounce((e, { name, valid, value }) => {
    this.setState({
      available: false,
      account: value,
      processing: true,
      valid,
    }, () => {
      if (valid && name === 'account' && value.length !== 0) {
        const { actions } = this.props;
        actions.checkAccountAvailability(value);
      }
    });
  }, 300)

  generate = (password) => {
    const { account } = this.state;
    // Generate a new owner key
    const owner = PrivateKey.generate('K1');
    // Generate a new active key
    const active = PrivateKey.generate('K1');
    // Save keys into wallet state
    const keys = [
      [
        active.toPublic().toLegacyString(),
        active.toWif(),
      ]
    ];
    // Import into key storage
    this.props.actions.importKeypairStorage(password, keys);
    this.setState({
      keys: {
        active: active.toWif(),
        owner: owner.toWif(),
      }
    }, () => {
      this.generateRequest(
        account,
        owner.toPublic().toLegacyString(),
        active.toPublic().toLegacyString()
      );
    });
  }

   generateRequest = async (account, owner, active) => {
     const { actions, blockchain } = this.props;
     const opts = {
       // string encoder
       textEncoder,
       // string decoder
       textDecoder,
       // zlib string compression (optional, recommended)
       zlib: {
         deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
         inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
       },
       // Customizable ABI Provider used to retrieve contract data
       abiProvider: {
         getAbi: async (a) => {
           const EOS = eos({
             broadcast: false,
             chainId: blockchain.chainId,
             httpEndpoint: blockchain.node,
             sign: false,
           }, false, true);
           return (await EOS.getAbi(a.toString())).abi;
         }
       }
     };

     // Generate the signing request
     const request = await SigningRequest.create({
       actions: [
         {
           account: 'eosio',
           name: 'newaccount',
           authorization: [{
             actor: PlaceholderName,
             permission: PlaceholderPermission
           }],
           data: {
             creator: PlaceholderName,
             name: account,
             owner: {
               threshold: 1,
               keys: [{
                 key: owner,
                 weight: 1
               }],
               accounts: [],
               waits: []
             },
             active: {
               threshold: 1,
               keys: [{
                 key: active,
                 weight: 1
               }],
               accounts: [],
               waits: []
             },
           },
         },
         {
           account: 'eosio',
           name: 'buyrambytes',
           authorization: [{
             actor: PlaceholderName,
             permission: PlaceholderPermission
           }],
           data: {
             payer: PlaceholderName,
             receiver: account,
             bytes: Number(3000)
           },
         },
       ],
       chainId: blockchain.chainId
     }, opts);

     // Take the URI payload and alter it to match the web wallet interface
     const encoded = request.encode();
     const parts = encoded.split(':');
     const payload = parts[1].replace('//', '');
     const uri = `https://wallet.greymass.com/request/${payload}`;

     // Pass the URI to the client to share
     this.setState({
       uri
     }, () => {
       actions.addPendingAccountCreate({
         account,
         active,
         chainId: blockchain.chainId,
         created: Date.now(),
         owner,
         permission: 'active',
         request: uri,
       });
     });
   }

   saveBackup = () => {
     const { settings } = this.props;
     const { account, keys } = this.state;
     const backup = `ACTIVE: ${keys.active}\nOWNER: ${keys.owner}`;
     ipcRenderer.send(
       'saveFile',
       settings.lastFilePath,
       backup,
       `${account}-keys`,
       false,
       'txt'
     );
     ipcRenderer.once('lastFileSuccess', () => {
       this.setState({ savedKeys: true });
     });
   }

   render() {
     const {
       account,
       available,
       processing,
       savedKeys,
       valid,
       uri,
     } = this.state;
     const {
       t,
     } = this.props;
     const disabled = (processing || !available || !valid);
     if (uri && !savedKeys) {
       return (
         <Modal open size="small">
           <Modal.Header>OWNER Key - Save your keys outside of Anchor</Modal.Header>
           <Modal.Content>
             <Message
               content="Please take the time to read this message carefully and ensure you save your private keys someplace safe. You are responsible for these keys and your account."
               icon="warning sign"
               header="This step is very important to the security of your account"
               info
             />
             <Modal.Description>
               <p>
                 To help secure your account, two different private keys will be associated to it.
               </p>
               <ul>
                 <li><strong>OWNER key</strong>: The master/backup key for your account. </li>
                 <li><strong>ACTIVE key</strong>: The key to use for day to day activities.</li>
               </ul>
               <p>
                 The <strong>ACTIVE</strong> key will be saved within Anchor for use and will be included Anchor backups.
               </p>
               <p>
                 The <strong>OWNER</strong> key needs to be saved externally in the event Anchor or this computer encounters issues where it loses data.
                 You will need to save this key someplace safe before you are allowed to proceed. It is recommended you save this file in an offline location (USB device, print to paper, etc) and encrypted if possible.
               </p>
             </Modal.Description>
           </Modal.Content>
           <Modal.Actions>
             <Button
               content="Save OWNER key (text file)"
               icon="save"
               onClick={this.saveBackup}
               primary
             />
           </Modal.Actions>
         </Modal>
       );
     }
     if (uri) {
       return (
         <Tab.Pane>
           <Segment basic size="large">
             <p>
               With your private keys now safely saved both in Anchor and externally, it is now time to find a person or 3rd party service willing to create the new account for you.
             </p>
             <p>
               Click the button below to copy the URL to your clipboard. Share it with any existing account holder or service who is willing to pay to create the account for you.
             </p>
             <p>
               You can use the 'Pending Requests' section in the left sidebar to see the status of this request or retrieve this URL at any time. Once the account has been created you will be able to automatically configure Anchor to use it.
             </p>
             <Button
               content="Copy Request URL"
               icon="clipboard"
               onClick={() => this.copyToClipboard(uri)}
               primary
               style={{ marginTop: '0.5em' }}
             />
           </Segment>
         </Tab.Pane>
       );
     }
     return (
       <Tab.Pane>
         <Segment basic size="large">
           <Header
             content={t('global_account_import_request_header_one')}
             subheader={t('global_account_import_request_subheader_one')}
           />
           <GlobalFormFieldAccount
             fluid
             label="Select an Account Name..."
             name="account"
             onChange={this.onChange}
             rules="generic"
           />
           <GlobalButtonElevate
             onSuccess={(password) => this.generate(password)}
             trigger={(
               <Button
                 content="Start Account Creation Request"
                 disabled={disabled}
                 fluid
                 loading={valid && processing}
                 primary
                 style={{ marginTop: '0.5em' }}
               />
            )}
             wallet={this.props.wallets[0]}
           />
           {(!processing && valid && !available)
             ? (
               <Message
                 content="Account name is already in use."
               />
             )
             : false
           }
           {(account.length === 0 && !valid)
             ? (
               <Message
                 content="Enter an account name that is exactly 12 characters long, no spaces, only using lower case characters from A through Z or numbers 1 through 5."
               />
             )
             : false
           }
           {(account.length > 0 && !valid)
             ? (
               <Message
                 content="The entered account name is not valid. The account name must be exactly 12 characters long, no spaces, and only using lower case character A through Z or numbers 1 through 5."
               />
             )
             : false
           }
           {(!processing && valid && available)
             ? (
               <Message
                 success
                 content={`The account name "${account}" is currently available.`}
               />
             )
             : false
           }
         </Segment>
         <Segment basic clearing>
           <Button
             floated="left"
             onClick={this.props.onClose}
           >
             <Icon name="x" /> {t('cancel')}
           </Button>
         </Segment>
       </Tab.Pane>
     );
   }
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    blockchain: find(state.blockchains, { chainId: state.settings.chainId }),
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    wallets: state.wallets,
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...PendingActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default compose(
  withTranslation('global', {
    withRef: true
  }),
  connect(makeMapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportRequest);
