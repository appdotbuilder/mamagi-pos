<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Promotion>
 */
class PromotionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $discountType = fake()->randomElement(['percentage', 'fixed']);
        $startDate = fake()->dateTimeBetween('-7 days', '+7 days');
        
        return [
            'name' => fake()->words(3, true) . ' Special',
            'description' => fake()->sentence(),
            'discount_type' => $discountType,
            'discount_value' => $discountType === 'percentage' 
                ? fake()->randomFloat(2, 5.00, 50.00) 
                : fake()->randomFloat(2, 2.00, 15.00),
            'start_date' => $startDate,
            'end_date' => fake()->dateTimeBetween($startDate, '+30 days'),
            'is_active' => fake()->boolean(80),
        ];
    }

    /**
     * Indicate that the promotion is currently active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_date' => now()->subDay(),
            'end_date' => now()->addDays(7),
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the promotion has expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_date' => now()->subDays(14),
            'end_date' => now()->subDay(),
        ]);
    }
}