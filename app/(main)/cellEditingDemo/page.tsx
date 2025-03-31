"use client";
import React from 'react';
import { useTranslation } from 'react-i18next'

import  CellEditingDemo from '../../../src/views/CellEditingDemo/CellEditingList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

    // <div>ok</div>
      <CellEditingDemo />
  
  );
}
