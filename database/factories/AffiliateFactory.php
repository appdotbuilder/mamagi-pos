<?php

namespace Database\Factories;

use App\Models\Affiliate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Affiliate>
 */
class AffiliateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'full_name' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'payment_method' => fake()->randomElement(['bank_transfer', 'paypal', 'mobile_money']),
            'payment_details' => fake()->sentence(),
            'referral_code' => Affiliate::generateReferralCode(),
            'commission_rate' => fake()->randomFloat(2, 3.00, 10.00),
            'total_earnings' => fake()->randomFloat(2, 0, 1000.00),
            'pending_earnings' => fake()->randomFloat(2, 0, 200.00),
            'paid_earnings' => fake()->randomFloat(2, 0, 800.00),
            'status' => fake()->randomElement(['pending', 'approved', 'suspended']),
            'approved_at' => fake()->optional(0.7)->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the affiliate is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'approved_at' => now(),
        ]);
    }

    /**
     * Indicate that the affiliate is pending approval.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'approved_at' => null,
        ]);
    }
}