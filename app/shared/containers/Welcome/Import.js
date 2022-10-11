// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import { Serialize } from 'eosjs2';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { withTranslation } from 'react-i18next';
import { Button, Form, Label, Message, Modal, Segment } from 'semantic-ui-react';

import * as AccountsActions from '../../actions/accounts';
import * as BlockchainsActions from '../../actions/blockchains';
import * as PendingActions from '../../actions/pending';
import * as SettingsActions from '../../actions/settings';
import * as StorageActions from '../../actions/storage';
import * as ValidateActions from '../../actions/validate';
import * as WalletActions from '../../actions/wallet';
import * as WalletsActions from '../../actions/wallets';

const defaultChainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';
import { update as update009 } from '../../store/shared/migrations/009-updateSettings';

const ecc = require('eosjs-ecc');
const bip39 = require('bip39');
const scrypt = require('scrypt-async');
const sjcl = require('sjcl');

const { ipcRenderer } = require('electron');

class WelcomeImportContainer extends Component<Props> {
  state = {
    data: undefined,
    error: undefined,
    loading: false,
    scatter: false,
    password: undefined,
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  componentWillReceiveProps(nextProps) {
    const { settings, validate } = nextProps;
    if (
      settings.walletInit
      && (validate.NODE === 'SUCCESS' && this.props.validate.NODE === 'PENDING')
    ) {
      const {
        actions,
        history,
      } = this.props;
      const { account, authorization, chainId } = settings;
      if (account && authorization && chainId) {
        actions.useWallet(chainId, account, authorization);
      }
      history.push('/');
    }
  }
  handleImportAnchor = (data) => {
    const {
      actions,
    } = this.props;
    try {
      const {
        networks,
        pending,
        settings,
        storage,
        wallets,
      } = JSON.parse(data);
      // Restore all pending certificates, if they exist
      if (pending) {
          if (pending.schema === 'anchor.v1.pending' && pending.data) {
            actions.restorePendingData(pending.data)
          }
      }
      // Restore all defined networks
      networks.forEach((network) => {
        if (network && ['anchor.v1.network', 'anchor.v2.network'].includes(network.schema)) {
          actions.importBlockchainFromBackup(network.data);
        } else {
          // unable to import settings
          console.log(network);
        }
      });
      const chainIds = [];
      // Restore all wallets
      wallets.forEach((wallet) => {
        if (wallet && ['anchor.v1.wallet', 'anchor.v2.wallet'].includes(wallet.schema)) {
          chainIds.push(wallet.data.chainId);
          const versioned = { ...wallet.data };
          if (!versioned.version && wallet.schema === 'anchor.v1.wallet') {
            versioned.version = 1;
          }
          actions.importWalletFromBackup(versioned, settings.data);
        } else {
          // unable to import settings
        }
      });
      // Restore storage
      if (storage && ['anchor.v2.storage'].includes(storage.schema)) {
        actions.setStorage(storage.data);
      }
      // Enable all of the blockchains that wallets were imported for
      actions.setSetting('blockchains', chainIds);
      // Restore settings
      if (settings && ['anchor.v1.settings', 'anchor.v2.settings'].includes(settings.schema)) {
        const newSettings = update009(settings.data, defaultChainId);
        actions.validateNode(newSettings.node, newSettings.chainId, true, true);
        actions.setSettings(newSettings);
        actions.useWallet(newSettings.chainId, newSettings.account, newSettings.authorization);
      } else {
        // unable to import settings
        console.log(settings);
      }
    } catch (e) {
      // unable to import
      console.log('error importing', e);
    }
  }
  hashPassword = (password, salt) => new Promise(async resolve => {
    scrypt(password, salt.trim(), {
      N: 16384,
      r: 8,
      p: 1,
      dkLen: 16,
      encoding: 'hex'
    }, (derivedKey) => {
      resolve(derivedKey);
    });
  })
  passwordToSeed = async (password, salt) => {
    const hash = await this.hashPassword(password, salt);
    const mnemonic = bip39.entropyToMnemonic(hash);
    return bip39.mnemonicToSeedHex(mnemonic);
  }
  decryptWithSeed = async (seed, data) => {
    return sjcl.decrypt(seed, JSON.stringify(Object.assign(JSON.parse(data), { mode: 'gcm' })));
  }
  decryptScatter = async (password, data) => {
    // Split scatter backup into components
    const [json, , salt] = data.split('|');
    // Convert the password to a seed
    const seed = await this.passwordToSeed(password, salt);
    // Decrypt the backup with the seed
    const decryptedBackup = await this.decryptWithSeed(seed, json);
    const backup = JSON.parse(decryptedBackup);
    // Decrypt the keychain with the seed
    const decryptedKeychain = await this.decryptWithSeed(seed, backup.keychain);
    const keychain = JSON.parse(decryptedKeychain);
    return {
      ...backup,
      keychain,
      seed,
    };
  }
  handleImportScatter = async (password, data) => {
    try {
      const decrypted = await this.decryptScatter(password, data);
      const { actions } = this.props;
      const chainIds = [];
      const {
        keychain,
        seed,
        settings,
      } = decrypted;
      const {
        networks
      } = settings;
      const {
        accounts,
        keypairs,
      } = keychain;
      // Set the wallet hash based on the password to settings
      actions.setWalletHash(password);
      // convert key storage
      keypairs.forEach(async (keypair) => {
        // this is a key from an external device
        if (keypair.external) {
          // Push pubkey into storage
          const pubkey = find(keypair.publicKeys, { blockchain: 'eos' }).key;
          // ensure the path exists in storage
          const path = `44'/194'/0'/0/${keypair.external.addressIndex}`;
          // update storage
          actions.importPubkeyStorage(pubkey, path);
        } else {
          // this is just a key
          const decryptedKey = await this.decryptWithSeed(seed, keypair.privateKey);
          const privateKey = JSON.parse(decryptedKey);
          if (privateKey.type === undefined) {
            // Push keypair into storage
            const key = ecc.PrivateKey.fromBuffer(Buffer.from(privateKey)).toString();
            const pubkey = ecc.privateToPublic(key);
            actions.importKeyStorage(password, key, pubkey);
          } else {
            switch (privateKey.type) {
              case 'Buffer': {
                const key = ecc.PrivateKey.fromBuffer(Buffer.from(privateKey.data)).toString();
                const pubkey = ecc.privateToPublic(key);
                actions.importKeyStorage(password, key, pubkey);
                break;
              }
              default: {
                console.log('unknown format from scatter', privateKey.type);
                break;
              }
            }
          }
        }
      });
      // Restore all defined networks
      let config = {};
      networks.forEach((network) => {
        if (network.blockchain === 'eos') {
          const node = blockchains[network.chainId];
          chainIds.push(network.chainId);
          config = {
            _id: network.id,
            chainId: network.chainId,
            name: network.name,
            node: node || `${network.protocol}://${network.host}`,
            symbol: (network.token) ? network.token.symbol : undefined,
            testnet: false,
          };
          actions.importBlockchainFromBackup(config);
        }
      });
      // Restore all accounts
      accounts.forEach((account) => {
        const keypair = find(keypairs, { id: account.keypairUnique });
        const [networkType, , chainId] = account.networkUnique.split(':');
        if (networkType === 'eos') {
          const converted = {
            account: account.name,
            authority: account.authority,
            chainId,
            mode: (keypair.external) ? 'ledger' : 'hot',
            path: (keypair.external) ? `44'/194'/0'/0/${keypair.external.addressIndex}` : undefined,
            pubkey: account.publicKey,
            type: (keypair.external) ? 'ledger' : 'key',
          };
          // ensure data existed for this account before importing it
          if (
            converted.account
            && converted.authority
            && chainId
            && converted.pubkey
          ) {
            // commit to storage
            actions.importWalletFromBackup(converted);
          }
        }
      });
      // grab the first account as the most recent
      const [recentAccount] = accounts;
      // Initialize Anchor
      actions.setSetting('walletInit', true);
      actions.setSetting('blockchains', chainIds);
      const [chainId] = chainIds;
      const auth = recentAccount.authorization || recentAccount.authority;
      const node = blockchains[chainId];
      actions.validateNode(node, chainId, true, true);
      actions.setSettings({
        account: recentAccount.name,
        authorization: auth,
        blockchains: chainIds,
        chainId,
        node,
        walletInit: true,
      });
      actions.useWallet(chainId, recentAccount.name, auth);
    } catch (e) {
      this.setState({
        loading: false,
        error: e,
      });
    }
  }
  unlockScatter = () => {
    const { data, password } = this.state;
    this.setState({
      error: undefined,
      loading: true,
    }, () => {
      setTimeout(() => {
        this.handleImportScatter(password, data);
      }, 250);
    });
  }
  handleImport = (event, data) => {
    let isScatter = false;
    if (data.includes('|')) {
      try {
        const [json] = data.split('|');
        const parsed = JSON.parse(json);
        if (parsed.iv && parsed.salt && parsed.ct) {
          isScatter = true;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (isScatter) {
      this.setState({ scatter: true, data });
    } else {
      this.setState({
        loading: true
      });
      this.handleImportAnchor(data);
    }
  }
  import = () => {
    const { settings } = this.props;
    ipcRenderer.send(
      'openFile',
      settings.lastFilePath
    );
    ipcRenderer.once('openFileData', this.handleImport);
  }
  render() {
    const {
      t
    } = this.props;
    const {
      error,
      loading,
      scatter,
    } = this.state;
    const incorrectPassword = "CORRUPT: gcm: tag doesn't match";
    return (
      <React.Fragment>
        <Modal
          as={Form}
          closeIcon
          onClose={() => this.setState({ data: undefined, error: undefined, scatter: false })}
          onSubmit={this.unlockScatter}
          open={scatter}
          size="small"
        >
          <Modal.Header>
            {t('welcome:welcome_import_wallets_scatter_header')}
          </Modal.Header>
          <Modal.Content>
            <Segment basic loading={loading}>
              <Message
                color="red"
                content="Importing Scatter backups is a feature in development and may not work properly. If one of these imports does not work properly, you can reset your wallet through Tools -> Reset Application, and either try again or import your accounts manually by using the private keys."
                header="PLEASE READ: This is an experimental feature."
                icon="warning sign"
              />
              <p>{t('welcome:welcome_import_wallets_scatter_subheader')}</p>
              <Form.Input
                autoFocus
                label={t('welcome:welcome_import_wallets_scatter_password')}
                name="password"
                onChange={this.handleChange}
                type="password"
              />
              {(error && error.toString() === incorrectPassword)
                ? (
                  <Label
                    color="red"
                    content={t('welcome:welcome_import_wallets_scatter_password_wrong')}
                  />
                )
                : false
              }
              {(error && error.toString() !== incorrectPassword)
                ? (
                  <Label
                    color="red"
                    content={error.toString()}
                  />
                )
                : false
              }
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content={t('welcome:welcome_import_wallets_scatter')}
              disabled={loading}
              primary
            />
          </Modal.Actions>
        </Modal>
        <Button
          color="blue"
          content={t('welcome:welcome_import_wallets')}
          icon="save"
          loading={loading}
          onClick={this.import}
          size="small"
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    settings: state.settings,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...BlockchainsActions,
      ...PendingActions,
      ...SettingsActions,
      ...StorageActions,
      ...ValidateActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('welcome'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeImportContainer);

const blockchains = {
  'cbef47b0b26d2b8407ec6a6f91284100ec32d288a39d4b4bbd49655f7c484112': 'https://api.beos.world',
  'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4': 'https://api.testnet.beos.world',
  'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86': 'https://bos.eosn.io',
  'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': 'https://eos.greymass.com',
  'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473': 'https://jungle.greymass.com',
  '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840': 'https://jungle3.greymass.com',
  '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191': 'https://kylin.eosn.io',
  '21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c': 'https://fio.greymass.com',
  'b20901380af44ef59c5918439a1f9a41d83669020319a80574b804a5f95cbd7e': 'https://fiotestnet.greymass.com',
  'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664': 'https://instar.greymass.com',
  'b62febe5aadff3d5399090b9565cb420387d3c66f2ccd7c7ac1f532c4f50f573': 'https://lynx.greymass.com/',
  '0fea517bbfb5b51c564b5c59bcf7f02cf934cfff895f59d0d5cd7079c06fd978': 'https://lynxtestnet.greymass.com/',
  'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422': 'https://meetone.eosn.io',
  '93ece941df27a5787a405383a66a7c26d04e80182adf504365710331ac0625a7': 'https://testchain.remme.io/',
  '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0': 'https://proton.greymass.com/',
  '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd': 'https://protontestnet.greymass.com/',
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': 'https://telos.greymass.com',
  '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f': 'https://telostestnet.greymass.com',
  '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f': 'https://api.worbli.io',
  '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4': 'https://wax.greymass.com',
  'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12': 'https://waxtestnet.greymass.com',
  'b64646740308df2ee06c6b72f34c0f7fa066d940e831f752db2006fcc2b78dee': 'https://testnet.libre.org',
  '38b1d7815474d0c60683ecbea321d723e83f5da6ae5f1c1f9fecc69d9ba96465': 'https://lb.libre.org',
};
