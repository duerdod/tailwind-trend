import React from 'react';
import { Link } from 'react-router-dom';
import t from '@jetshop/intl';

export default () => (
  <div>
    <h2>{t('About')}</h2>
    <Link to="/">{t('Link')}</Link>
  </div>
);
