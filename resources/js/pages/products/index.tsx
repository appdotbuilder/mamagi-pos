import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/products' },
];

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    is_active: boolean;
    category: string;
    created_at: string;
    promotions: Array<{
        id: number;
        name: string;
        discount_type: string;
        discount_value: string;
    }>;
}

interface Props {
    products: {
        data: Product[];
        links: Record<string, unknown>;
        meta: Record<string, unknown>;
    };
    categories: string[];
    [key: string]: unknown;
}

export default function ProductIndex({ products, categories }: Props) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user?.role === 'admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products - mamagi POS" />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {isAdmin ? '📦 Product Management' : '🍽️ Our Menu'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            {isAdmin ? 'Manage your restaurant inventory' : 'Discover our delicious offerings'}
                        </p>
                    </div>
                    {isAdmin && (
                        <Link
                            href={route('products.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            ➕ Add Product
                        </Link>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow">
                    <div className="flex flex-wrap gap-4">
                        <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        
                        {isAdmin && (
                            <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option value="">All Status</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        )}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.data.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                            <div className="p-6">
                                {/* Product Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center space-x-2 ml-2">
                                        {product.is_active ? (
                                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Category */}
                                {product.category && (
                                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mb-2">
                                        {product.category}
                                    </span>
                                )}

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                    {product.description || 'No description available'}
                                </p>

                                {/* Price and Stock */}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-2xl font-bold text-green-600">
                                        ${product.price}
                                    </span>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Stock</div>
                                        <div className={`font-semibold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {product.stock}
                                        </div>
                                    </div>
                                </div>

                                {/* Promotions */}
                                {product.promotions.length > 0 && (
                                    <div className="mb-4">
                                        <div className="text-xs font-semibold text-orange-600 mb-1">🎯 Special Offers:</div>
                                        {product.promotions.map((promo) => (
                                            <div key={promo.id} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded mb-1">
                                                {promo.discount_type === 'percentage' 
                                                    ? `${promo.discount_value}% off` 
                                                    : `$${promo.discount_value} off`}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link
                                        href={route(isAdmin ? 'products.show' : 'products.view', product.id)}
                                        className="flex-1 text-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                                    >
                                        {isAdmin ? 'Manage' : 'View Details'}
                                    </Link>
                                    {!isAdmin && product.is_active && product.stock > 0 && (
                                        <button className="px-3 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors">
                                            🛒 Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {products.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Products Found</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {isAdmin ? 'Start by adding your first product to the menu.' : 'Check back later for delicious options!'}
                        </p>
                        {isAdmin && (
                            <Link
                                href={route('products.create')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                ➕ Add First Product
                            </Link>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {products.data.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex items-center space-x-2">
                            {/* Add pagination controls here */}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}