"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { StoreMoveListList } from '../../../src/views/StoreMoveList/StoreMoveListList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <StoreMoveListList />

  );
}
