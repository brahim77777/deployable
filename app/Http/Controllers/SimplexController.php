<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Response;

class SimplexController extends Controller
{
    //
    public function simplex(Request $request)
    {

        // -------------------------
        $inputData = "max 3 2 3,-4,-1,L,-2 1,3,1,L,9 10,-8,-6,0";
        $inputData = $request->data;

        // Define the command to run the Python script
        $pythonScriptPath = base_path('app/Http/Controllers/simplex/simplex.py');  // Adjust the path as necessary
        $command = "python3 $pythonScriptPath $inputData";

        // Execute the Python script
        $process = new Process(explode(' ', $command));
        $process->run();

        // Check if the command was executed successfully
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        // Get the output of the Python script
        $result = $process->getOutput();

        // Return the result
        $result = json_decode($result, true);
        return response()->json([
            'result' => $result
        ]);

        // -------------------------
        // print_r($arr);

    }
}
