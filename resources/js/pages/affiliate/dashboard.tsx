import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Affiliate Dashboard', href: '/affiliate/dashboard' },
];

interface Affiliate {
    id: number;
    full_name: string;
    referral_code: string;
    commission_rate: string;
    total_earnings: string;
    pending_earnings: string;
    paid_earnings: string;
    status: string;
    approved_at: string | null;
    commissions: Array<{
        id: number;
        order_amount: string;
        commission_amount: string;
        status: string;
        created_at: string;
        order: {
            id: number;
            order_number: string;
            total: string;
            status: string;
        };
    }>;
    referredOrders: Array<{
        id: number;
        order_number: string;
        total: string;
        status: string;
        created_at: string;
    }>;
}

interface Stats {
    total_referrals: number;
    total_earnings: string;
    pending_earnings: string;
    paid_earnings: string;
}

interface Props {
    affiliate: Affiliate;
    stats: Stats;
    [key: string]: unknown;
}

export default function AffiliateDashboard({ affiliate, stats }: Props) {
    const referralLink = `${window.location.origin}/browse/products?ref=${affiliate.referral_code}`;

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralLink);
        // You could add a toast notification here
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Affiliate Dashboard - mamagi POS" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                💰 Affiliate Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Track your referrals and earnings with mamagi's affiliate program
                            </p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(affiliate.status)}`}>
                            Status: {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
                        </span>
                    </div>
                </div>

                {/* Account Status Alert */}
                {affiliate.status === 'pending' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <span className="text-yellow-400">⏳</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">Account Under Review</h3>
                                <p className="mt-1 text-sm text-yellow-700">
                                    Your affiliate application is being reviewed. You'll be notified once approved.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {affiliate.status === 'rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <span className="text-red-400">❌</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Application Rejected</h3>
                                <p className="mt-1 text-sm text-red-700">
                                    Your affiliate application was not approved. Please contact support for more information.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Referrals</h3>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.total_referrals}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</h3>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    ${stats.total_earnings}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                                <span className="text-2xl">⏳</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</h3>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    ${stats.pending_earnings}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Paid Out</h3>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    ${stats.paid_earnings}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Referral Link */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        🔗 Your Referral Link
                    </h2>
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            value={referralLink}
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <button
                            onClick={copyReferralLink}
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            📋 Copy
                        </button>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="mr-2">💡</span>
                        Share this link with friends to earn {affiliate.commission_rate}% commission on their orders
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Commissions */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            💵 Recent Commissions
                        </h2>
                        <div className="space-y-3">
                            {affiliate.commissions.slice(0, 5).map((commission) => (
                                <div key={commission.id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            Order #{commission.order.order_number}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(commission.created_at)}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-green-600">
                                            +${commission.commission_amount}
                                        </div>
                                        <div className={`text-xs px-2 py-1 rounded ${commission.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {commission.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {affiliate.commissions.length === 0 && (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <div className="text-4xl mb-2">💸</div>
                                    <div>No commissions yet. Start referring customers!</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Referrals */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            👥 Recent Referrals
                        </h2>
                        <div className="space-y-3">
                            {affiliate.referredOrders.slice(0, 5).map((order) => (
                                <div key={order.id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            Order #{order.order_number}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(order.created_at)}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            ${order.total}
                                        </div>
                                        <div className={`text-xs px-2 py-1 rounded ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {affiliate.referredOrders.length === 0 && (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <div className="text-4xl mb-2">👥</div>
                                    <div>No referrals yet. Share your link to get started!</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        href={route('affiliate.profile')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        ⚙️ Manage Profile
                    </Link>
                    <Link
                        href={route('public.products')}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                        🍽️ View Products
                    </Link>
                    <Link
                        href={route('public.promotions')}
                        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        🎯 View Promotions
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}