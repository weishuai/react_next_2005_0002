
//import { ActivityList } from '../../src/views/Activity/ActivityList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ActivityList } from '../../../src/views/Activity/ActivityList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <ActivityList />
  );
}

