<?php

namespace Database\Factories;

use App\Models\Affiliate;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AffiliateCommission>
 */
class AffiliateCommissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $orderAmount = fake()->randomFloat(2, 20.00, 200.00);
        $commissionRate = fake()->randomFloat(2, 3.00, 10.00);
        $commissionAmount = ($orderAmount * $commissionRate) / 100;

        return [
            'affiliate_id' => Affiliate::factory(),
            'order_id' => Order::factory(),
            'order_amount' => $orderAmount,
            'commission_rate' => $commissionRate,
            'commission_amount' => $commissionAmount,
            'status' => fake()->randomElement(['pending', 'confirmed', 'paid']),
            'paid_at' => fake()->optional(0.3)->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the commission has been paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'paid_at' => now(),
        ]);
    }

    /**
     * Indicate that the commission is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'paid_at' => null,
        ]);
    }
}