"use client";
import React from 'react';
import { useTranslation } from 'react-i18next'

import  BasicFilterDemo  from '../../../src/views/DataTableState/DataTableStateList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

    // <div>ok</div>
      <BasicFilterDemo />
  
  );
}
