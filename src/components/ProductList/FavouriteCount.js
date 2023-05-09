import { useProductList } from '@jetshop/core/hooks/ProductList';
import t from '@jetshop/intl';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HeartSVG } from '../../svg/Heart.svg';
import Badge from '../ui/Badge';

export function FavouriteCount({ className, listId }) {
  const { count } = useProductList(listId);

  return (
    <Link to="/favourites" className={className}>
      <div className="badge-svg-wrapper">
        {count > 0 && <Badge text={count} />}
        <HeartSVG />
      </div>
      <span>{t('Favourites')}</span>
    </Link>
  );
}
