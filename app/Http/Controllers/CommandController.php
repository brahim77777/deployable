<?php

namespace App\Http\Controllers;

use App\Models\Command;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;


class CommandController extends Controller
{
    //
    public function index()
    {
        return response()->json(
            ["commands" => Command::all()]
        );

    }

    public function updateStatus(Request $request, Command $command)
    {
        $status = $request->validate([
            "status" => "required|in:pending,verified,paid,failed,canceld",
        ]);

        $command->status = $status["status"];
        $command->save();
        return response()->json([
            "success" => true,
            "command" => $command
        ]);
    }

    public function show(Request $request, Command $command)
    {
        $products_list = explode(" ", trim($command->products));
        $products = [];
        $counter = 0;
        foreach ($products_list as $products_string) {
            $products[] = Product::find(explode(",", $products_string)[0]);
            $products[$counter]->color = explode(",", $products_string)[1];
            $products[$counter]->size = explode(",", $products_string)[2];
            $products[$counter]->quantity_in_stock = $products[$counter]->quantity;
            $products[$counter]->quantity = explode(",", $products_string)[3];
            $counter++;
        }


        return Inertia::render('CommandDetails', [
            "products" => $products,
            "command" => $command
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            "address" => "nullable",
            "cin" => "required",
            "city" => "required",
            "companyName" => "nullable",
            "country" => "required",
            "email" => "required",
            "firstName" => "required",
            "lastName" => "required",
            "phone" => "required|min:10",
            "shippingMethod" => "required",
            "total" => "required",
            "miniCart" => "required",
        ]);

        $command = [];
        $command["products"] = "";
        foreach ($data["miniCart"] as $item) {
            $command["products"] .= $item["product_id"] . "," . $item["color"] . "," . $item["size"] . "," . $item["quantity"] . " ";
        }

        $data["address"] ? $command["address"] = $data["address"] : $command["address"] = "";
        $data["companyName"] ? $command["companyName"] = $data["companyName"] : $command["companyName"] = "";
        $command["cin"] = $data["cin"];
        $command["city"] = $data["city"];
        $command["companyName"] = $data["companyName"];
        $command["country"] = $data["country"];
        $command["email"] = $data["email"];
        $command["first_name"] = $data["firstName"];
        $command["last_name"] = $data["lastName"];
        $command["phone"] = $data["phone"];
        $command["shippingMethod"] = $data["shippingMethod"];
        $command["total_price"] = $data["total"];
        $command["free_shipping"] = $data["shippingMethod"];
        $command["status"] = "pending";
        $command["products"] = trim($command["products"]);

        $command = Command::create($command);
        return response()->json([
            "success" => true,
            "command_id" => $command->id,
        ]);

    }

    public function update(Request $request, Command $command)
    {
        $data = $request->validate([
            "status" => "required",
            "products" => "required",
            "total_price" => "required",
        ]);

        $command->update($data);
    }
    public function storeCsv()
    {
        $commands = Command::all();
        $csvFile = base_path('/app/Http/Controllers/data/Commands.csv');

        $file = fopen($csvFile, 'w');

        // Check if there are any commands to write
        if ($commands->isEmpty()) {
            fclose($file);
            return response()->json(['message' => 'No data to write to CSV.']);
        }

        // Write the header
        fputcsv($file, array_keys($commands->first()->toArray()));

        // Write each command
        foreach ($commands as $command) {
            fputcsv($file, $command->toArray());
        }

        fclose($file);

        return response()->json(['message' => 'Data written to CSV successfully.']);
    }

    public function readCsv()
    {
        $csvFile = base_path('/app/Http/Controllers/data/Commands.csv');


        if (!File::exists($csvFile)) {
            return response()->json(['message' => 'CSV file does not exist.'], 404);
        }

        $file = fopen($csvFile, 'r');

        $header = null;
        $data = [];

        while (($row = fgetcsv($file)) !== false) {
            if ($header === null) {
                $header = $row;
            } else {
                $data[] = array_combine($header, $row);
            }
        }

        fclose($file);

        return response()->json($data);
    }
}
