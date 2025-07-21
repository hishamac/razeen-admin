import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/shared/Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - 20% width on desktop, overlay on mobile */}
      <Sidebar />
      
      {/* Main content area - 80% width on desktop, full width on mobile */}
      <main className={cn(
        "flex-1 flex flex-col overflow-hidden",
        // Add left padding on mobile to account for the menu button
        "pt-16 md:pt-0"
      )}>
        {/* Content area with proper spacing and scrolling */}
        <div className="flex-1 overflow-auto p-6">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default Layout;
