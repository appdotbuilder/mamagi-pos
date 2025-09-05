<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePromotionRequest;
use App\Http\Requests\UpdatePromotionRequest;
use App\Models\Product;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Promotion::with('products');

        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->active();
            } elseif ($request->status === 'current') {
                $query->current();
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        $promotions = $query->latest()->paginate(10);

        return Inertia::render('promotions/index', [
            'promotions' => $promotions,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::active()->get();

        return Inertia::render('promotions/create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePromotionRequest $request)
    {
        $validated = $request->validated();
        $productIds = $validated['product_ids'] ?? [];
        unset($validated['product_ids']);

        $promotion = Promotion::create($validated);
        $promotion->products()->sync($productIds);

        return redirect()->route('promotions.show', $promotion)
            ->with('success', 'Promotion created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Promotion $promotion)
    {
        $promotion->load('products');

        return Inertia::render('promotions/show', [
            'promotion' => $promotion,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promotion $promotion)
    {
        $promotion->load('products');
        $products = Product::active()->get();

        return Inertia::render('promotions/edit', [
            'promotion' => $promotion,
            'products' => $products,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePromotionRequest $request, Promotion $promotion)
    {
        $validated = $request->validated();
        $productIds = $validated['product_ids'] ?? [];
        unset($validated['product_ids']);

        $promotion->update($validated);
        $promotion->products()->sync($productIds);

        return redirect()->route('promotions.show', $promotion)
            ->with('success', 'Promotion updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {
        $promotion->delete();

        return redirect()->route('promotions.index')
            ->with('success', 'Promotion deleted successfully.');
    }
}