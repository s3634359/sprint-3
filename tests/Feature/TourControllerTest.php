<?php

namespace Tests\Feature;

use App\User;
use App\Tour;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TourControllerTest extends TestCase
{

    use RefreshDatabase;

    /**
     * A basic feature test example.
     * 
     * @return void
     */

    /** @test */
    public function only_logged_in_users_can_see_the_tour_page()
    {
        $response = $this->get('/tour')->assertRedirect('/login');
    }

    /** @test */
    public function authenticated_users_can_see_the_tour_page()
    {
        $response = $this->actingAs(factory(User::class)->create());
    
        $response = $this->get('/tour')->assertOk();
    }

    /** @test */
    public function an_admin_can_add_a_new_tour()
    {
        $response = $this->actingAs(factory(User::class)->create());
                
        $this->assertCount(0, Tour::all());

        factory(Tour::class)->create();
        
        $response = $this->post('/newTourSubmit', [
            'name' => 'Test Tour',
        ]);

        $this->assertCount(2, Tour::all());
    }

    /** @test */
    public function an_admin_can_delete_an_existing_tour()
    {
        $response = $this->actingAs(factory(User::class)->create());
        
        $tour = factory(Tour::class)->create();
        $tour_id = $tour->id;

        $this->assertCount(1, Tour::all());
        
        $response = $this->post('/deleteTour', [
            'id' => $tour_id,
        ]);

        $this->assertCount(0, Tour::all());
    }

    /** @test */
    public function an_assistant_can_not_add_a_new_tour()
    {
        $response = $this->actingAs(factory(User::class)->create([
            'position' => 'assistant'
        ]));                
        $this->assertCount(0, Tour::all());
        
        $response = $this->post('/newTourSubmit', [
            'name' => 'Test Tour',
        ]);

        $this->assertCount(0, Tour::all());
    }

    /** @test */
    public function an_assistant_can_not_delete_an_existing_tour()
    {
        $response = $this->actingAs(factory(User::class)->create([
            'position' => 'assistant'
        ]));        
        $tour = factory(Tour::class)->create();
        $tour_id = $tour->id;

        $this->assertCount(1, Tour::all());
        
        $response = $this->post('/deleteTour', [
            'id' => $tour_id,
        ]);

        $this->assertCount(1, Tour::all());
    }

}
