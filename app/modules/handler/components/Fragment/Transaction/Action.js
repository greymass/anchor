// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Divider, Header, Icon, Label, List, Segment } from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';
import { attempt, isArray, isError, isObject } from 'lodash';

import PromptFragmentTransactionActionFuel from './Action/Fuel';
import PromptFragmentTransactionActionFuelFee from './Action/Fuel/Fee';

const fuelActions = ['greymassfuel:cosign', 'greymassnoop:noop'];
const fuelFee = ['eosio.token:transfer'];

class PromptFragmentTransactionAction extends Component<Props> {
  render() {
    const {
      action,
      enableWhitelist,
      index,
      modifyWhitelist,
      showAll,
      t,
      total,
      whitelist,
    } = this.props;
    // Determine if Fuel is covering the resources of this transaction
    const isFuelAction = (
      action.account
      && action.name
      && fuelActions.includes([action.account.toString(), action.name.toString()].join(':'))
    );
    // Determine if the user is paying for Fuel during this transaction
    const isFuelPaidAction = (
      action.data
      && action.data.to
      && action.data.to.toString() === 'fuel.gm'
      && action.data.memo
      && action.data.memo.includes('ref=')
    );
    // Determine if the user is having RAM bought for it using Fuel during the transaction
    const isFuelBuyingRAMAction = (
      action.name
      && ['buyram', 'buyrambytes'].includes(String(action.name))
      && action.data
      && action.data.payer
      && action.data.payer.toString() === 'greymassfuel'
    );
    if (!showAll && (isFuelAction || isFuelPaidAction || isFuelBuyingRAMAction)) {
      return false;
    }
    if (!showAll && isFuelAction) {
      return (
        <Segment stacked>
          <PromptFragmentTransactionActionFuel
            action={action}
            index={index}
            total={total}
          />
          {(isFuelPaidAction)
            ? (
              <PromptFragmentTransactionActionFuelFee
                action={action}
                index={index}
                total={total}
              />
            )
            : false
          }
        </Segment>
      );
    }
    return (
      <Segment basic key={index}>
        <Segment
          basic
          secondary
          style={{
            borderRadius: '.28571429rem',
          }}
        >
          <Divider horizontal style={{ marginTop: 0 }}>
            {t('handler_transaction_action_label_divider_one')}
          </Divider>
          <Label
            basic
            color="blue"
            size="large"
          >
            {action.account.toString()}
            <Icon
              name="caret right"
              style={{ marginLeft: '1em' }}
            />
            {action.name.toString()}
          </Label>
          <Divider horizontal style={{ marginTop: '1.5em' }}>{t('handler_transaction_action_label_divider_two')}</Divider>
          <List relaxed>
            {(Object.keys(action.data).length === 0)
              ? (
                <List.Item>No data included in transaction.</List.Item>
              )
              : false
            }
            {Object.keys(action.data).sort().map((k) => {
              const isFlexible = get(whitelist, `flexible.${index}.${k}`, false);
              const isList = isArray(action.data[k]);
              const isJSON = (!isError(attempt(JSON.parse, action.data[k])));
              const isData = isObject(action.data[k]);
              const isEmpty = !(action.data[k]);
              const isNoData = isEmpty || (isList && !action.data[k].length);
              return (
                <List.Item key={k}>
                  {(enableWhitelist)
                    ? (
                      <Button
                        basic
                        color={(isFlexible) ? 'green' : 'grey'}
                        // style={{ background: 'white' }}
                        size="large"
                        floated="left"
                        icon
                        index={index}
                        name={k}
                        onClick={modifyWhitelist}
                      >
                        <Icon
                          name={(isFlexible) ? 'lock open' : 'lock'}
                        />
                      </Button>
                    )
                    : false
                  }
                  <List.Content>
                    <Header size="small">
                      {(!isError(attempt(JSON.parse, k)))
                        ? JSON.stringify(JSON.parse(k))
                        : String(k)
                      }
                    </Header>
                    <List.Header
                      style={{ marginTop: '0.25em' }}
                    >
                      <Segment
                        disabled={isNoData}
                        style={{
                          overflowWrap: 'break-word',
                          wordBreak: 'break-all',
                        }}
                      >
                        {(isJSON)
                          ? JSON.stringify(JSON.parse(action.data[k]))
                          : false
                        }
                        {(isList && action.data[k].length)
                          ? action.data[k].map(i => (
                            <div
                              style={{
                                border: '1px solid rgba(34,36,38,.15)',
                                borderRadius: '2px',
                                display: 'inline-block',
                                margin: '0 0.65em 0.5em 0',
                                overflowWrap: 'break-word',
                                padding: '0.5em',
                                wordBreak: 'break-all',
                              }}
                            >
                              {isObject(i)
                                ? JSON.stringify(i)
                                : String(i)
                              }
                            </div>
                          ))
                          : false
                        }
                        {(isData && !isList && !isJSON)
                          ? JSON.stringify(action.data[k])
                          : false
                        }
                        {(isNoData)
                          ? <span style={{ color: '' }}>No Data</span>
                          : false
                        }
                        {(!isData && !isJSON)
                          ? String(action.data[k])
                          : false
                        }
                      </Segment>
                    </List.Header>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
          <Divider horizontal style={{ marginTop: '1.5em' }}>
            {t('handler_transaction_action_label_two')}
          </Divider>
          {action.authorization.map((auth) => (
            <Label
              basic
              key={`${auth.actor.toString()}@${auth.permission.toString()}`}
              size="large"
            >
              {auth.actor.toString()}@{auth.permission.toString()}
            </Label>
          ))}
        </Segment>
      </Segment>
    );
  }
}

export default withTranslation('handler')(PromptFragmentTransactionAction);
