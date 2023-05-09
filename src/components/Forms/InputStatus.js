import React from 'react';
import { ReactComponent as InputErrorSVG } from '../../svg/InputError.svg';
import { ReactComponent as InputPositiveSVG } from '../../svg/InputPositive.svg';
import { ReactComponent as ViewPasswordSVG } from '../../svg/ViewPassword.svg';
import t from '@jetshop/intl';
import { styled } from 'linaria/react';

const StatusRelativeWrapper = styled('div')`
  position: relative;

  &.hidden {
    opacity: 0.5;
    :hover {
      opacity: 1;
    }
  }
`;

const StatusWrapper = styled('div')`
  position: absolute;
  right: 0px;
  margin-right: 10px;
  top: -34px;
`;

const PasswordStatusWrapper = styled(StatusWrapper)`
  margin-right: -1.5em;
  top: -32px;
  button {
    background: inherit;
  }
`;
export const InputError = () => (
  <StatusRelativeWrapper>
    <StatusWrapper className="status-wrapper">
      <InputErrorSVG />
    </StatusWrapper>
  </StatusRelativeWrapper>
);

export const InputPositive = () => (
  <StatusRelativeWrapper>
    <StatusWrapper className="status-wrapper">
      <InputPositiveSVG />
    </StatusWrapper>
  </StatusRelativeWrapper>
);

export function ToggleViewPasswordButton(props) {
  return (
    <StatusRelativeWrapper className={props.className}>
      <PasswordStatusWrapper>
        <button
          tabIndex="-1"
          aria-label={t('View password')}
          type="button"
          {...props}
        >
          <ViewPasswordSVG />
        </button>
      </PasswordStatusWrapper>
    </StatusRelativeWrapper>
  );
}
