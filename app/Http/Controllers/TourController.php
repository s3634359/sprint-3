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

    public function getTourItem(Request $request)
    {
        $location_list = DB::select('select id, name, min_time from locations');
        $type_list = DB::select('select * from types');
        $type = DB::select('select type_id as id, name from types, tours_types where types.id = tours_types.type_id and tours_types.tour_id = ?', [$request['id']]);
        $location = DB::select('select tours_locations.location_id as id, name, min_time, tours_locations.order from locations, tours_locations where tours_locations.tour_id = '. $request->id .' and locations.id = tours_locations.location_id order by tours_locations.order ASC');
        return view('tour_item')->with('type', json_encode($type))->with('location', json_encode($location))->with('location_list', json_encode($location_list))->with('type_list', json_encode($type_list));
    }

    public function tourSubmit(Request $request)
    {
        DB::insert('insert into locations values (NULL, ?, ?, ?, ?, ?, NOW(), NULL)', [$request['name'], $request['x_axis'], $request['y_axis'], $request['description'], $request['min_time']]);
        return response()->json([$request->all()]);
    }

    public function tourTimeUpdate(Request $request)
    {
        
        DB::table('tours')
            ->where('id', $request['id'])
            ->update(['min_time' => $request['min_time']]);
        
        return response()->json([$request->all()]);
    }

    public function tourSubmitLocation(Request $request)
    {
        $data = DB::select('select * from tours_locations where tour_id = ? and location_id = ?', [$request['id'], $request['location_id']]);
        if ($data != null) {
            DB::table('tours_locations')
                ->where('tour_id', $request['id'])
                ->where('location_id', $request['location_id'])
                ->update(['order' => $request['location_order']]);
        } else {
            DB::insert('insert into tours_locations values (NULL, ?, ?, ?)', [$request['id'], $request['location_order'], $request['location_id']]);
        }
        return response()->json([$request->all()]);
    }

    public function tourDeleteLocation(Request $request)
    {
        DB::delete('delete from tours_locations where tour_id = ? and location_id = ?', [$request['id'], $request['location_id']]);
        return response()->json([$request->all()]);
    }

    public function getTourType(Request $request)
    {
        $type_list = DB::select('select * from types');
        $type = DB::select('select type_id as id, name from types, tours_types where types.id = tours_types.type_id and tours_types.tour_id = ?', [$request['id']]);
        return view('tour_type')->with('type', json_encode($type))->with('type_list', json_encode($type_list));
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
