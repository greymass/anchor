// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, Image, List, Segment, Table } from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';

import DangerLink from '../../../../Global/Modal/DangerLink';

import KeybaseImage from '../../../../../../renderer/assets/images/keybase.png';
import SteemitImage from '../../../../../../renderer/assets/images/steem.png';
import WechatImage from '../../../../../../renderer/assets/images/wechat.png';

class ProducersModalInfoDetails extends Component<Props> {
  socialLink = (platform) => {
    const {
      producerInfo,
      settings
    } = this.props;
    const identifier = get(producerInfo, `org.social.${platform}`);
    const links = {
      facebook: 'https://facebook.com/__ID__',
      github: 'https://github.com/__ID__',
      keybase: 'https://keybase.io/__ID__',
      reddit: 'https://reddit.com/u/__ID__',
      steemit: 'https://steemit.com/@__ID__',
      telegram: 'https://t.me/__ID__',
      twitter: 'https://twitter.com/__ID__',
      youtube: 'https://youtube.com/__ID__',
    };
    const imageIconMatch = {
      border: '',
      boxShadow: '0 0 0 0.1em rgba(0,0,0,.1) inset',
      display: 'inline-block',
      height: '42px',
      margin: '0 .25rem 0 0',
      padding: '0.7em 0px',
      textAlign: 'center',
      verticalAlign: 'middle',
      width: '42px'
    };
    let icon = (
      <Icon
        bordered
        name={platform}
        size="large"
      />
    );
    if (identifier) {
      const link = (links[platform]) ? links[platform].replace('__ID__', identifier) : false;
      switch (platform) {
        case 'steemit': {
          icon = (
            <span style={imageIconMatch}>
              <Image
                height={21}
                inline
                src={SteemitImage}
              />
            </span>
          );
          break;
        }
        case 'keybase': {
          icon = (
            <span style={imageIconMatch}>
              <Image
                height={21}
                inline
                src={KeybaseImage}
              />
            </span>
          );
          break;
        }
        case 'wechat': {
          icon = (
            <span style={imageIconMatch}>
              <Image
                height={21}
                inline
                src={WechatImage}
              />
            </span>
          );
          break;
        }
        default: {
          // no default
        }
      }
      return (
        <DangerLink
          content={icon}
          link={link}
          settings={settings}
        />
      );
    }
    return false;
  }
  render() {
    const {
      producerInfo,
      settings,
      t
    } = this.props;
    return (
      <React.Fragment>
        <p>
          {t('producer_info_description')}
          <DangerLink
            content={t('producer_info_description_more')}
            link="https://steemit.com/eos/@greymass/an-eos-smart-contract-for-block-producer-information"
            settings={settings}
          />
        </p>
        <Segment.Group basic horizontal>
          <Segment>
            <Header>
              {t('producers_info_links')}
            </Header>
            <List>
              <List.Item>
                <DangerLink
                  content={t('producers_info_website')}
                  link={get(producerInfo, 'org.website')}
                  settings={settings}
                />
              </List.Item>
              <List.Item>
                <DangerLink
                  content={t('producers_info_disclosure')}
                  link={get(producerInfo, 'org.ownership_disclosure')}
                  settings={settings}
                />
              </List.Item>
              <List.Item>
                <DangerLink
                  content={t('producers_info_code_of_conduct')}
                  link={get(producerInfo, 'org.code_of_conduct')}
                  settings={settings}
                />
              </List.Item>
            </List>
            <Header>
              {t('producers_info_social')}
            </Header>
            <div>
              {this.socialLink('steemit')}
              {this.socialLink('twitter')}
              {this.socialLink('youtube')}
              {this.socialLink('facebook')}
              {this.socialLink('github')}
              {this.socialLink('reddit')}
              {this.socialLink('keybase')}
              {this.socialLink('telegram')}
              {this.socialLink('wechat')}
            </div>
          </Segment>
          <Segment>
            <Header>
              {t('producers_info_contact')}
            </Header>
            {t('producers_info_contact_email')}:
            {' '}
            <DangerLink
              content={get(producerInfo, 'org.email')}
              link={`mailto:${get(producerInfo, 'org.email')}`}
              settings={settings}
            />
            <Header>
              {t('producers_info_location')}
            </Header>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {t('producers_info_location_name')}
                  </Table.Cell>
                  <Table.Cell>
                    {get(producerInfo, 'org.location.name')}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    {t('producers_info_location_country')}
                  </Table.Cell>
                  <Table.Cell>
                    {get(producerInfo, 'org.location.country')}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    {t('producers_info_location_latitude')}
                  </Table.Cell>
                  <Table.Cell>
                    {get(producerInfo, 'org.location.latitude')}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    {t('producers_info_location_longitude')}
                  </Table.Cell>
                  <Table.Cell>
                    {get(producerInfo, 'org.location.longitude')}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
        <Header>
          {t('producers_info_nodes_fullnodes')}
        </Header>
        {(producerInfo && producerInfo.nodes)
          ? (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>{t('producers_info_node_type')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_api_endpoint')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_ssl_endpoint')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_name')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_country')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_location')}</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {producerInfo.nodes
                  .filter((node) => (node.node_type === 'full'))
                  .map((node) => (
                    <Table.Row key={node.api_endpoint}>
                      <Table.Cell collapsing>{node.node_type}</Table.Cell>
                      <Table.Cell>{node.api_endpoint}</Table.Cell>
                      <Table.Cell>{node.ssl_endpoint}</Table.Cell>
                      <Table.Cell>{get(node, 'location.name')}</Table.Cell>
                      <Table.Cell>{get(node, 'location.country')}</Table.Cell>
                      <Table.Cell>{get(node, 'location.latitude')}, {get(node, 'location.longitude')}</Table.Cell>
                    </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : false
        }
        <Header>
          {t('producers_info_nodes_seeds')}
        </Header>

        {(producerInfo && producerInfo.nodes)
          ? (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>{t('producers_info_node_type')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_p2p_endpoint')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_bnet_endpoint')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_name')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_country')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('producers_info_node_location')}</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {producerInfo.nodes
                  .filter((node) => (node.node_type === 'seed'))
                  .map((node) => (
                    <Table.Row key={node.api_endpoint}>
                      <Table.Cell collapsing>{node.node_type}</Table.Cell>
                      <Table.Cell>{node.p2p_endpoint}</Table.Cell>
                      <Table.Cell>{node.bnet_endpoint}</Table.Cell>
                      <Table.Cell>{get(node, 'location.name')}</Table.Cell>
                      <Table.Cell>{get(node, 'location.country')}</Table.Cell>
                      <Table.Cell>{get(node, 'location.latitude')}, {get(node, 'location.longitude')}</Table.Cell>
                    </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : false
        }
      </React.Fragment>
    );
  }
}

export default translate('producers')(ProducersModalInfoDetails);
