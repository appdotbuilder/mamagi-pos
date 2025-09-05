import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Promotions', href: '/promotions' },
];

interface Promotion {
    id: number;
    name: string;
    description: string;
    discount_type: string;
    discount_value: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    created_at: string;
    products: Array<{
        id: number;
        name: string;
        price: string;
    }>;
}

interface Props {
    promotions: {
        data: Promotion[];
        links: Record<string, unknown>;
        meta: Record<string, unknown>;
    };
    [key: string]: unknown;
}

export default function PromotionIndex({ promotions }: Props) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user?.role === 'admin';

    const getPromotionStatus = (promotion: Promotion) => {
        const now = new Date();
        const startDate = new Date(promotion.start_date);
        const endDate = new Date(promotion.end_date);
        
        if (!promotion.is_active) return { status: 'Inactive', color: 'bg-gray-100 text-gray-800' };
        if (now < startDate) return { status: 'Upcoming', color: 'bg-blue-100 text-blue-800' };
        if (now > endDate) return { status: 'Expired', color: 'bg-red-100 text-red-800' };
        return { status: 'Active', color: 'bg-green-100 text-green-800' };
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Promotions - mamagi POS" />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {isAdmin ? '🎯 Promotion Management' : '🎉 Special Offers'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            {isAdmin ? 'Create and manage daily food promotions' : 'Amazing deals on your favorite items'}
                        </p>
                    </div>
                    {isAdmin && (
                        <Link
                            href={route('promotions.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            ➕ Create Promotion
                        </Link>
                    )}
                </div>

                {/* Filters */}
                {isAdmin && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow">
                        <div className="flex flex-wrap gap-4">
                            <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="current">Current</option>
                                <option value="inactive">Inactive</option>
                                <option value="expired">Expired</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Promotions Grid */}
                <div className="grid gap-6">
                    {promotions.data.map((promotion) => {
                        const statusInfo = getPromotionStatus(promotion);
                        
                        return (
                            <div
                                key={promotion.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="p-6">
                                    {/* Promotion Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                {promotion.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {promotion.description}
                                            </p>
                                        </div>
                                        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${statusInfo.color}`}>
                                            {statusInfo.status}
                                        </span>
                                    </div>

                                    {/* Promotion Details */}
                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Discount</div>
                                            <div className="text-2xl font-bold text-orange-600">
                                                {promotion.discount_type === 'percentage' 
                                                    ? `${promotion.discount_value}% OFF` 
                                                    : `$${promotion.discount_value} OFF`}
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Start Date</div>
                                            <div className="font-semibold text-blue-600">
                                                {formatDate(promotion.start_date)}
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">End Date</div>
                                            <div className="font-semibold text-purple-600">
                                                {formatDate(promotion.end_date)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Included Products */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            🍽️ Included Items ({promotion.products.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {promotion.products.slice(0, 5).map((product) => (
                                                <span
                                                    key={product.id}
                                                    className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                                                >
                                                    {product.name}
                                                    <span className="ml-1 text-green-600 font-medium">${product.price}</span>
                                                </span>
                                            ))}
                                            {promotion.products.length > 5 && (
                                                <span className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                                                    +{promotion.products.length - 5} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <Link
                                            href={route(isAdmin ? 'promotions.show' : 'products.browse', promotion.id)}
                                            className="flex-1 text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            {isAdmin ? 'Manage Promotion' : 'View Items'}
                                        </Link>
                                        {!isAdmin && statusInfo.status === 'Active' && (
                                            <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                                                🛒 Shop Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {promotions.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎯</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Promotions Found</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {isAdmin ? 'Start by creating your first promotion to boost sales.' : 'No special offers available right now. Check back later!'}
                        </p>
                        {isAdmin && (
                            <Link
                                href={route('promotions.create')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                ➕ Create First Promotion
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}