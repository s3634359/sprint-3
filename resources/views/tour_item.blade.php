@extends('layouts.app')

@section('content')
<div id="tour_item" tour_id="<?php echo $_GET['id'] ?>" location='{{ $location }}' location_list='{{ $location_list }}' class="title m-b-md"></div>
@endsection
