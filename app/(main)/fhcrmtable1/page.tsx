
//import { FHcrmTable1List } from '../../src/views/FHcrmTable1/FHcrmTable1List';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FHcrmTable1List } from '../../../src/views/FHcrmTable1/FHcrmTable1List';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <FHcrmTable1List />
  );
}
