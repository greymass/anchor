// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Modal } from 'semantic-ui-react';

class ModalConstitution extends Component<Props> {
  state = { open: false }

  componentWillReceiveProps(nextProps) {
    const { isUser, settings } = nextProps;
    if (
      isUser
      && !settings.acceptedConstitution
    ) {
      this.setState({ open: true });
    }
  }

  accept = () => {
    const { actions } = this.props;
    this.setState({ open: false }, () => {
      actions.setSetting('acceptedConstitution', true);
    });
  }

  render() {
    const {
      isUser,
      settings,
      t
    } = this.props;
    const {
      open
    } = this.state;
    return (
      <Modal
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        open={open}
      >
        <Modal.Header>
          {t('constitution_title')}
        </Modal.Header>
        <Modal.Content>
          <Header>
            {t('constitution_preface')}
          </Header>
          <Header size="small">{t('constitution_article_01_title')}</Header>
          <p>{t('constitution_article_01_body')}</p>
          <Header size="small">{t('constitution_article_02_title')}</Header>
          <p>{t('constitution_article_02_body')}</p>
          <Header size="small">{t('constitution_article_03_title')}</Header>
          <p>{t('constitution_article_03_body')}</p>
          <Header size="small">{t('constitution_article_04_title')}</Header>
          <p>{t('constitution_article_04_body')}</p>
          <Header size="small">{t('constitution_article_05_title')}</Header>
          <p>{t('constitution_article_05_body')}</p>
          <Header size="small">{t('constitution_article_06_title')}</Header>
          <p>{t('constitution_article_06_body')}</p>
          <Header size="small">{t('constitution_article_07_title')}</Header>
          {/* todo: fix json loading for sections 7, 18, 24, 32 */}
          <p>Block producers shall be paid each day by dividing the daily share of 1 percent annual inflation of the entire value of the Telos blockchain as measured in TLOS tokens. Every day, each Block Producer shall be allotted an equal share of the daily pay and each Standby Block Producer shall be allotted one-half of this amount, with the provision that Block Producers and Standby Block Producers may have their daily pay allotment deducted in proportion with the percentage of blocks they were expected to produce in their most recent production period of 24 hours or fewer, but failed to produce. Block producers are responsible for collecting their pay allotment by executing the 'claimrewards' action daily. If loss of pay results from failing to regularly execute the 'claimrewards' action, the loss shall be borne by the Block Producer or Standby Block Producer, not the network.</p>
          <Header size="small">{t('constitution_article_08_title')}</Header>
          <p>{t('constitution_article_08_body')}</p>
          <Header size="small">{t('constitution_article_09_title')}</Header>
          <p>{t('constitution_article_09_body')}</p>
          <Header size="small">{t('constitution_article_10_title')}</Header>
          <p>{t('constitution_article_10_body')}</p>
          <Header size="small">{t('constitution_article_11_title')}</Header>
          <p>{t('constitution_article_11_body')}</p>
          <Header size="small">{t('constitution_article_12_title')}</Header>
          <p>{t('constitution_article_12_body')}</p>
          <Header size="small">{t('constitution_article_13_title')}</Header>
          <p>{t('constitution_article_13_body')}</p>
          <Header size="small">{t('constitution_article_14_title')}</Header>
          <p>{t('constitution_article_14_body')}</p>
          <Header size="small">{t('constitution_article_15_title')}</Header>
          <p>{t('constitution_article_15_body')}</p>
          <Header size="small">{t('constitution_article_16_title')}</Header>
          <p>{t('constitution_article_16_body')}</p>
          <Header size="small">{t('constitution_article_17_title')}</Header>
          <p>{t('constitution_article_17_body')}</p>
          <Header size="small">{t('constitution_article_18_title')}</Header> 
          <p>TAO Arbitrators may charge a fee for arbitration services in the amount of up to 3 percent of the total amount requested in the initial execution of the 'arbitration' contract. Alternative arbitration forums may set their own fees as long as those fees are clearly stated to all prior to contract execution. When the Arbitrators find for the Plaintiff, the amount of the arbitration fee may be added to the judgement about taken from the Respondent. Multiple Arbitrators shall divide any arbitration fee amongst themselves evenly.</p>
          <Header size="small">{t('constitution_article_19_title')}</Header>
          <p>{t('constitution_article_19_body')}</p>
          <Header size="small">{t('constitution_article_20_title')}</Header>
          <p>{t('constitution_article_20_body')}</p>
          <Header size="small">{t('constitution_article_21_title')}</Header>
          <p>{t('constitution_article_21_body')}</p>
          <Header size="small">{t('constitution_article_22_title')}</Header>
          <p>{t('constitution_article_22_body')}</p>
          <Header size="small">{t('constitution_article_23_title')}</Header>
          <p>{t('constitution_article_23_body')}</p>
          <Header size="small">{t('constitution_article_24_title')}</Header>
          <p>A value equal to the daily share of 1.5 percent annual inflation of the entire value of the Telos blockchain as measured in TLOS tokens shall be deposited to the Telos Worker Proposal Fund. Telos Members may submit proposals for the usage of these accumulated funds. Submitting a fund for a proposal shall require payment of a fee determined by the most recent 2/3+1 majority vote of the Block Producers, provided that this fee will never exceed two times the actual cost in network resources of voting the proposal by all Telos Members. Any Telos Member or group of Members may execute the 'workerproposalsubmission' contract by providing the required information including, at least, a full description of the proposal, a link to a fixed source of information, and the exact deposit transaction, including deposit account or accounts, that will occur should the proposal be accepted by the Telos Members. Once submitted, there will be a period of 60 days in which a proposal may be voted. Any proposal that receives no less than 7 percent vote participation among TLOS tokens and a simple majority of Yes votes at the end of 60 days shall enact the proposal and execute the deposit transaction described in the proposal.</p>
          <Header size="small">{t('constitution_article_25_title')}</Header>
          <p>{t('constitution_article_25_body')}</p>
          <Header size="small">{t('constitution_article_26_title')}</Header>
          <p>{t('constitution_article_26_body')}</p>
          <Header size="small">{t('constitution_article_27_title')}</Header>
          <p>{t('constitution_article_27_body')}</p>
          <Header size="small">{t('constitution_article_28_title')}</Header>
          <p>{t('constitution_article_28_body')}</p>
          <Header size="small">{t('constitution_article_29_title')}</Header>
          <p>{t('constitution_article_29_body')}</p>
          <Header size="small">{t('constitution_article_30_title')}</Header>
          <p>{t('constitution_article_30_body')}</p>
          <Header size="small">{t('constitution_article_31_title')}</Header>
          <p>{t('constitution_article_31_body')}</p>
          <Header size="small">{t('constitution_article_32_title')}</Header>
          <p>This Agreement and its subordinate documents, including the human-language sections of various system contracts (the 'Telos Governance Documents'), may be amended by a vote of the TLOS token holders using the 'ratifyamend' contract. To ratify or amend any Telos Governance Document, any user may execute the 'ratifyamend' contract, paying its contract fee, which is equal to the cost of executing the 'ratifyamend' contract, in system resources, at the time it is fully executed. This fee may be paid by one Member or collected from many Members over time to execute when the full cost has been collected. Once the fee has been fully paid, the full text of the proposed new document, or the existing document in the case of ratification, shall be recorded to the Telos blockchain. No Telos Governance Documents shall be ratified or amended except by a vote of the TLOS token holders, as recorded by the 'ratifyamend' contract with no less than 15 percent vote participation among TLOS tokens and no fewer than 10 percent more Yes than No votes, sustained for 30 continuous days within a 120 day.</p>
          <Header size="small">{t('constitution_article_33_title')}</Header>
          <p>{t('constitution_article_33_body')}</p>
          <Header size="small">{t('constitution_article_34_title')}</Header>
          <p>{t('constitution_article_34_body')}</p>
          <Header size="small">{t('constitution_article_35_title')}</Header>
          <p>{t('constitution_article_35_body')}</p>
          <Header size="small">{t('constitution_article_36_title')}</Header>
          <p>{t('constitution_article_36_body')}</p>
          <Header size="small">{t('constitution_article_37_title')}</Header>
          <p>{t('constitution_article_37_body')}</p>
          <Header size="small">{t('constitution_article_38_title')}</Header>
          <p>{t('constitution_article_38_body')}</p>
          <Header size="small">{t('constitution_article_39_title')}</Header>
          <p>{t('constitution_article_39_body')}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t('constitution_accept')}
            icon="external"
            labelPosition="right"
            onClick={this.accept}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('constitution')(ModalConstitution);
