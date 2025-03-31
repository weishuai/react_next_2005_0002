"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { MyBomProductList } from '../../../src/views/MyBomProduct/MyBomProductList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <MyBomProductList />

  );
}
