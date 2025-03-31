
//import { JobList } from '../../src/views/Job/JobList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { JobList } from '../../../src/views/Job/JobList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <JobList />
  );
}
