<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Affiliate;
use App\Models\AffiliateCommission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@mamagi.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create regular users
        $users = User::factory()->count(10)->create();

        // Create affiliate user
        $affiliateUser = User::create([
            'name' => 'Affiliate Partner',
            'email' => 'affiliate@mamagi.com',
            'password' => Hash::make('password'),
            'role' => 'affiliate',
            'email_verified_at' => now(),
        ]);

        // Create products with categories
        $pizzas = Product::factory()->count(8)->create([
            'category' => 'Pizza',
            'price' => fake()->randomFloat(2, 12.99, 24.99),
        ]);

        $burgers = Product::factory()->count(6)->create([
            'category' => 'Burger',
            'price' => fake()->randomFloat(2, 8.99, 16.99),
        ]);

        $beverages = Product::factory()->count(5)->create([
            'category' => 'Beverage',
            'price' => fake()->randomFloat(2, 2.99, 6.99),
        ]);

        $desserts = Product::factory()->count(4)->create([
            'category' => 'Dessert',
            'price' => fake()->randomFloat(2, 4.99, 8.99),
        ]);

        $salads = Product::factory()->count(3)->create([
            'category' => 'Salad',
            'price' => fake()->randomFloat(2, 7.99, 13.99),
        ]);

        // Create active promotions
        $weekendSpecial = Promotion::create([
            'name' => 'Weekend Pizza Special',
            'description' => 'Get 25% off all pizza items this weekend!',
            'discount_type' => 'percentage',
            'discount_value' => 25.00,
            'start_date' => now()->startOfWeek()->addDays(5), // Saturday
            'end_date' => now()->startOfWeek()->addDays(6),   // Sunday
            'is_active' => true,
        ]);

        $lunchDeal = Promotion::create([
            'name' => 'Lunch Deal',
            'description' => '$5 off orders over $20 during lunch hours',
            'discount_type' => 'fixed',
            'discount_value' => 5.00,
            'start_date' => now()->subDay(),
            'end_date' => now()->addDays(30),
            'is_active' => true,
        ]);

        $happyHour = Promotion::create([
            'name' => 'Happy Hour Beverages',
            'description' => 'Buy 2 get 1 free on all beverages',
            'discount_type' => 'percentage',
            'discount_value' => 33.33,
            'start_date' => now(),
            'end_date' => now()->addDays(7),
            'is_active' => true,
        ]);

        // Attach products to promotions
        $weekendSpecial->products()->attach($pizzas->pluck('id')->take(5));
        $lunchDeal->products()->attach($burgers->pluck('id')->take(3)->concat($salads->pluck('id')->take(2)));
        $happyHour->products()->attach($beverages->pluck('id'));

        // Create affiliate
        $affiliate = Affiliate::create([
            'user_id' => $affiliateUser->id,
            'full_name' => 'John Affiliate Partner',
            'phone' => '+1-555-0123',
            'payment_method' => 'paypal',
            'payment_details' => 'john.affiliate@paypal.com',
            'referral_code' => 'JOHN2024',
            'commission_rate' => 5.00,
            'status' => 'approved',
            'approved_at' => now()->subDays(30),
        ]);

        // Create orders for regular users
        foreach ($users->take(5) as $user) {
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => Order::generateOrderNumber(),
                'status' => fake()->randomElement(['completed', 'pending', 'preparing']),
                'subtotal' => $subtotal = fake()->randomFloat(2, 15.00, 75.00),
                'discount_amount' => $discount = fake()->randomFloat(2, 0, $subtotal * 0.2),
                'total' => $subtotal - $discount,
                'payment_status' => 'paid',
                'payment_method' => fake()->randomElement(['cash', 'card', 'online']),
                'affiliate_id' => fake()->boolean(30) ? $affiliateUser->id : null,
            ]);

            // Create order items
            $orderProducts = collect([$pizzas, $burgers, $beverages, $desserts, $salads])
                ->flatten()
                ->random(fake()->numberBetween(1, 4));

            foreach ($orderProducts as $product) {
                $quantity = fake()->numberBetween(1, 3);
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_price' => $product->price,
                    'quantity' => $quantity,
                    'total_price' => $product->price * $quantity,
                ]);
            }

            // Create affiliate commission if order has affiliate
            if ($order->affiliate_id) {
                AffiliateCommission::create([
                    'affiliate_id' => $affiliate->id,
                    'order_id' => $order->id,
                    'order_amount' => $order->total,
                    'commission_rate' => $affiliate->commission_rate,
                    'commission_amount' => ((float)$order->total * (float)$affiliate->commission_rate) / 100,
                    'status' => fake()->randomElement(['confirmed', 'paid']),
                    'paid_at' => fake()->boolean(70) ? now()->subDays(random_int(1, 15)) : null,
                ]);

                // Update affiliate earnings
                $commissionAmount = ((float)$order->total * (float)$affiliate->commission_rate) / 100;
                $affiliate->increment('total_earnings', $commissionAmount);
                if (fake()->boolean(70)) {
                    $affiliate->increment('paid_earnings', $commissionAmount);
                } else {
                    $affiliate->increment('pending_earnings', $commissionAmount);
                }
            }
        }

        // Create some pending affiliate applications
        $pendingAffiliates = User::factory()->count(3)->create();
        foreach ($pendingAffiliates as $user) {
            Affiliate::create([
                'user_id' => $user->id,
                'full_name' => $user->name,
                'phone' => fake()->phoneNumber(),
                'payment_method' => fake()->randomElement(['bank_transfer', 'paypal', 'mobile_money']),
                'payment_details' => fake()->sentence(),
                'referral_code' => Affiliate::generateReferralCode(),
                'commission_rate' => 5.00,
                'status' => 'pending',
            ]);
            
            $user->update(['role' => 'affiliate']);
        }

        $this->command->info('POS system seeded with sample data!');
        $this->command->info('Admin login: admin@mamagi.com / password');
        $this->command->info('Affiliate login: affiliate@mamagi.com / password');
    }
}