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
Route::post('/accountDelete', 'HomeController@accountDelete');

Route::get('/location', 'LocationController@getLocations')->name('location');
Route::post('/locationSubmit', 'LocationController@locationSubmit');
Route::post('/locationEdit', 'LocationController@locationEdit');
Route::post('/locationRemove', 'LocationController@locationRemove');

Route::get('/tour', 'TourController@getTours')->name('tour');
Route::post('/tourSubmit', 'TourController@tourSubmit')->middleware('can:admin');

Route::get('/tour_item', 'TourController@getTourItem')->name('tour_item');

Route::get('/type', 'TypeController@getTypes')->name('type');
Route::post('/typeSubmit', 'TypeController@typeSubmit')->middleware('can:admin');
Route::post('/typeEdit', 'TypeController@typeEdit')->middleware('can:admin');
Route::post('/typeRemove', 'TypeController@typeRemove')->middleware('can:admin');
