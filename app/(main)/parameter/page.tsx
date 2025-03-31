
//import { List } from '../../src/views/Parameter/ParameterList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { List } from '../../../src/views/Parameter/ParameterList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <List />
  );
}
