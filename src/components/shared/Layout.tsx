import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/shared/Sidebar';
import Navbar from '@/components/shared/Navbar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar for desktop/tablet (lg and above) */}
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for mobile/tablet (below lg) */}
        <Sidebar />
        
        {/* Main content area */}
        <main className={cn(
          "flex-1 flex flex-col overflow-hidden"
          // No top padding needed since we have proper navbars
        )}>
          {/* Content area with proper spacing and scrolling */}
          <div className="flex-1 overflow-y-auto p-6">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
