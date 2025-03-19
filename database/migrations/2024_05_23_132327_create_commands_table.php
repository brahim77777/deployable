<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commands', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('enterprise_name')->nullable();
            $table->string('address');
            $table->string('city');
            $table->string('cin');
            $table->string('phone');
            $table->string('email');
            $table->string('products');
            $table->float('total_price');
            $table->boolean('free_shipping')->default(false);
            $table->enum('status', ["pending", "verified", "paid", "failed", "canceld"]);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commands');
    }
};
