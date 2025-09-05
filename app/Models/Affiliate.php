<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Affiliate
 *
 * @property int $id
 * @property int $user_id
 * @property string $full_name
 * @property string $phone
 * @property string $payment_method
 * @property string $payment_details
 * @property string $referral_code
 * @property string $commission_rate
 * @property string $total_earnings
 * @property string $pending_earnings
 * @property string $paid_earnings
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AffiliateCommission> $commissions
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Order> $referredOrders
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate wherePaymentDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereReferralCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereCommissionRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereTotalEarnings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate wherePendingEarnings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate wherePaidEarnings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate approved()
 * @method static \Database\Factories\AffiliateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Affiliate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'full_name',
        'phone',
        'payment_method',
        'payment_details',
        'referral_code',
        'commission_rate',
        'total_earnings',
        'pending_earnings',
        'paid_earnings',
        'status',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'commission_rate' => 'decimal:2',
        'total_earnings' => 'decimal:2',
        'pending_earnings' => 'decimal:2',
        'paid_earnings' => 'decimal:2',
        'approved_at' => 'datetime',
    ];

    /**
     * Get the user that owns the affiliate profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the commissions for the affiliate.
     */
    public function commissions(): HasMany
    {
        return $this->hasMany(AffiliateCommission::class);
    }

    /**
     * Get orders that were referred by this affiliate.
     */
    public function referredOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'affiliate_id', 'user_id');
    }

    /**
     * Scope a query to only include approved affiliates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Generate a unique referral code.
     */
    public static function generateReferralCode(): string
    {
        do {
            $code = strtoupper(uniqid());
        } while (self::where('referral_code', $code)->exists());

        return $code;
    }
}