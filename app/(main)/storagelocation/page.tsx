"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { StoragelocationList } from '../../../src/views/Storagelocation/StoragelocationList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <StoragelocationList />

  );
}
