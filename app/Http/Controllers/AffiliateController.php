<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAffiliateRequest;
use App\Http\Requests\UpdateAffiliateRequest;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AffiliateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Affiliate::with('user');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $affiliates = $query->latest()->paginate(15);

        return Inertia::render('affiliates/index', [
            'affiliates' => $affiliates,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('affiliates/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAffiliateRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $validated['referral_code'] = Affiliate::generateReferralCode();

        $affiliate = Affiliate::create($validated);

        // Update user role
        auth()->user()->update(['role' => 'affiliate']);

        return redirect()->route('affiliate.dashboard')
            ->with('success', 'Affiliate registration submitted successfully. Please wait for approval.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Affiliate $affiliate)
    {
        $affiliate->load(['user', 'commissions.order']);

        return Inertia::render('affiliates/show', [
            'affiliate' => $affiliate,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Affiliate $affiliate)
    {
        return Inertia::render('affiliates/edit', [
            'affiliate' => $affiliate,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAffiliateRequest $request, Affiliate $affiliate)
    {
        $affiliate->update($request->validated());

        return redirect()->route('affiliates.show', $affiliate)
            ->with('success', 'Affiliate updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Affiliate $affiliate)
    {
        // Update user role back to regular user
        $affiliate->user->update(['role' => 'user']);
        
        $affiliate->delete();

        return redirect()->route('affiliates.index')
            ->with('success', 'Affiliate deleted successfully.');
    }


}