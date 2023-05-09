import Accordion from '@jetshop/ui/Accordion/Accordion';
import Link from '@jetshop/ui/CategoryLink';
import { StyledCarrot } from '@jetshop/ui/Select/Components';
import React, { Component } from 'react';
import { styled } from 'linaria/react';
import t from '@jetshop/intl';

const CategoryTree = styled('ul')`
  display: flex;
  flex-direction: column;
  list-style: none;

  flex: 1 0 auto;

  a,
  a:hover {
    text-decoration: none;
  }

  &.root {
    border-top: 1px solid #e7e4e4;
    border-bottom: 1px solid #e7e4e4;
  }
`;
const SubCategories = styled(CategoryTree)`
  padding-left: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e7e4e4;
`;

const CategoryLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  text-decoration: none;
  padding: 1em 1em 0.9375em; /* Adjust for crappy web-font height */
  border-bottom: 1px solid #e7e4e4;
  svg {
    display: none;
    margin-right: 0px;
  }

  &.with-chevron {
    svg {
      display: block;
    }
  }

  position: relative;

  ul li &.active,
  ul li ul li &.active {
    font-weight: bold;
  }

  ul li ul li &,
  ul li:last-child ul li & {
    border-bottom: 1px solid #fff;
  }

  ul li:last-child &,
  ul li ul li:last-child & {
    border-bottom: none;
  }
`;

const CategoryName = styled('h2')`
  font-size: 16px;
  font-weight: 600;
`;

const SubCategory = styled('li')`
  font-size: 0.875rem;
`;

const RootCategory = styled('li')`
  display: flex;
  flex-direction: column;
`;

export default class DrawerMenu extends Component {
  renderSubCategories = category => {
    const { subcategories } = category;
    if (!subcategories || !subcategories.length) return null;
    const { closeMenu } = this.props;
    return (
      <SubCategories>
        <SubCategory>
          <CategoryLink exact category={category} onClick={() => closeMenu()}>
            {t('View all in {category}', { category: category.name })}
          </CategoryLink>
        </SubCategory>
        {subcategories.map(cat => {
          return (
            <SubCategory key={cat.id}>
              <CategoryLink category={cat} onClick={() => closeMenu()} />
            </SubCategory>
          );
        })}
      </SubCategories>
    );
  };

  handleClick = (e, hasChildren, index, handleAccordionClick) => {
    // If there are subcategories, prevent following the link
    const { closeMenu } = this.props;
    if (hasChildren) {
      e.stopPropagation();
      e.preventDefault();
    } else {
      closeMenu();
    }
    handleAccordionClick(index);
  };

  render() {
    const { categories } = this.props;

    if (categories && categories.length > 0) {
      return (
        <CategoryTree className="root">
          <Accordion single>
            {({ openIndexes, handleClick, AccordionContent }) =>
              categories.map((cat, index) => {
                let classNames = [];
                // Give categories with children a chevron
                cat.subcategories.length && classNames.push('with-chevron');
                // Add 'open' class when accordion is opened
                const open = openIndexes.includes(index);
                open && classNames.push('open');

                return (
                  <RootCategory key={cat.id}>
                    <CategoryName>
                      <CategoryLink
                        category={cat}
                        onClick={e =>
                          this.handleClick(
                            e,
                            cat.subcategories.length,
                            index,
                            handleClick
                          )
                        }
                        className={
                          classNames.length > 0 ? classNames.join(' ') : null
                        }
                      >
                        {cat.name}
                        <StyledCarrot open={open} />
                      </CategoryLink>
                    </CategoryName>
                    <AccordionContent isOpen={open}>
                      {this.renderSubCategories(cat)}
                    </AccordionContent>
                  </RootCategory>
                );
              })
            }
          </Accordion>
        </CategoryTree>
      );
    } else return null;
  }
}
