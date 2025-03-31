"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { MyWorkList } from '../../../src/views/MyWork/MyWorkList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <MyWorkList />

  );
}
