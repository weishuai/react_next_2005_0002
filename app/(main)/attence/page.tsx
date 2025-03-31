
//import { AttenceList } from '../../src/views/Attence/AttenceList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { AttenceList } from '../../../src/views/Attence/AttenceList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <AttenceList />
  );
}
