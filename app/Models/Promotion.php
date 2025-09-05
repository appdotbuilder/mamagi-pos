<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Promotion
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $discount_type
 * @property string $discount_value
 * @property string $start_date
 * @property string $end_date
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion query()
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereDiscountValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion active()
 * @method static \Illuminate\Database\Eloquent\Builder|Promotion current()
 * @method static \Database\Factories\PromotionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Promotion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'discount_type',
        'discount_value',
        'start_date',
        'end_date',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'discount_value' => 'decimal:2',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    /**
     * Get the products associated with the promotion.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'promotion_products');
    }

    /**
     * Scope a query to only include active promotions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include current promotions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCurrent($query)
    {
        $today = now()->toDateString();
        return $query->where('start_date', '<=', $today)
                    ->where('end_date', '>=', $today)
                    ->where('is_active', true);
    }
}