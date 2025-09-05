<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AffiliateDashboardController extends Controller
{
    /**
     * Display the affiliate dashboard.
     */
    public function __invoke()
    {
        $affiliate = auth()->user()->affiliate;

        if (!$affiliate) {
            return redirect()->route('affiliates.create');
        }

        $affiliate->load(['commissions.order', 'referredOrders']);

        $stats = [
            'total_referrals' => $affiliate->referredOrders->count(),
            'total_earnings' => $affiliate->total_earnings,
            'pending_earnings' => $affiliate->pending_earnings,
            'paid_earnings' => $affiliate->paid_earnings,
        ];

        return Inertia::render('affiliate/dashboard', [
            'affiliate' => $affiliate,
            'stats' => $stats,
        ]);
    }
}