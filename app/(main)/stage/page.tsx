
//import { List } from '../../src/views/Stage/StageList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { List } from '../../../src/views/Stage/StageList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <List />
  );
}
