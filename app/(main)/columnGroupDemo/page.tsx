"use client";
import React from 'react';
import { useTranslation } from 'react-i18next'

import  ColumnGroupDemo from '../../../src/views/ColumnGroupDemo/ColumnGroupList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

    // <div>ok</div>
      <ColumnGroupDemo />
  
  );
}