'use client';

import React from 'react';
import BookSidebar from './AlgoFlowSidebar';

interface SidebarProps {
  currentModuleId?: string;
  onCloseMobile?: () => void;
  onOpenSearch?: () => void;
}

export default function Sidebar({ currentModuleId, onCloseMobile, onOpenSearch }: SidebarProps) {
  return (
    <BookSidebar
      currentModuleId={currentModuleId}
      onCloseMobile={onCloseMobile}
      onOpenSearch={onOpenSearch}
    />
  );
}
