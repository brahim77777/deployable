<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class SearchController extends Controller
{
    //
    public static function search($search = "")
    {
        // dd('something');
        $products = Product::where("title", "like", "%" . $search . "%")->take(5)->get();
        return Response::json(["products" => ProductResource::collection($products)]);
    }
}
