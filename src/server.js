import React from 'react';
import { createApp } from '@jetshop/core/boot/server';
import Shop from './components/Shop';
import config from './shop.config';

export default createApp(<Shop />, config);
