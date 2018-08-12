// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Form } from 'semantic-ui-react';
import GlobalFormFieldKeyPublic from '../../../../Global/Form/Field/Key/Public';

class ToolsFormPermissionsAuthWeightedKey extends Component<Props> {
  render() {
    const {
      auth,
      keyAuths,
      index,
      onNumberChange,
      onKeyChange,
      onRemoveKey,
      settings,
      t
    } = this.props;
    const showWeight = (auth.keys.length > 1 || settings.advancedPermissions);
    return (
      <Form.Group>
        {(showWeight)
          ? (
            <Form.Input
              defaultValue={keyAuths.weight}
              label={(!index) ? t('tools_form_permissions_auth_weight') : false}
              name={`keys.${index}.weight`}
              onChange={onNumberChange}
              width={2}
            />
          )
          : false
        }
        <GlobalFormFieldKeyPublic
          defaultValue={keyAuths.key || ''}
          label={(!index) ? t('tools_form_permissions_auth_key') : false}
          name={`keys.${index}.key`}
          onChange={onKeyChange}
          width={(showWeight) ? 14 : 16}
        />
        {(settings.advancedPermissions)
          ? (
            <Form.Button
              color="red"
              icon="trash"
              name={`keys.${index}`}
              onClick={onRemoveKey}
            />
          )
          : false
        }
      </Form.Group>
    );
  }
}


export default translate('tools')(ToolsFormPermissionsAuthWeightedKey);
