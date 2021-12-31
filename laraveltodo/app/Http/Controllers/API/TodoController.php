<?php

namespace App\Http\Controllers\API;

use App\Models\Todo;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TodoController extends Controller
{

    public function index()
    {
        $task = Todo::all();
        return response()->json(['status' => 200, "tasks" => $task]);
    }


    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "task" => "required",
            "taskdate" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 422, "validate_err" => $validator->errors()]);
        } else {
            $task = new Todo();
            $task->task = $request->input('task');
            $task->taskdate = $request->input('taskdate');
            $task->save();
            return response()->json(['status' => 200, 'message' => 'Task Added Successfully']);
        }
    }

    public function edit($id)
    {
        $task = Todo::find($id);
        if ($task) {
            return response()->json(['status' => 200, "task" => $task]);
        } else {
            return response()->json(['status' => 404, "message" => 'No task ID Found!']);
        }
    }

    public function destroy($id)
    {
        $task = Todo::find($id);
        if ($task) {
            $task->delete();
            return response()->json(['status' => 200, "message" => 'Task Deleted Successfully!']);
        } else {
            return response()->json(['status' => 404, "message" => 'No task ID Found!']);
        }
    }
    public function update(Request $request, $id)
    { {
            $validator = Validator::make($request->all(), [
                "task" => "required",
                "taskdate" => "required",
            ]);
            if ($validator->fails()) {
                return response()->json(['status' => 422, "validationErrors" => $validator->errors()]);
            } else {
                $task = Todo::find($id);
                if ($task) {
                    $task->task = $request->input('task');
                    $task->taskdate = $request->input('taskdate');
                    $task->update();
                    return response()->json(['status' => 200, "message" => 'Task Updated Successfully!']);
                } else {
                    return response()->json(['status' => 404, "message" => 'No task ID Found!']);
                }
            }
        }
    }
}
