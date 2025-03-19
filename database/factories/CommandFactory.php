<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Command>
 */
class CommandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'enterprise_name' => null,
            'address' => $this->faker->address(),
            'city' => $this->faker->city(),
            'cin' => $this->faker->creditCardNumber(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            //"1,#ffffff,S 2,#000000,L 3,#000ff0,XL 4,#003200,M 5,#ff0000,S"
            'products' => implode(',', $this->faker->randomElements(['1,#ffffff,S,1', '2,#000000,L,3 ', '3,#000ff0,XL,2', '4,#003200,M,1', '5,#ff0000,S,1'])) . " " . implode(',', $this->faker->randomElements(["1,#ffffff,S,1", "2,#000000,L,1 ", "3,#000ff0,XL,1", "4,#003200,M,1", "5,#ff0000,S,1"])),
            'total_price' => $this->faker->randomFloat(2, 0, 1000),
            'free_shipping' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'status' => $this->faker->randomElement(['pending', 'verified', 'paid', 'failed', 'canceld']),

            // implode(',', fake()->randomElements(['1,#ffffff,S', '2,#000000,L ', '3,#000ff0,XL', '4,#003200,M', '5,#ff0000,S'])) . " " . impolode(',', fake()->randomElements(["1,#ffffff,S", "2,#000000,L ", "3,#000ff0,XL", "4,#003200,M", "5,#ff0000,S"]))
        ];
    }
}
