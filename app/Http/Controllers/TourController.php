<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TourController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
    * success response method.
    *
    * @return \Illuminate\Http\Response
    */
    public function getTours()
    {
        $data = DB::select('select * from tours');
        $type = DB::select('select * from types, tours_types where types.id = tours_types.type_id');
        $location = DB::select('select * from locations, tours_locations where locations.id = tours_locations.location_id');
        return view('tour')->with('data', json_encode($data))->with('type', json_encode($type))->with('location', json_encode($location));
    }

    public function tourSubmit(Request $request)
    {
        DB::insert('insert into locations values (NULL, ?, ?, ?, ?, ?, NOW(), NULL)', [$request['name'], $request['x_axis'], $request['y_axis'], $request['description'], $request['min_time']]);
        return response()->json([$request->all()]);
    }

    // public function locationEdit(Request $request)
    // {   
    //     DB::table('locations')
    //         ->where('id', $request['id'])
    //         ->update(['name' => $request['name'], 'x_axis' => $request['x_axis'], 'y_axis' => $request['y_axis'], 'description' => $request['description'], 'min_time' => $request['min_time'], 'updated_at' => now()]);
    //     return response()->json([$request->all()]);
    // }

    // public function locationRemove(Request $request)
    // {
    //     DB::table('locations')
    //         ->where('id', $request['id'])
    //         ->delete();
    //     return response()->json([$request->all()]);
    // }
    
}
