import React from 'react';
import { styled } from 'linaria/react';
import { ReactComponent as FacebookLogo } from '@jetshop/ui/svg/facebook.svg';
import { ReactComponent as InstagramLogo } from '@jetshop/ui/svg/instagram.svg';
import { theme } from '../../Theme';

const Wrapper = styled('div')`
  margin-right: 0;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    ${theme.above.md} {
      margin-top: 0;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  li {
    margin: 0 0.5rem;
  }

  a.social-links {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  color: ${theme.colors.black};
`;

const LogoWrapper = styled('span')`
  background: ${theme.colors.black};
  width: 1.375rem;
  height: 1.375rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  ${theme.below.md} {
    margin-right: 0.25rem;
  }
  svg {
    width: 12px;
    max-height: 80%;
  }
`;

const SocialLinks = ({ showLabel = true }) => (
  <Wrapper>
    <ul>
      <li>
        <a className="social-links" aria-label="Facebook" href="/">
          <LogoWrapper>
            <FacebookLogo />
          </LogoWrapper>
          {showLabel && <label>Facebook</label>}
        </a>
      </li>
      <li>
        <a className="social-links" aria-label="Instagram" href="/">
          <LogoWrapper>
            <InstagramLogo />
          </LogoWrapper>
          {showLabel && <label>Instagram</label>}
        </a>
      </li>
    </ul>
  </Wrapper>
);

export default SocialLinks;
