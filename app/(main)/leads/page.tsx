
//import { LeadsList} from '../../src/views/Leads/LeadsList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { LeadsList} from '../../../src/views/Leads/LeadsList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <LeadsList />
  );
}
