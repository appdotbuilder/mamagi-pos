<?php

use App\Http\Controllers\AffiliateApprovalController;
use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\AffiliateDashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PromotionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [];
        
        if (auth()->user()->role === 'admin') {
            $stats = [
                'totalProducts' => \App\Models\Product::count(),
                'activePromotions' => \App\Models\Promotion::active()->count(),
                'todayOrders' => \App\Models\Order::whereDate('created_at', today())->count(),
                'totalRevenue' => \App\Models\Order::where('payment_status', 'paid')->sum('total'),
                'pendingAffiliates' => \App\Models\Affiliate::where('status', 'pending')->count(),
            ];
        }
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    })->name('dashboard');

    // Product Management
    Route::resource('products', ProductController::class);
    Route::resource('promotions', PromotionController::class);
    Route::resource('orders', OrderController::class);
    
    // Affiliate management
    Route::get('affiliates', [AffiliateController::class, 'index'])->name('affiliates.index');
    Route::get('affiliates/{affiliate}', [AffiliateController::class, 'show'])->name('affiliates.show');
    Route::patch('affiliates/{affiliate}/approve', [AffiliateApprovalController::class, 'update'])->name('affiliates.approve');
    Route::patch('affiliates/{affiliate}/reject', [AffiliateApprovalController::class, 'update'])->name('affiliates.reject');

    // User-specific routes
    Route::get('my-orders', function () {
        $orders = auth()->user()->orders()->with(['items.product'])->latest()->paginate(10);
        return Inertia::render('orders/my-orders', ['orders' => $orders]);
    })->name('orders.my');

    Route::get('menu', [ProductController::class, 'index'])->name('products.browse');
    Route::get('menu/{product}', [ProductController::class, 'show'])->name('products.view');

    Route::get('promotions-browse', function () {
        $promotions = \App\Models\Promotion::with('products')->current()->paginate(10);
        return Inertia::render('promotions/browse', ['promotions' => $promotions]);
    })->name('promotions.browse');

    // Affiliate registration and management
    Route::get('affiliate/register', [AffiliateController::class, 'create'])->name('affiliates.create');
    Route::post('affiliate/register', [AffiliateController::class, 'store'])->name('affiliates.store');
    Route::get('affiliate/dashboard', AffiliateDashboardController::class)->name('affiliate.dashboard');
    Route::get('affiliate/profile', function () {
        $affiliate = auth()->user()->affiliate;
        if (!$affiliate) {
            return redirect()->route('affiliates.create');
        }
        return Inertia::render('affiliate/profile', ['affiliate' => $affiliate]);
    })->name('affiliate.profile');
});

// Public product and promotion viewing (for affiliate links)
Route::get('browse/products', function () {
    $products = \App\Models\Product::active()->inStock()->with('promotions')->paginate(12);
    return Inertia::render('public/products', ['products' => $products]);
})->name('public.products');

Route::get('browse/promotions', function () {
    $promotions = \App\Models\Promotion::current()->with('products')->paginate(10);
    return Inertia::render('public/promotions', ['promotions' => $promotions]);
})->name('public.promotions');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';