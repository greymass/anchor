// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Modal, Tab } from 'semantic-ui-react';

import ProducersModalInfoDetails from './Info/Details';
import ProducersModalInfoData from './Info/Data';

class ProducersModalInfo extends Component<Props> {
  render() {
    const {
      onClose,
      producerInfo,
      settings,
      t,
      viewing
    } = this.props;
    const panes = [
      { menuItem: 'Producer Details', render: () => <Tab.Pane><ProducersModalInfoDetails settings={settings} producerInfo={producerInfo} /></Tab.Pane> },
      { menuItem: 'Producer JSON', render: () => <Tab.Pane><ProducersModalInfoData producerInfo={producerInfo} /></Tab.Pane> },
    ];
    return (
      <Modal
        closeIcon
        onClose={onClose}
        open={!!(viewing)}
      >
        <Modal.Header>
          {t('producers_info_header', { producer: viewing })}
        </Modal.Header>
        <Modal.Content>
          <Tab panes={panes} />
        </Modal.Content>
      </Modal>
    );
  }
}

export default translate('producers')(ProducersModalInfo);
