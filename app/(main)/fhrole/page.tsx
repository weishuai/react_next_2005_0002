
//import { AccountTagList } from '../../src/views/AccountTag/AccountTagList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { RoleList } from '../../../src/views/Role/RoleList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <RoleList />
  );
}
