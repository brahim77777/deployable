<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category->title,
            'main_image' => $this->main_image,
            'price' => $this->price,
            'rating' => $this->rating,
            'slug' => $this->slug,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            'description' => $this->description,
            'quantity' => $this->quantity,
            'colors' => $this->colors,
            'sizes' => $this->sizes,
        ];
    }
}
