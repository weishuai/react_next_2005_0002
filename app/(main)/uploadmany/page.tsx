//import { UserList } from '../../src/views/User/UserList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import UploadManyComponent  from '../../../src/views/UploadMany/UploadManyList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <UploadManyComponent />
  );
}

