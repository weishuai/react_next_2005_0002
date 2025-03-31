"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import MyTestList from '../../../src/views/MyTest/MyTestList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <MyTestList/>

  );
}
