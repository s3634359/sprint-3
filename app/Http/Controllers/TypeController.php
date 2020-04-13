<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TypeController extends Controller
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
    public function getTypes()
    {
        $data = DB::select('select * from types');
        return view('type')->with('data', json_encode($data));
    }

    public function typeSubmit(Request $request)
    {
        DB::insert('insert into types values (NULL, ?)', [$request['name']]);
        return response()->json([$request->all()]);
    }

    public function typeEdit(Request $request)
    {   
        DB::table('types')
            ->where('id', $request['id'])
            ->update(['name' => $request['name']]);
        return response()->json([$request->all()]);
    }

    public function typeRemove(Request $request)
    {
        DB::table('types')
            ->where('id', $request['id'])
            ->delete();
        return response()->json([$request->all()]);
    }

}
