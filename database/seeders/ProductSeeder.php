<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $jsonPath = resource_path('json/final-product-data.json');
      $jsonData = json_decode(file_get_contents($jsonPath), true);


      foreach($jsonData as $item) {
          DB::table('products')->insert([
          'name' => $item['name'],
          'type' => $item['type'],
          'image' => $item['image'],
          'created_at' => now(),
          'updated_at' => now(),
        ]);
        }
    }
}
