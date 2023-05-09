import React from 'react';
import { styled } from 'linaria/react';
import MaxWidth from '../../Layout/MaxWidth';
import Image from '@jetshop/ui/Image/Image';
import { TrendLink } from '../../ui/Button';
import { Above } from '@jetshop/ui/Breakpoints';

import { theme } from '../../Theme';

const Container = styled('div')`
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  ${theme.below.md} {
    flex-direction: column-reverse;
    padding-top: 40px;
    padding-bottom: 0;
  }
`;

const Title = styled('h1')`
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 18px;
  ${theme.below.md} {
    font-size: 24px;
  }
`;

const Description = styled('p')`
  width: 400px;
  max-width: 100%;
  margin-bottom: 30px;
  line-height: 1.45em;
  ${theme.below.md} {
    font-size: 16px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledButton = styled(TrendLink)`
  width: 176px;
  height: 56px;
  ${theme.below.md} {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Column = styled('div')`
  ${theme.above.md} {
    &:first-child {
      margin-right: 1rem;
    }
    &:last-child {
      margin-left: 60px;
    }
  }
`;

const ImageColumn = styled(Column)`
  height: 386px;
  width: 50%;
  ${theme.below.md} {
    width: 100%;
    padding-bottom: 48px;
  }
`;

const TextColumn = styled(Column)`
  width: 50%;
  ${theme.below.md} {
    width: 100%;
    padding-bottom: 48px;
    text-align: center;
  }

  &.rightAlign {
    text-align: end;
    > * {
      float: right;
    }
  }
`;

const StartPageCampaign = props => {
  if (!props) return null;
  const { imageSrc, alignment, ...rest } = props;
  const rightAlignment = alignment && alignment.value === 'right';
  return (
    <Above breakpoint="md">
      {matches =>
        matches ? (
          <MaxWidth>
            <Container>
              {rightAlignment && <ImageCol src={imageSrc.value} />}
              <CampaignContent
                className={!rightAlignment && 'rightAlign'}
                {...rest}
              />
              {!rightAlignment && <ImageCol src={imageSrc.value} />}
            </Container>
          </MaxWidth>
        ) : (
          <MaxWidth>
            <Container>
              <CampaignContent {...rest} />
              <ImageCol src={imageSrc.value} />
            </Container>
          </MaxWidth>
        )
      }
    </Above>
  );
};

const CampaignContent = ({
  header,
  text,
  buttonText,
  buttonLink,
  className
}) => (
  <TextColumn className={className}>
    <Title>{header.value}</Title>
    <Description>{text.value}</Description>
    <StyledButton to={buttonLink.value}>{buttonText.value}</StyledButton>
  </TextColumn>
);

const ImageCol = ({ src }) => (
  <ImageColumn>
    <Image fillAvailableSpace src={src} sizes={[1, 1, 0.5]} />
  </ImageColumn>
);

export default StartPageCampaign;
