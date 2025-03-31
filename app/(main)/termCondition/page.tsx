
//import { List } from '../../src/views/TermCondition/TermConditionList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { List } from '../../../src/views/TermCondition/TermConditionList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <List />
  );
}
