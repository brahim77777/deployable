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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('category_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->text('description');
            $table->string('main_image');
            $table->string('secondary_images');
            $table->string('colors')->nullable();
            $table->string('sizes');
            $table->string('price');
            $table->float('rating')->default(4.5);
            $table->integer('quantity');
            $table->string('slug')->unique();
            $table->softDeletes();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
        Schema::table('products', function (Blueprint $table) {
            $table->dropSoftDeletes();

        });
        Schema::dropIfExists('products');
    }
};
