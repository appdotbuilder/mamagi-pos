<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Pizza', 'Burger', 'Pasta', 'Salad', 'Dessert', 'Beverage', 'Appetizer'];
        
        return [
            'name' => fake()->words(random_int(2, 4), true),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 5.99, 29.99),
            'stock' => fake()->numberBetween(0, 100),
            'is_active' => fake()->boolean(85),
            'category' => fake()->randomElement($categories),
            'image_path' => null,
        ];
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => 0,
        ]);
    }

    /**
     * Indicate that the product is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the product is premium priced.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => fake()->randomFloat(2, 25.00, 49.99),
            'name' => 'Premium ' . fake()->words(random_int(2, 3), true),
        ]);
    }
}