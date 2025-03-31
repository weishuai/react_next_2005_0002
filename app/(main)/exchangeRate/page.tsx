
//import { List } from '../../src/views/ExchangeRate/ExchangeRateList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { List } from '../../../src/views/ExchangeRate/ExchangeRateList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <List />
  );
}
