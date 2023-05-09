import CategoryLink from '@jetshop/ui/CategoryLink';
import React from 'react';
import { styled } from 'linaria/react';
import { theme } from '../../../Theme';
import UIMaxWidth from '../../MaxWidth';
import SubMenuSection from './SubMenuSection';
import AnimateHeight from 'react-animate-height';

const borderColor = '#e8e8e8';

// Limit the menu to our global MaxWidth
const MaxWidth = styled(UIMaxWidth)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: ${theme.colors.black};
    opacity: 0.8;
    display: block;
    padding: 1em 0.5em 1.25em 0.5em;
    :hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
`;

// Set the submenu a minimum of 50% of the browser view, but fit the content
// so it doesn't always extend to 100%.
const ContentFit = styled('div')`
  width: fit-content;
  margin: 0 auto;
  min-width: 50vw;
`;

// We need to put the border here (inside the Wrapper), because if we put it directly
// on the Wrapper it will still be shown when the Wrapper's height is 0
const InnerWrapper = styled('div')`
  border: 1px solid ${borderColor};
  border-width: 1px 0 1px 0;
  width: 100%;
`;

const Wrapper = styled('section')`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  left: 0;
  background: ${theme.colors.white};
  overflow: hidden;
  z-index: 10;
  will-change: height;
  transition: height 0.3s ease-in-out;

  h2 {
    margin-bottom: 0;
    font-weight: 600;
    font-size: 1em;
  }
`;

const NoThirdTierItems = styled('div')`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  h2 {
    font-size: inherit;
  }
`;

const SubMenuWrapper = ({ pose, activeCategory, closeNav, client, data }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <ContentFit>
          <AnimateHeight height={pose === 'open' ? 'auto' : 0} duration={350}>
            <MaxWidth>
              {activeCategory &&
                activeCategory.subcategories.map((cat, index) => (
                  <React.Fragment key={cat.id}>
                    {cat.subcategories.length > 0 ? (
                      <SubMenuSection
                        heading={cat}
                        categories={cat.subcategories}
                        onSelect={closeNav}
                        key={cat.id}
                      />
                    ) : (
                      <NoThirdTierItems key={cat.id}>
                        <h2>
                          <CategoryLink category={cat} onClick={closeNav}>
                            {cat.name}
                          </CategoryLink>
                        </h2>
                      </NoThirdTierItems>
                    )}
                  </React.Fragment>
                ))}
            </MaxWidth>
          </AnimateHeight>
        </ContentFit>
      </InnerWrapper>
    </Wrapper>
  );
};

export default SubMenuWrapper;
