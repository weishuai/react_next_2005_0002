"use client";
import React from 'react';
import { useTranslation } from 'react-i18next'

import { DataTableReorder } from '../../../src/views/DataTableReorder/DataTableReorderList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <DataTableReorder />

  );
}