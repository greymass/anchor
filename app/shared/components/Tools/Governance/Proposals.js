// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import { Dropdown, Container, Header, Segment } from 'semantic-ui-react';

class ToolsGovernanceProposals extends Component<Props> {
  state = {
    scope: 'eoscanadacom'
  }
  componentDidMount() {
    this.sync();
  }
  onChange = (e, { name, selection, value }) => {
    this.setState({ [name]: value }, () => {
      // If this is the dropdown, fire the submit
      if (selection) {
        this.sync();
      }
    });
  }
  sync = () => {
    const { actions } = this.props;
    const { scope } = this.state;
    actions.getProposals(scope);
  }
  render() {
    const {
      proposals,
      settings,
      t
    } = this.props;
    const {
      scope
    } = this.state;
    const {
      list
    } = proposals;
    let recentOptions = [];
    if (settings && settings.recentProposalsScopes) {
      recentOptions = settings.recentProposalsScopes.map((recentProposalsScope) => ({
        text: recentProposalsScope,
        value: recentProposalsScope,
      }));
    }
    return (
      <Segment basic>
        <Header>
          {t('tools_proposals_header')}
          <Header.Subheader>
            {t('tools_proposals_subheader')}
          </Header.Subheader>
        </Header>
        <Container>
          <Dropdown
            additionLabel=""
            allowAdditions
            defaultValue={this.state.scope}
            fluid
            label={t('tools_proposals_scope_label')}
            name="scope"
            placeholder={t('tools_proposals_scope_placeholder')}
            onChange={this.onChange}
            options={recentOptions}
            search
            selection
            selectOnBlur={false}
            selectOnNavigation={false}
          />
        </Container>
        {(list && list.length)
          ? (
            <Header size="large">
              {t('tools_proposals_scope_selected')}:
              {' '}
              {scope}
            </Header>
          )
          : (
            <Header size="large">
              {t('tools_proposals_no_proposals_in_scope')}:
              {' '}
              {scope}
            </Header>
          )
        }
        {([].concat(list)
          .filter((proposal) => !!proposal.valid)
          .map((proposal) => {
            const {
              json,
              proposal_name,
              title
            } = proposal;
            return (
              <React.Fragment>
                <Header
                  attached="top"
                  block
                  size="huge"
                >
                  {title}
                  <Header.Subheader>
                    {proposal_name} - {json.type}
                  </Header.Subheader>
                </Header>
                <Segment
                  attached="bottom"
                  color="blue"
                  size="large"
                  stacked
                >
                  <ReactMarkdown
                    allowedTypes={['root', 'text', 'break', 'paragraph', 'emphasis', 'strong', 'thematicBreak', 'blockquote', 'list', 'listItem', 'definition', 'heading']}
                    source={json.content}
                    unwrapDisallowed
                  />
                </Segment>

              </React.Fragment>
            );
          })
        )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsGovernanceProposals);
