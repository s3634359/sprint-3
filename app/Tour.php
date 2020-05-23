<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Tour extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'min_time',
    ];

    public function locations()
    {
        return $this->hasMany('App\Location');
    }

    public function types()
    {
        return $this->hasMany('App\Type');
    }

}
