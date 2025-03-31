"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FhtestFht1List } from '../../../src/views/myFhtestFht2/FhtestFht1List';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <FhtestFht1List />

  );
}
