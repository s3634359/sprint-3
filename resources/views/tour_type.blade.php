@extends('layouts.app')

@section('content')
<div id="tour_type" tour_id="<?php echo $_GET['id'] ?>" type='{{ $type }}' type_list='{{ $type_list }}'class="title m-b-md"></div>
@endsection
