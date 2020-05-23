<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Location;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class LocationController extends Controller
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
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'x_axis' => ['required', 'float'],
            'y_axis' => ['required', 'float'],
            'description' => ['required', 'string', 'max:255'],
            'min_time' => ['required', 'int'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Location
     */
    protected function create(array $data)
    {
        return Location::create([
            'name' => $data['name'],
            'x_axis' => $data['x_axis'],
            'y_axis' => $data['y_axis'],
            'description' => $data['description'],
            'min_time' => $data['min_time'],
        ]);
       
    }

    /**
    * success response method.
    *
    * @return \Illuminate\Http\Response
    */
    public function getLocations()
    {   
        $data = DB::select('select * from locations');
        return view('location')->with('data', json_encode($data));
    }

    public function locationSubmit(Request $request)
    {
        
        \App\Location::create([
            'name' => $request['name'], 
            'x_axis' => $request['x_axis'], 
            'y_axis' => $request['y_axis'], 
            'description' => $request['description'], 
            'min_time' => $request['min_time']
            ]);
        
            return response()->json([$request->all()]);
    }

    public function locationEdit(Request $request)
    {   
        $location = Location::find($request['id']);
        $location->name = $request['name'];
        $location->x_axis = $request['x_axis'];
        $location->y_axis = $request['y_axis'];
        $location->description = $request['description'];
        $location->min_time = $request['min_time'];
        $location->save();
        
        return response()->json([$request->all()]);
    }

    public function locationRemove(Request $request)
    {
        Location::destroy($request['id']);
        
        return response()->json([$request->all()]);
    }
    
}
