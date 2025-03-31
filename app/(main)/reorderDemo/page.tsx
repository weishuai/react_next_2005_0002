"use client";
import React from 'react';
import { useTranslation } from 'react-i18next'

import  ReorderDemo  from '../../../src/views/ReorderDemo/reorderDemoList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

    // <div>ok</div>
      <ReorderDemo />
  
  );
}
