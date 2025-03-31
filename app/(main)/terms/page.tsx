
//import { List } from '../../src/views/Terms/TermsList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { List } from '../../../src/views/Terms/TermsList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <List  />
  );
}
