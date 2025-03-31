"use client";
import React from 'react';
import { useTranslation } from 'react-i18next'

import { DataTableEdit } from '../../../src/views/DataTableEdit/dataTableEditList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <DataTableEdit />
   
  );
}