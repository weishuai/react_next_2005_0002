
//import { OpportunityList } from '../../src/views/Opportunity/OpportunityList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { OpportunityList } from '../../../src/views/Opportunity/OpportunityList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <OpportunityList />
  );
}
