@extends('layouts.app')

@section('content')
<div id="tour_item" tour_id="<?php echo $_GET['id'] ?>" type='{{ $type }}' location='{{ $location }}' location_list='{{ $location_list }}' type_list='{{ $type_list }}' class="title m-b-md"></div>
@endsection
