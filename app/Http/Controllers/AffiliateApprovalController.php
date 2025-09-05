<?php

namespace App\Http\Controllers;

use App\Models\Affiliate;
use Illuminate\Http\Request;

class AffiliateApprovalController extends Controller
{
    /**
     * Update the specified resource in storage (approve/reject).
     */
    public function update(Request $request, Affiliate $affiliate)
    {
        $action = $request->input('action');
        
        if ($action === 'approve') {
            $affiliate->update([
                'status' => 'approved',
                'approved_at' => now(),
            ]);
            return redirect()->back()
                ->with('success', 'Affiliate approved successfully.');
        }
        
        if ($action === 'reject') {
            $affiliate->update(['status' => 'rejected']);
            return redirect()->back()
                ->with('success', 'Affiliate rejected.');
        }

        return redirect()->back()
            ->with('error', 'Invalid action.');
    }
}