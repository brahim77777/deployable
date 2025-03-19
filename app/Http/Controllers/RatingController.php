<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    //
    public function store(Request $request)
    {

        $review = $request->validate([
            'review.rating' => 'required|integer|between:1,5',
            'review.body' => 'required|min:3',
            'review.slug' => 'required',

        ]);
        $review = Product::where('slug', $review["review"]["slug"])->firstOrFail()->addRating($review["review"]["rating"], $review["review"]["body"]);


    }
}
