
//import { ClientList } from '../../src/views/Client/ClientList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ClientList } from '../../../src/views/Client/ClientList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <ClientList />
  );
}
