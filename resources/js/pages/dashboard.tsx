import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardStats {
    totalProducts: number;
    activePromotions: number;
    todayOrders: number;
    totalRevenue: string;
    pendingAffiliates: number;
}

interface Props {
    stats?: DashboardStats;
    [key: string]: unknown;
}

export default function Dashboard({ stats }: Props) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const isAdmin = user?.role === 'admin';
    const isAffiliate = user?.role === 'affiliate';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - mamagi POS" />
            
            <div className="p-6">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {user?.name}! 🍽️
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        {isAdmin && "Manage your restaurant's operations from here"}
                        {isAffiliate && "Track your referrals and earnings"}
                        {!isAdmin && !isAffiliate && "Explore our delicious menu and special offers"}
                    </p>
                </div>

                {/* Admin Dashboard */}
                {isAdmin && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                                <div className="flex items-center">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <span className="text-2xl">📦</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Products</h3>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stats?.totalProducts || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                                <div className="flex items-center">
                                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                        <span className="text-2xl">🎯</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Promotions</h3>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stats?.activePromotions || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                                <div className="flex items-center">
                                    <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                        <span className="text-2xl">📋</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Orders</h3>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stats?.todayOrders || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                                <div className="flex items-center">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            ${stats?.totalRevenue || '0.00'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Link
                                href={route('products.index')}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">📦</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Products</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Manage your menu items, pricing, and inventory levels.
                                </p>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">Manage Products →</span>
                            </Link>

                            <Link
                                href={route('promotions.index')}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">🎯</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Promotions</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Create and manage daily food promotions and special offers.
                                </p>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">Manage Promotions →</span>
                            </Link>

                            <Link
                                href={route('orders.index')}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">📋</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Orders</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Process orders, track status, and manage payments.
                                </p>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">View Orders →</span>
                            </Link>

                            <Link
                                href={route('affiliates.index')}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">👥</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Affiliates</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Manage affiliate partners and commission structures.
                                </p>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">Manage Affiliates →</span>
                            </Link>
                        </div>
                    </>
                )}

                {/* Affiliate Dashboard */}
                {isAffiliate && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
                            <h2 className="text-2xl font-bold mb-2">💰 Affiliate Dashboard</h2>
                            <p>Track your referrals and earnings with mamagi's affiliate program</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Referrals</h3>
                                <p className="text-3xl font-bold text-blue-600">0</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pending Earnings</h3>
                                <p className="text-3xl font-bold text-yellow-600">$0.00</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Paid Earnings</h3>
                                <p className="text-3xl font-bold text-green-600">$0.00</p>
                            </div>
                        </div>

                        <Link
                            href={route('affiliate.dashboard')}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View Full Affiliate Dashboard →
                        </Link>
                    </div>
                )}

                {/* Regular User Dashboard */}
                {!isAdmin && !isAffiliate && (
                    <div className="space-y-6">
                        {/* Current Promotions */}
                        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-6 text-white">
                            <h2 className="text-2xl font-bold mb-2">🎯 Today's Special Offers</h2>
                            <p>Don't miss out on our amazing daily food promotions!</p>
                        </div>

                        {/* Action Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Link
                                href={route('products.index')}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">🍕</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Browse Menu</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Explore our delicious selection of food items and beverages.
                                </p>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">View Menu →</span>
                            </Link>

                            <Link
                                href={route('promotions.index')}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">🎉</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Special Offers</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Check out today's promotions and save on your favorite items.
                                </p>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">View Offers →</span>
                            </Link>

                            <Link
                                href={route('orders.index')}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">📋</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">My Orders</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Track your order history and current order status.
                                </p>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">View Orders →</span>
                            </Link>

                            <Link
                                href={route('affiliates.create')}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">💰</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Become an Affiliate</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Earn commissions by referring customers to our restaurant.
                                </p>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">Join Program →</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}