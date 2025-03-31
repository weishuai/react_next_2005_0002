
//import { ContacPersonList } from '../../src/views/ContacPerson/ContacPersonList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ContacPersonList } from '../../../src/views/ContacPerson/ContacPersonList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <ContacPersonList />
  );
}
