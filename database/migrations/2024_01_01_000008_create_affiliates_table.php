<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('affiliates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('full_name');
            $table->string('phone');
            $table->enum('payment_method', ['bank_transfer', 'paypal', 'mobile_money']);
            $table->text('payment_details');
            $table->string('referral_code')->unique();
            $table->decimal('commission_rate', 5, 2)->default(5.00);
            $table->decimal('total_earnings', 10, 2)->default(0);
            $table->decimal('pending_earnings', 10, 2)->default(0);
            $table->decimal('paid_earnings', 10, 2)->default(0);
            $table->enum('status', ['pending', 'approved', 'suspended', 'rejected'])->default('pending');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('referral_code');
            $table->index('status');
            $table->index('approved_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliates');
    }
};