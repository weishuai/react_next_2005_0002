
//import { ServiceContractList } from '../../src/views/ServiceContract/ServiceContractList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ServiceContractList } from '../../../src/views/ServiceContract/ServiceContractList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <ServiceContractList />
  );
}

