import React from 'react';
import CategoryLink from '@jetshop/ui/CategoryLink';
import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import { useIntl } from '@jetshop/intl';

import { theme } from '../Theme';

const campaignList = css`
  font-size: 0.875rem;
  margin: 0;
  padding: 0;
  span {
    font-weight: 600;
  }
`;

const CampaignLink = styled(CategoryLink)`
  text-decoration: none;
  color: ${theme.colors.blue};
`;

export function Campaigns({ campaigns, className, ...rest }) {
  const t = useIntl();

  if (!campaigns || campaigns.length === 0) {
    return null;
  }

  return (
    <div className={cx(campaignList, className)} {...rest}>
      <span>{t('Included in campaign:')}</span>
      <ul>
        {campaigns.map(campaign => {
          return (
            <li key={campaign.id}>
              <CampaignLink category={campaign}>{campaign.name}</CampaignLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
