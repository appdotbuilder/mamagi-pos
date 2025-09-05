<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 15.00, 150.00);
        $discountAmount = fake()->randomFloat(2, 0, $subtotal * 0.3);
        $total = $subtotal - $discountAmount;

        return [
            'user_id' => User::factory(),
            'order_number' => Order::generateOrderNumber(),
            'status' => fake()->randomElement(['pending', 'confirmed', 'preparing', 'ready', 'completed']),
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount,
            'total' => $total,
            'payment_status' => fake()->randomElement(['pending', 'paid', 'failed']),
            'payment_method' => fake()->randomElement(['cash', 'card', 'online']),
            'notes' => fake()->optional()->sentence(),
            'affiliate_id' => fake()->optional(0.2)->randomDigit() ? User::factory() : null,
        ];
    }

    /**
     * Indicate that the order is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'payment_status' => 'paid',
        ]);
    }

    /**
     * Indicate that the order is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);
    }
}