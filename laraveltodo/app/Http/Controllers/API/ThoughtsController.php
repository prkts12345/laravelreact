<?php

namespace App\Http\Controllers\API;

use App\Models\Thoughts;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ThoughtsController extends Controller
{
    public function index()
    {
        $thoughts = Thoughts::all();
        return response()->json(['status' => 200, "thoughts" => $thoughts]);
    }


    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "thoughts" => "required",
            "thoughtsdate" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 422, "validate_err" => $validator->errors()]);
        } else {
            $thoughts = new Thoughts();
            $thoughts->thoughts = $request->input('thoughts');
            $thoughts->thoughtsdate = $request->input('thoughtsdate');
            $thoughts->save();
            return response()->json(['status' => 200, 'message' => 'Thoughts Added Successfully']);
        }
    }

    public function edit($id)
    {
        $thoughts = Thoughts::find($id);
        if ($thoughts) {
            return response()->json(['status' => 200, "task" => $thoughts]);
        } else {
            return response()->json(['status' => 404, "message" => 'No thoughts ID Found!']);
        }
    }

    public function destroy($id)
    {
        $thoughts = Thoughts::find($id);
        if ($thoughts) {
            $thoughts->delete();
            return response()->json(['status' => 200, "message" => 'Thoughts Deleted Successfully!']);
        } else {
            return response()->json(['status' => 404, "message" => 'No thoughts ID Found!']);
        }
    }


    public function update(Request $request, $id)
    { {
            $validator = Validator::make($request->all(), [
                "thoughts" => "required",
                "thoughtsdate" => "required",
            ]);
            if ($validator->fails()) {
                return response()->json(['status' => 422, "validationErrors" => $validator->errors()]);
            } else {
                $thoughts = Thoughts::find($id);
                if ($thoughts) {
                    $thoughts->thoughts = $request->input('thoughts');
                    $thoughts->thoughtsdate = $request->input('thoughtsdate');
                    $thoughts->update();
                    return response()->json(['status' => 200, "message" => 'Thoughts Updated Successfully!']);
                } else {
                    return response()->json(['status' => 404, "message" => 'No thoughts ID Found!']);
                }
            }
        }
    }
}
