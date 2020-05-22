<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class HomeControllerTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * A basic feature test example.
     * php artisan test
     * @return void
     */
    public function testExample()
    {
        $response = $this->action('GET', 'HomeController@index');

        $response->assertStatus(200);
    }
}
