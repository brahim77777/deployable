<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Response::json([
            'categories' => CategoryResource::collection($categories),
            'total' => $categories->count()
        ]);
    }

    public function show(Category $category)
    {
        $products = $category->products()->with("category")->paginate(20);

        return Inertia::render("CategoryPage", ["products" => ProductResource::collection($products)]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate(['title' => 'required|min:2|max:255|unique:categories,title']);
            $title = $request->title;
            Category::create(["title" => $title]);
            return Response::json(["success" => true]);
        } catch (\Exception $e) {
            $failedRule = $e->validator->failed();
            $failedRuleKey = array_key_first($failedRule);
            $failedRuleName = $e->validator->getMessageBag()->get($failedRuleKey)[0];

            return Response::json([
                "error" => "The {$failedRuleName} rule is not validated",
            ], 422);
        }
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return Response::json(["success" => true]);
    }
}
