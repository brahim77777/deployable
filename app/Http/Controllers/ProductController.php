<?php

// namespace App\Http\Controllers;

// use App\Http\Resources\ProductResource;
// use App\Models\Product;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Response;
// use Inertia\Inertia;

// class ProductController extends Controller
// {
//     public function index()
//     {
//         $products = Product::orderBy("rating", "desc")->with("category")->get();
//         return Inertia::render("ViewAll", ["products" => ProductResource::collection($products)]);
//     }



//     public function show(Request $request)
//     {
//         // dd($request->slug);
//         $product = Product::where('slug', '=', $request->slug, 'and', 'quantity', '>', '0')->with('reviews', 'category')->first();
//         if (!$product) {
//             abort(404);
//         }

//         // dd($product->id);
//         return Inertia::render("ProductDetails", ["product" => $product]);
//     }

//     public function destroy(Product $product)
//     {
//         $product->delete();
//         return Response::json(["success" => true, "products" => ProductResource::collection(Product::paginate(10))]);
//     }
// }

// namespace App\Http\Controllers;

// use App\Http\Resources\ProductResource;
// use App\Models\Product;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Response;
// use Inertia\Inertia;

// class ProductController extends Controller
// {
//     public function index()
//     {
//         $products = Product::orderBy("rating", "desc")->with("category")->paginate(20); // Use pagination for API
//         return response()->json([
//             'products' => ProductResource::collection($products),
//             'last_page' => $products->lastPage(),
//             'current_page' => $products->currentPage(),
//         ]);
//     }

//     public function show(Request $request)
//     {
//         $product = Product::where('slug', $request->slug)
//             ->where('quantity', '>', 0)
//             ->with('reviews', 'category')
//             ->first();
//         if (!$product) {
//             abort(404);
//         }

//         return Inertia::render("ProductDetails", ["product" => $product]);
//     }

//     public function destroy(Product $product)
//     {
//         $product->delete();

//         $products = Product::orderBy("rating", "desc")->with("category")->paginate(10); // Use pagination for updated list
//         return response()->json([
//             "success" => true,
//             "products" => ProductResource::collection($products),
//         ]);
//     }
// }

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'colors' => 'required',
            'sizes' => 'required',
            'category_id' => 'required',
        ]);

        $data["colors"] = implode(',', $data["colors"]);
        $data["sizes"] = implode(',', $data["sizes"]);


        $product->update($data);
        return response()->json(
            [
                "success" => $product->update($data),
                "product" => Product::find($product->id),
            ]
        );
    }
    public function edit(Product $product)
    {
        return Inertia::render("EditProduct", ["product" => $product]);
    }
    private function filtering(Request $request, $query)
    {
        // Initialize the query
        // $query = Product::orderBy("quantity", "desc")->with("category");

        // Apply color filters if they exist
        if ($request->has('colors') && is_array($request->colors)) {
            $query->whereIn('color', $request->colors);
        }

        // Apply size filters if they exist
        if ($request->has('sizes') && is_array($request->sizes)) {
            $query->whereIn('size', $request->sizes);
        }
        $products = $query->paginate(20);
        // return Inertia::json(['products' => ProductResource::collection($products)]);
        return response()->json([
            'products' => ProductResource::collection($products),
            'last_page' => $products->lastPage(),
            'current_page' => $products->currentPage(),
        ]);
    }
    public function index(Request $request)
    {
        // Initialize the query
        $query = Product::orderBy("rating", "desc")->with("category");

        return $this->filtering($request, $query);
    }

    public function getProductById(Request $request)
    {
        $product = Product::find($request->id);

    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'colors' => 'required',
            'sizes' => 'required',
            'category_id' => 'required',
            'secondary_images.*' => 'required|image',
        ]);
        $secondaryImages = $request->file('secondary_images');

        //Store the first image
        $imagePath = $secondaryImages[0]->store('', 'public');
        $data["main_image"] = $imagePath;
        // Store the secondary images
        $counter = 0;
        $secondaryImagePaths = [];
        foreach ($secondaryImages as $image) {
            if ($counter++ == 0)
                continue;
            // $imagePath = $image->store('images', 'public');
            $imagePath = $image->store('', 'public');
            $secondaryImagePaths[] = $imagePath;
        }
        $data["secondary_images"] = implode(',', $secondaryImagePaths);
        $data["colors"] = implode(',', $data["colors"]);
        $data["sizes"] = implode(',', $data["sizes"]);

        do {
            $data["slug"] = Str::random(10);

        } while (Product::where("slug", $data["slug"])->first());

        $data = Product::create($data);
        return response()->json([
            "success" => true,
            "request_data_brahim" => $data,
            "numberOfImages" => count($secondaryImagePaths),
        ]);
    }

    public function show(Request $request)
    {
        $product = Product::where('slug', $request->slug)
            ->where('quantity', '>', 0)
            ->with(['reviews', 'category'])
            ->first();
        // dd($product->reviews);
        if (!$product) {
            abort(404);
        }

        // dd($product);

        return Inertia::render("ProductDetails", ["product" => $product]);
    }
    public function sort(Request $request)
    {
        $sort = $request->validate([
            "order" => 'required',
            "target" => 'required',
        ]);

        // return Inertia::render("Products", ["products" => $products = Product::orderBy($sort["target"], $sort["order"])->with("category")->paginate(10)]);
        return response()->json(
            ["products" => $products = Product::orderBy($sort["target"], $sort["order"])->with("category")->paginate(10)]
        );

    }

    public function paginatedSort(Request $request)
    {
        $sort = $request->validate([
            "order" => 'required',
            "target" => 'required',
        ]);
        if ($sort["target"] == "LastUpdate") {
            $sort["target"] == "updated_at";
        }
        if ($sort["target"] == "CreatedAt") {
            $sort["target"] == "created_at";
        }
        $products = Product::orderBy($sort["target"], $sort["order"])->with("category")->paginate(10);

        // Calculate the page count
        $pageCount = ceil($products->total() / $products->perPage());

        // Pass the products data and page count as props to the Inertia view
        return Inertia::render('Products', [
            'products' => ProductResource::collection($products),
            'pageCount' => $pageCount,
            'total' => $products->total(),
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        $products = Product::orderBy("rating", "desc")->with("category")->paginate(10);
        return response()->json([
            "success" => true,
            "products" => ProductResource::collection($products),
        ]);
    }

    public function newest(Request $request)
    {
        $query = Product::orderBy('updated_at', 'desc')->with('category');
        return $this->filtering($request, $query);

        // return Response::json(['products' => ProductResource::collection($products)]);

    }

    public function bestseller(Request $request)
    {
        $query = Product::orderBy('quantity')->with('category');
        return $this->filtering($request, $query);

    }

    public function command(Request $request)
    {
        // $request->validate([
        // ''
        // ])
    }

}
