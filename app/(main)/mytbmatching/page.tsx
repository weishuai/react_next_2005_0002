"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { MyTbmatchingList } from '../../../src/views/MyTbmatching/MyTbmatchingList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <MyTbmatchingList />

  );
}
