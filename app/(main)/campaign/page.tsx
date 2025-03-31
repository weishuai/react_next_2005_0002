
//import { CampaignList } from '../../src/views/Campaign/CampaignList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { CampaignList } from '../../../src/views/Campaign/CampaignList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <CampaignList />
  );
}

