
//import { FeedbackList } from '../../src/views/Feedback/FeedbackList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FeedbackList } from '../../../src/views/Feedback/FeedbackList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <FeedbackList />
  );
}
