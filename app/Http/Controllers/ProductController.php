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

    public function getByType($type) {
      return Product::where('type', $type)->get();
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

    public function storeBulk(AddProductRequest $request) {
      $productData = $request->json();
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
        $product = Product::where('id', $id)->first();
        if(!$product) {
          return response()->json(['message' => 'Product not found'], 404);
        } else {
          $product->delete();
          return response()->json(['message' => 'Product deleted'], 200);
        }
      } catch(\Exception $e) {
        return response()->json(['message' => 'Error deleting product'], 500);
      }
    }
}
