<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    use HasFactory;
    protected $fillable = [
        'title',
        'category_id',
        'description',
        'main_image',
        'secondary_images',
        'colors',
        'sizes',
        'price',
        'slug',
        'quantity',
    ];

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function addRating($rating = 5, $body = null)
    {
        return $this->reviews()->create([
            'rating' => $rating,
            'body' => $body,
            'user_id' => auth()->id(),
            'user_name' => auth()->user()->name
        ]);

    }
}
