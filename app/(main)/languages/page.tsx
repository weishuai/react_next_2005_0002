"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { List } from '../../../src/views/languages/languagesList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <List />
  );
}