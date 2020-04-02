<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class HomeController extends Controller
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
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = auth()->user()->id;
        $data = DB::select('select * from users where not id = ?', [(int) $user]);
        return view('home')->with('data', json_encode($data));
    }

    public function accountDelete(Request $request)
    {
        DB::table('users')
            ->where('name', $request['name'])
            ->delete();
        return response()->json([$request->all()]);
    }

    public function type()
    {
        return view('type');
    }
}
