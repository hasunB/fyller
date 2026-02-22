<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use App\Domain\Inventory\Models\Category;
use App\Domain\Inventory\Models\Product;


class InventoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Inventory/index', [
            'products' => Product::with('category')->latest()->cursorPaginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Inventory/create', [
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'sku' => 'nullable|string|max:255',
                'category' => 'required|exists:categories,id',
                'price' => 'required|numeric',
                'cost_price' => 'required|numeric',
                'stock' => 'required|numeric',
                'safety_stock' => 'required|numeric',
                'description' => 'nullable|string',
                'enable_ai_forecast' => 'boolean',
                'enable_smart_reorder' => 'boolean',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            ]);

            // generate sku if empty
            if (empty($validated['sku'])) {
                $validated['sku'] = 'FYL-' . time();
            } else {
                $validated['sku'] = 'FYL-' . strtoupper($validated['sku']);
            }

            // Map 'category' to 'category_id'
            $validated['category_id'] = $validated['category'];
            unset($validated['category']);

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('products', 'public');
                $validated['image'] = $imagePath;
            }

            Product::create($validated);

            return redirect()->route('inventory.create')->with('success', 'Product created successfully.');
        
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
