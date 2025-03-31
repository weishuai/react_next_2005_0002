//import { List } from '../../src/views/Customization/CustomizationList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { List } from '../../../src/views/Customization/CustomizationList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <List />
  );
}
