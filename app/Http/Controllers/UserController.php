<?php

// namespace App\Http\Controllers;

// use App\Models\User;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Response;

// class UserController extends Controller
// {
//     public function index()
//     {
//         return Response::json(["users" => User::simplePaginate(10)]);
//     }
// }
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);

        return Response::json([
            "users" => $users->items(),
            "total" => $users->total(),
            "per_page" => $users->perPage(),
            "current_page" => $users->currentPage(),
            "last_page" => $users->lastPage(),
            "next_page_url" => $users->nextPageUrl(),
            "prev_page_url" => $users->previousPageUrl()
        ]);
    }
    public function destroy(User $user)
    {
        return Response::json(["success" => $user->delete() ? true : false]);

    }
}
