<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ToursLocations extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    public function locations()
    {
        return $this->hasMany('App\Location', 'locations_id');
    }

    public function tours()
    {
        return $this->hasMany('App\Tour', 'tour_id');
    }

}
