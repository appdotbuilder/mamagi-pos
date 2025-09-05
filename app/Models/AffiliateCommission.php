<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\AffiliateCommission
 *
 * @property int $id
 * @property int $affiliate_id
 * @property int $order_id
 * @property string $order_amount
 * @property string $commission_rate
 * @property string $commission_amount
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $paid_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Affiliate $affiliate
 * @property-read \App\Models\Order $order
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission query()
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission whereAffiliateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission whereOrderAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission whereCommissionRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission whereCommissionAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission wherePaidAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AffiliateCommission whereUpdatedAt($value)
 * @method static \Database\Factories\AffiliateCommissionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AffiliateCommission extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'affiliate_id',
        'order_id',
        'order_amount',
        'commission_rate',
        'commission_amount',
        'status',
        'paid_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'order_amount' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    /**
     * Get the affiliate that owns the commission.
     */
    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    /**
     * Get the order associated with the commission.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}