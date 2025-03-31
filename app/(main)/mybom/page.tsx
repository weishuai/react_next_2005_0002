"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { MybomList } from '../../../src/views/Mybom/MybomList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <MybomList />

  );
}
