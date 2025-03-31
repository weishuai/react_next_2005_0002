
//import { List } from '../../src/views/Translate/TranslateList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { List } from '../../../src/views/Translate/TranslateList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <List />
  );
}
