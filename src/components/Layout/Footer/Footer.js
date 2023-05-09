import t from '@jetshop/intl';
import { Above } from '@jetshop/ui/Breakpoints';
import JetshopText from '@jetshop/ui/JetshopText';
import React from 'react';
import { styled } from 'linaria/react';
import FooterLinks from './FooterLinks';
import MaxWidth from '../MaxWidth';
import SocialLinks from './SocialLinks';
import NewsletterField from '../../Newsletter/NewsletterField';
import { theme } from '../../Theme';

const backgroundColor = '#ffffff';

const PoweredByWrapper = styled('div')``;

const Wrapper = styled('section')`
  text-align: left;
  font-size: 16px;
  address {
    font-style: normal;
  }

  ${theme.above.md} {
    background: ${backgroundColor};
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  h2 {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .newsletter-container h2 {
    margin-bottom: 1rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a,
  p {
    padding: 0.5rem 0;
  }
  a {
    display: block;
    color: ${theme.colors.black};
    text-decoration: none;
    :hover {
      color: ${theme.colors.blue};
      transition: all 0.3s linear;
    }
  }
`;

const WrapFooterNav = styled(MaxWidth)`
  ${theme.below.md} {
    background: ${backgroundColor};
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  > section {
    margin: 0 2rem 0 0;
    flex: 0 1 25%;
  }

  display: flex;
  justify-content: flex-start;
  flex-direction: row;

  ${theme.below.md} {
    flex-direction: column;
    justify-content: center;
    text-align: center;

    > section {
      margin: 0;
    }
  }

  h2 {
    font-size: 16px;
  }
`;

const NewsletterWrapper = styled('div')`
  ${theme.above.md} {
    margin-left: auto;
    text-align: right;
  }
`;

const Footer = () => (
  <Wrapper>
    <WrapFooterNav>
      <FooterLinks />
      <Above
        breakpoint="md"
        render={() => (
          <section>
            <h2>{t('Address')}</h2>
            <address>
              <p>Företagsgatan 58</p>
              <p>501 77 Borås</p>
              <p>Sweden</p>
            </address>
          </section>
        )}
      />
      <NewsletterWrapper>
        <div className="newsletter-container">
          <NewsletterField />
        </div>
        <PoweredByWrapper>
          <Above breakpoint="md">
            {matches => <SocialLinks showLabel={!matches} />}
          </Above>
          <JetshopText />
        </PoweredByWrapper>
      </NewsletterWrapper>
    </WrapFooterNav>
  </Wrapper>
);

export default Footer;
