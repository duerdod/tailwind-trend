import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Category } from '@jetshop/core/types';
import { useRoutePreload } from '@jetshop/core/hooks/useRoutePreload';
import { useHoverIntent } from './useHoverIntent';

export interface CategoryLinkProps extends Partial<NavLinkProps> {
  category: Category;
  className?: string;
}

const CategoryLink: React.FC<CategoryLinkProps> = ({
  category: { id, name, primaryRoute },
  children,
  ...props
}) => {
  const { preload } = useRoutePreload();
  const categoryPreload = () => {
    preload({
      pathname: primaryRoute && primaryRoute.path,
      routeType: 'Category'
    });
  };
  const [, intentRef] = useHoverIntent({
    onHover: () => {
      categoryPreload();
    }
  });

  if (primaryRoute && primaryRoute.path) {
    return (
      <NavLink
        {...props}
        to={{
          pathname: primaryRoute.path,
          state: {
            type: 'Category',
            id
          }
        }}
        innerRef={intentRef as any}
        onTouchStart={categoryPreload}
      >
        {children ? children : name}
      </NavLink>
    );
  } else return null;
};

export { CategoryLink };
