"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { MyTbmatchinglineList } from '../../../src/views/MyTbmatchingline/MyTbmatchinglineList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <MyTbmatchinglineList />

  );
}
