// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Checkbox, Form, Header, Icon, Input, Modal, Segment } from 'semantic-ui-react';
import QRCode from 'qrcode';

import debounce from 'lodash/debounce';

const ecc = require('eosjs-ecc');

class GlobalFormFieldKeyPrivate extends Component<Props> {
  state = {
    qrcode: false,
    qrvisible: false,
    value: '',
    visible: false
  };
  qrCodePrompt = () => {
    this.setState({ qrcode: true });
  }
  qrCodeVisible = () => {
    this.setState({ qrvisible: true }, () => {
      this.renderQRCode();
    });
  }
  async renderQRCode() {
    const { canvas } = this;
    QRCode.toCanvas(canvas, this.props.value, {
      scale: 6
    }, (error) => {
      if (error) console.error(error);
    });
  }
  onChange = debounce((e, { name, value }) => {
    const parsed = value.trim();
    this.setState({
      value: parsed
    }, () => {
      try {
        const { connection } = this.props;
        const prefix = (connection && connection.keyPrefix) ? connection.keyPrefix : 'EOS';
        const publicKey = ecc.privateToPublic(parsed, prefix);
        const valid = ecc.isValidPrivate(parsed);
        this.props.onChange(e, {
          name,
          publicKey,
          valid,
          value: parsed
        });
      } catch (error) {
        this.props.onChange(e, {
          error,
          name,
          valid: false,
          value: parsed
        });
      }
    });
  }, 300)
  onToggleKey = () => this.setState({ visible: !this.state.visible });
  render() {
    const {
      autoFocus,
      disabled,
      icon,
      label,
      loading,
      name,
      placeholder,
      qr,
      t,
      value
    } = this.props;
    const {
      qrcode,
      visible,
    } = this.state;
    return (
      <React.Fragment>
        {(qrcode)
          ? (
            <Modal
              closeIcon
              open
              onClose={() => this.setState({ qrcode: false })}
            >
              <Modal.Header>
                Private Key Export
              </Modal.Header>
              <Modal.Content>
                <Segment
                  basic
                  textAlign="center"
                >
                  {(this.state.qrvisible)
                    ? (
                      <React.Fragment>
                        <Header>
                          Private Key as QR Code
                          <Header.Subheader>
                            Use this QR Code to import your private keys into a mobile wallet.
                          </Header.Subheader>
                        </Header>
                        <canvas ref={(node) => { this.canvas = node; }} />
                      </React.Fragment>
                    )
                    : (
                      <React.Fragment>
                        <Header icon size="large">
                          <Icon name="eye" />
                          <Header.Content>
                            Before proceeding, ensure your screen is not visible to anyone else
                            <Header.Subheader>
                              The QR Code that will be displayed here contains your private key. Anyone else who manages to view this QR code could gain access to your private keys and compromise your account.
                            </Header.Subheader>
                          </Header.Content>
                        </Header>
                        <Button
                          color="orange"
                          content="Show QR Code"
                          icon="privacy"
                          onClick={this.qrCodeVisible}
                        />
                      </React.Fragment>
                    )
                  }
                </Segment>
              </Modal.Content>
            </Modal>
          )
          : false
        }
        <p>
          <Form.Field
            action={(qr)
              ? {
                icon: 'qrcode',
                onClick: this.qrCodePrompt
              }
              : undefined
            }
            actionPosition="right"
            autoFocus={autoFocus}
            control={Input}
            defaultValue={value}
            disabled={disabled}
            fluid
            icon={icon}
            label={label}
            loading={loading}
            name={name}
            onChange={this.onChange}
            placeholder={placeholder}
            type={(visible) ? 'text' : 'password'}
          />
        </p>
        <p>
          <Checkbox
            label={t('welcome:welcome_key_compare_visible')}
            onChange={this.onToggleKey}
            checked={visible}
          />
        </p>
      </React.Fragment>
    );
  }
}

export default withTranslation('global')(GlobalFormFieldKeyPrivate);
