import React from 'react';
import { styled } from 'linaria/react';
import CategoryLink from '@jetshop/ui/CategoryLink';
import { theme } from '../../../Theme';

const Wrapper = styled('div')`
  flex: 1 1 auto;
  padding-bottom: 0.5em;

  h2 {
    margin-bottom: 0;
    padding-bottom: 0;
    a {
      padding-bottom: 0;
    }
  }

  ul {
    max-height: 8rem;
    justify-content: flex-start;
    align-items: stretch;
    margin: 0;
  }

  li {
    color: #8f8f8f;
    flex: auto;
    max-width: 10rem;
    padding: 0;
    margin: 0;
    a {
      opacity: 1;
      color: #8f8f8f;
      display: block;
      padding: 0.5em;
      :hover,
      &.active {
        color: ${theme.colors.black};
      }
    }
  }
  a {
    text-decoration: none;
    color: ${theme.colors.black};
    opacity: 0.8;
    display: block;
    :hover {
      opacity: 1;
    }
  }
`;

const Heading = styled('h2')``;

const SubMenuSection = ({
  heading,
  categories,
  onMouseOver,
  onSelect = () => {}
}) => {
  return (
    <Wrapper onMouseOver={onMouseOver}>
      <Heading>
        <CategoryLink onClick={onSelect} category={heading}>
          {heading.name}
        </CategoryLink>
      </Heading>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            <CategoryLink onClick={onSelect} category={cat}>
              {cat.name}
            </CategoryLink>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default SubMenuSection;
