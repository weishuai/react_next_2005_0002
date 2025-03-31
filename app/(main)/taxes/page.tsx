
//import { List } from '../../src/views/Taxes/TaxesList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { List } from '../../../src/views/Taxes/TaxesList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <List />
  );
}
