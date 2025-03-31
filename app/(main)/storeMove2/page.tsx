"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { StoreMoveList } from '../../../src/views/StoreMove/StoreMoveList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <StoreMoveList />

  );
}
