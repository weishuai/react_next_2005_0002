"use client";
import React from 'react';
import { useTranslation } from 'react-i18next'

import  FlexibleScrollDemo  from '../../../src/views/FlexibleScrollDemo/FlexibleScrollList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

    // <div>ok</div>
      <FlexibleScrollDemo />
  
  );
}
