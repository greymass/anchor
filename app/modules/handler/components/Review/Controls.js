// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Header, Icon, Segment, Statistic } from 'semantic-ui-react';
import GlobalAccountDropdownSelect from '../../../../shared/containers/Global/Account/Dropdown/Select';
import TimeAgo from 'react-timeago';

class PromptReviewControls extends Component<Props> {
  state = {
    remaining: false
  }
  componentDidMount() {
    const { expiration } = this.props;
    this.interval = setInterval(() => this.calc(expiration), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  calc(time) {
    let diff = (Date.parse(new Date(time)) - Date.parse(new Date())) / 1000;
    if (diff <= 0) {
      clearInterval(this.interval);
    }
    const remaining = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
    if (diff >= 86400) {
      remaining.days = Math.floor(diff / 86400);
      diff -= remaining.days * 86400;
    }
    if (diff >= 3600) {
      remaining.hours = Math.floor(diff / 3600);
      diff -= remaining.hours * 3600;
    }
    if (diff >= 60) {
      remaining.minutes = Math.floor(diff / 60);
      diff -= remaining.minutes * 60;
    }
    remaining.seconds = diff;
    this.setState({
      remaining
    });
  }
  render() {
    const {
      callback,
      canBroadcast,
      chainId,
      couldSignWithDevice,
      disabledSwap,
      enableWhitelist,
      expiration,
      mismatch,
      onCheck,
      onSelect,
      onWhitelist,
      settings,
      shouldBroadcast,
      t,
      wallet,
    } = this.props;
    const { remaining } = this.state;
    const {
      account,
      authorization,
      mode,
      pubkey,
    } = wallet;
    let callbackField;
    if (callback && callback.url && callback.url !== '') {
      const url = new URL(callback.url);
      callbackField = (
        <Form.Field>
          <label>
            <Icon name="linkify" />
            {t('handler_review_form_label_one')}
          </label>
          <Segment basic size="large" style={{ marginTop: 0 }}>
            <p>{url.origin}</p>
          </Segment>
        </Form.Field>
      );
    }
    return (
      <Form>
        <Header>
          {t('handler_review_controls_header')}
        </Header>
        <Form.Field>
          {(mismatch)
            ? (
              <Segment color="orange">
                <Header>
                  Account not found
                  <Header.Subheader>
                    {mismatch}
                  </Header.Subheader>
                </Header>
              </Segment>
            )
            : false
          }
          <label>
            <Icon
              name="user"
              style={{
                marginRight: '0.5em',
              }}
            />
            {t('handler_review_form_label_two')}
          </label>
          <GlobalAccountDropdownSelect
            account={account}
            authorization={authorization}
            disabled={disabledSwap}
            mode={mode}
            pubkey={pubkey}
            chainId={chainId}
            onSelect={onSelect}
          />
        </Form.Field>
        {(settings && ['ledger', 'hot'].includes(wallet.mode))
          ? (
            <Form.Field>
              <label>
                <Icon
                  name="cogs"
                  style={{
                    marginRight: '0.5em',
                  }}
                />
                {t('handler_review_form_label_three')}
              </label>
              <Segment basic style={{ marginTop: 0 }}>
                <Form.Checkbox
                  checked={settings.promptCloseOnComplete}
                  label={t('handler_review_form_checkbox_one')}
                  name="promptCloseOnComplete"
                  onChange={onCheck}
                  toggle
                />
                {(
                  shouldBroadcast
                  // Disable this option for now, not production ready.
                  && true === false
                )
                  ? (
                    <Form.Checkbox
                      checked={canBroadcast && settings.promptSignAndBroadcast}
                      disabled={!canBroadcast}
                      label={t('handler_review_form_checkbox_two')}
                      name="esr_signbroadcast"
                      onChange={onCheck}
                      toggle
                    />
                  )
                  : false
                }
                {(
                  // Using a device prevents whitelists from working
                  !couldSignWithDevice
                  // Disable this option for now, not production ready.
                  && true === false
                )
                  ? (
                    <Form.Checkbox
                      checked={enableWhitelist}
                      label={t('handler_review_form_checkbox_three')}
                      name="esr_whitelist"
                      onChange={onWhitelist}
                      toggle
                    />
                  )
                  : false
                }
                <Form.Checkbox
                  checked
                  label={t('handler_review_form_checkbox_four')}
                  style={{ display: 'none' }}
                />
              </Segment>
            </Form.Field>
          )
          : false
        }
        {callbackField}
        <Segment attached basic textAlign="center">
          <Header size="tiny" textAlign="center">
            Transaction Expiration
          </Header>
          {(remaining.hours > 0 || remaining.minutes > 0 || remaining.seconds > 0)
            ? (
              <Statistic.Group
                size="tiny"
                widths={(remaining.hours > 0) ? 'three' : 'two'}
              >
                {(remaining.hours > 0)
                  ? (
                    <Statistic>
                      <Statistic.Value>{remaining.hours || 0}</Statistic.Value>
                      <Statistic.Label>Hours</Statistic.Label>
                    </Statistic>
                  )
                  : false
                }
                <Statistic>
                  <Statistic.Value>{remaining.minutes || 0}</Statistic.Value>
                  <Statistic.Label>Minutes</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{remaining.seconds || 0}</Statistic.Value>
                  <Statistic.Label>Seconds</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            )
            : (
              <p>Expired!</p>
            )
          }
        </Segment>
      </Form>
    );
  }
}

export default withTranslation('handler')(PromptReviewControls);
