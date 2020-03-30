<?php

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/tour', 'HomeController@tour')->name('tour');
Route::get('/type', 'HomeController@type')->name('type');

Route::get('/location', 'LocationController@getLocations')->name('location');
Route::post('/locationSubmit', 'LocationController@locationSubmit');
Route::post('/locationEdit', 'LocationController@locationEdit');
Route::post('/locationRemove', 'LocationController@locationRemove');