import React from 'react';
import { css } from 'linaria';
import { useIntl } from '@jetshop/intl';
import ProductLink from '@jetshop/ui/ProductLink';
import { theme } from '../../Theme';

const packageList = css`
  font-size: 0.875rem;
  margin: 0;
  padding: 0;
  span {
    font-weight: 600;
  }
  a {
    text-decoration: none;
    color: ${theme.colors.blue};
  }
`;

export function IncludedInPackages({ packages }) {
  const t = useIntl();

  if (packages?.length === 0) return null;

  return (
    <div className={packageList}>
      <span>{t('Included in package:')}</span>
      <ul>
        {packages.map(pkg => {
          return (
            <li key={pkg.id}>
              <PackageLink pkg={pkg} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PackageLink({ pkg }) {
  return <ProductLink product={pkg}>{pkg.name}</ProductLink>;
}
