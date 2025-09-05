import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="mamagi - Point of Sale System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
                {/* Navigation */}
                <header className="relative z-10">
                    <div className="mx-auto max-w-7xl px-6 py-6">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-3xl">🍽️</span>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">mamagi</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="relative">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                🍽️ mamagi POS
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                                Complete Point of Sale system with daily food promotions and affiliate program. 
                                Perfect for restaurants, cafes, and food businesses looking to grow their revenue.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex justify-center space-x-4 mb-16">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-semibold text-lg rounded-lg hover:bg-orange-700 transform hover:scale-105 transition-all"
                                    >
                                        Start Free Trial
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold text-lg rounded-lg border-2 border-gray-300 hover:border-orange-500 transform hover:scale-105 transition-all"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                            {/* Admin Features */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-4xl mb-4">👨‍💼</div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Admin Control</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li className="flex items-center"><span className="mr-2">✅</span> Product Management</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Inventory Tracking</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Sales Reports</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Order Processing</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Promotion Management</li>
                                </ul>
                            </div>

                            {/* Customer Features */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-4xl mb-4">🛒</div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Customer Experience</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li className="flex items-center"><span className="mr-2">✅</span> Browse Products</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> View Promotions</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Shopping Cart</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Order History</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Easy Ordering</li>
                                </ul>
                            </div>

                            {/* Affiliate Features */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-4xl mb-4">💰</div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Affiliate Program</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li className="flex items-center"><span className="mr-2">✅</span> Referral Links</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Commission Tracking</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Sales Analytics</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Payout Management</li>
                                    <li className="flex items-center"><span className="mr-2">✅</span> Performance Dashboard</li>
                                </ul>
                            </div>
                        </div>

                        {/* Daily Promotions Preview */}
                        <div className="mt-20 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🎯 Daily Food Promotions</h2>
                                <p className="text-gray-600 dark:text-gray-300">Boost sales with targeted daily promotions and special offers</p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6">
                                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Weekend Special</h4>
                                    <p className="text-red-700 dark:text-red-300 text-sm mb-3">25% off all pizza items</p>
                                    <div className="text-xs text-red-600 dark:text-red-400">Valid: Sat-Sun</div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6">
                                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Lunch Deal</h4>
                                    <p className="text-green-700 dark:text-green-300 text-sm mb-3">$5 off orders over $20</p>
                                    <div className="text-xs text-green-600 dark:text-green-400">Valid: 11 AM - 2 PM</div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Happy Hour</h4>
                                    <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">Buy 2 Get 1 Free drinks</p>
                                    <div className="text-xs text-blue-600 dark:text-blue-400">Valid: 3 PM - 6 PM</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="mt-20 text-center">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Ready to Transform Your Food Business?
                                </h2>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Join thousands of restaurants using mamagi to increase sales, manage inventory, 
                                    and grow their customer base with our powerful POS system.
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-semibold text-lg rounded-lg hover:bg-orange-700 transform hover:scale-105 transition-all"
                                >
                                    Get Started Today - It's Free! 🚀
                                </Link>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12 mt-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-4">
                                <span className="text-3xl">🍽️</span>
                                <h3 className="text-2xl font-bold">mamagi</h3>
                            </div>
                            <p className="text-gray-400 mb-8">Complete POS solution for modern food businesses</p>
                            <div className="text-sm text-gray-500">
                                Built with ❤️ for restaurants, cafes, and food entrepreneurs
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}