import React from 'react';
import { styled } from 'linaria/react';
import { css } from 'linaria';
import MaxWidth from '../../Layout/MaxWidth';
import Image from '@jetshop/ui/Image/Image';
import { TrendLink } from '../../ui/Button';

import { theme } from '../../Theme';

const StartPageHeroWrapper = styled(MaxWidth)`
  height: 600px;
  ${theme.below.xl} {
    padding: 0px;
  }
  ${theme.below.md} {
    padding: 0px;
    height: 400px;
  }
`;
const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  height: 100%;
  text-align: center;
`;
const Title = styled('h1')`
  font-size: 64px;
  font-weight: 900;
  margin-bottom: 18px;
  ${theme.below.md} {
    font-size: 30px;
    margin-bottom: 12px;
  }
`;

const Description = styled('p')`
  width: 420px;
  font-size: 20px;
  max-width: 100%;
  margin-bottom: 30px;
  line-height: 1.45em;
  ${theme.below.md} {
    width: 100%;
    font-size: 16px;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
`;

const StyledButton = styled(TrendLink)`
  width: 176px;
  height: 46px;
  ${theme.below.sm} {
    width: 138px;
    height: 32px;
    font-size: 14px;
  }
`;

const heroStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartPageHero = ({
  header,
  text,
  buttonText,
  buttonLink,
  imageSrc,
  isAboveFold
}) => (
  <StartPageHeroWrapper>
    <Image
      fillAvailableSpace={true}
      src={imageSrc.value}
      className={heroStyles}
      critical={isAboveFold?.value}
      focalPointY={imageSrc.value?.focalPointY}
      focalPointX={imageSrc.value?.focalPointX}
      aspect={'2:1'}
    >
      <Container>
        <Title>{header.value}</Title>
        <Description>{text.value}</Description>
        <StyledButton to={buttonLink.value}>{buttonText.value}</StyledButton>
      </Container>
    </Image>
  </StartPageHeroWrapper>
);

export default StartPageHero;
