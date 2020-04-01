// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon, Label, List, Segment } from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';
import { attempt, isError, isObject } from 'lodash';

import PromptFragmentTransactionActionFuel from './Action/Fuel';

const fuelActions = ['greymassfuel:cosign', 'greymassnoop:noop'];

class PromptFragmentTransactionAction extends Component<Props> {
  render() {
    const {
      action,
      enableWhitelist,
      index,
      modifyWhitelist,
      t,
      total,
      whitelist,
    } = this.props;
    if (
      action.account
      && action.name
      && fuelActions.includes([action.account, action.name].join(':'))
    ) {
      return (
        <PromptFragmentTransactionActionFuel
          action={action}
          index={index}
          total={total}
        />
      );
    }
    return (
      <div key={index}>
        <Segment attached="top" color="blue" inverted>
          <Label basic>
            {action.account}
            <Icon
              name="caret right"
              style={{ marginLeft: '1em' }}
            />
            {action.name}
          </Label>
          <Label color="blue">
            Action {index + 1} of {total}
          </Label>
        </Segment>
        <Segment attached secondary>
          <List divided relaxed size="large">
            {Object.keys(action.data).sort().map((k) => {
              const isFlexible = get(whitelist, `flexible.${index}.${k}`, false);
              const isJSON = (!isError(attempt(JSON.parse, action.data[k])));
              const isData = isObject(action.data[k]);
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
                    {(!isError(attempt(JSON.parse, k)))
                      ? JSON.stringify(JSON.parse(k))
                      : String(k)
                    }
                    <List.Header
                      style={{ marginTop: '0.25em' }}
                    >
                      {(isJSON)
                        ? JSON.stringify(JSON.parse(action.data[k]))
                        : false
                      }
                      {(isData)
                        ? JSON.stringify(action.data[k])
                        : false
                      }
                      {(!isData && !isJSON)
                        ? String(action.data[k])
                        : false
                      }
                    </List.Header>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </Segment>
        <Segment attached="bottom">
          <Label color="white" basic pointing="right">
            Signatures Required
          </Label>
          {action.authorization.map((auth, idx) => (
            <Label color="blue" key={`${idx}@${auth.actor}@${auth.permission}`}>
              <Icon name="pencil" />
              {auth.actor}@{auth.permission}
            </Label>
          ))}
        </Segment>
      </div>
    );
  }
}

export default translate('global')(PromptFragmentTransactionAction);
