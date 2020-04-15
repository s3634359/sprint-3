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
Route::post('/accountDelete', 'HomeController@accountDelete')->middleware('can:admin');

Route::get('/location', 'LocationController@getLocations')->name('location');
Route::post('/locationSubmit', 'LocationController@locationSubmit');
Route::post('/locationEdit', 'LocationController@locationEdit');
Route::post('/locationRemove', 'LocationController@locationRemove');

Route::get('/tour', 'TourController@getTours')->name('tour');
Route::post('/newTourSubmit', 'TourController@newTourSubmit')->middleware('can:admin');
Route::post('/deleteTour', 'TourController@deleteTour')->middleware('can:admin');

Route::get('/tour_item', 'TourController@getTourItem')->name('tour_item');
Route::post('/tourSubmit', 'TourController@tourSubmit')->middleware('can:admin');
Route::post('/tourTimeUpdate', 'TourController@tourTimeUpdate')->middleware('can:admin');
Route::post('/tourDeleteLocation', 'TourController@tourDeleteLocation')->middleware('can:admin');
Route::post('/tourSubmitLocation', 'TourController@tourSubmitLocation')->middleware('can:admin');

Route::get('/tour_type', 'TourController@getTourType')->name('tour_type');
Route::post('/tourDeleteType', 'TourController@tourDeleteType')->middleware('can:admin');
Route::post('/tourSubmitType', 'TourController@tourSubmitType')->middleware('can:admin');

Route::get('/type', 'TypeController@getTypes')->name('type');
Route::post('/typeSubmit', 'TypeController@typeSubmit')->middleware('can:admin');
Route::post('/typeEdit', 'TypeController@typeEdit')->middleware('can:admin');
Route::post('/typeRemove', 'TypeController@typeRemove')->middleware('can:admin');
