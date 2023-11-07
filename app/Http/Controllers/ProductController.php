<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {
      return Product::all();
    }

    public function getById($id) {
      return Product::where('id', $id)->get();
    }
    public function getByType($type) {
      return Product::where('type', $type)->get();
    }

    public function getByName($name) {
      return Product::where('name', $name)->get();
    }

    public function uniqueTypes() {
//      returning distinct 'type' values
//      return Product::select('type')->distinct()->get();

//      returning distinct 'type' values except 'logo'
      return Product::select('type')
        ->distinct()
        ->where('type', '!=', 'logo')
        ->pluck('type');
    }

    public function uniqueTypeValues() {
      // returning 1 result from all distinct 'type' values except from 'logo'

      $products = Product::select('id', 'name', 'image', 'type')
        ->whereNotIn('type', ['logo'])
        ->whereNotIn('name', ['Festive Gift Sets', '0', ''])
        ->groupBy('type')
        ->get();
      return $products;
    }

    public function store(AddProductRequest $request) {
      $jsonData = json_decode($request->getContent(), true);
      try {
        $product = new Product([
          'name' => $jsonData['name'],
          'type' => $jsonData['type'],
          'image' => $jsonData['image'],
        ]);
//        return response()->json(['message' => $jsonData], 200);
        $product->save();

        return response()->json(['message' => 'Product added to the product table'], 201);
      } catch(\Exception $e) {
        return response()->json(['message' => 'Error adding product'], 500);
      }
    }

    public function storeBulk(Request $request) {
      $productData = $request->json();
//      $productData = $request;
      if(!is_array($productData)) {
        return response()->json(['message' => 'Invalid data'], 400);
      }
      try {
        foreach($productData as $data) {
          $product = new Product([
            'name' => $data['name'],
            'type' => $data['type'],
            'image' => $data['image']
          ]);
          $product->save();
        }
        return response()->json(['message' => 'Products added to the product table'], 201);
      } catch(\Exception $e) {
        return response()->json(['message' => 'Error adding products'], 500);
      }
    }

    public function destroy($id) {
      try {
        // delete the first product with id = $id

//        $product = Product::where('id', $id)->first();
//        if(!$product) {
//          return response()->json(['message' => 'Product not found'], 404);
//        } else {
//          $product->delete();
//          return response()->json(['message' => 'Product deleted'], 200);
//        }


        // delete all products with id or name or type = $id
        $products = Product::where('id', $id)
          ->orWhere('name', $id)
          ->get();
        $products->each(function ($product) {
          $product->delete();
        });
        return response()->json(['message' => 'Product(s) deleted'], 200);
      } catch(\Exception $e) {
        return response()->json(['message' => 'Error deleting product'], 500);
      }
    }

    public function getImage($imageName) {
      $path = public_path('images/' . $imageName);
      if(file_exists($path)) {
        return response()->file($path);
      } else {
        $path = public_path('images/' . 'logo.png');   // returning default 'logo.png'
        return response()->file($path);
      }
//      return response()->json(['message' => 'Image not found'], 404);
    }
}
