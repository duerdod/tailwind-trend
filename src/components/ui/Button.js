import React from 'react';
import { styled } from 'linaria/react';
import { cx } from 'linaria';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import t from '@jetshop/intl';
import { theme } from '../Theme';
import { isRelativeUrl } from '@jetshop/core/helpers/isRelativeUrl';

export const baseStyles = `
  background-color: ${theme.colors.blue};
  border-color: ${theme.colors.blue};
  color: white;
  font-size: 16px;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  height: 54px;
  span {
    margin-right: 12px;
  }
  svg {
    fill: white;
    height: 1em;
    width: 1em;
    margin-right: 1em;
  }
  ${theme.above.md} {
    max-width: 100%;
  }

  :disabled {
    border: 1px solid #dedede;
    opacity: 0.5;
  }

  &.secondary {
    background-color: white;
    border: 1px solid ${theme.colors.darkgrey};
    color: ${theme.colors.darkgrey};
    circle.path {
      stroke: black;
    }
  }

`;

const Button = styled('button')`
  ${baseStyles};
`;

const TrendABase = styled('a')`
  ${baseStyles};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
`;

const TrendLinkBase = styled(Link)`
  ${baseStyles};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
`;

export function TrendLink({ to, ...props }) {
  return typeof to === 'string' && !isRelativeUrl(to) ? (
    <TrendABase href={to} {...props} />
  ) : (
    <TrendLinkBase to={to} {...props} />
  );
}

const StyledSpinner = styled(Spinner)`
  height: 25px;
  circle.path {
    stroke: white;
  }
`;

const ButtonWithLoading = ({
  loading,
  loadingText = t('Hold on a moment...'),
  secondary,
  ...props
}) =>
  loading ? (
    <Button
      {...props}
      className={cx(props.className, secondary && 'secondary')}
    >
      <span>{loadingText}</span>
      <StyledSpinner />
    </Button>
  ) : (
    <Button
      {...props}
      className={cx(props.className, secondary && 'secondary')}
    />
  );

export default ButtonWithLoading;
