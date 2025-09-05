import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
                <AppHeader />
                <AppContent>
                    {breadcrumbs.length > 0 && (
                        <div className="mb-6">
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                        </div>
                    )}
                    {children}
                </AppContent>
            </div>
        </AppShell>
    );
}