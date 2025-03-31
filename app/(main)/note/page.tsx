
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'

import { NoteList } from '../../../src/views/note/NoteList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <NoteList />
  );
}
