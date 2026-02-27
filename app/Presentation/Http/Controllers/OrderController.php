<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Domain\Orders\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('customer', 'payment_type', 'fulfillment_status', 'payment_status')
            ->orderBy('created_at', 'desc')
            ->cursorPaginate(15)
            ->withQueryString();

        $total_orders = Order::count();
        $total_pending_orders = Order::whereHas('fulfillment_status',  function ($query) {
            $query->where('name', 'pending');
        })->count();
        $total_completed_orders = Order::whereHas('fulfillment_status', function ($query) {
            $query->where('name', 'completed');
        })->count();
        $total_failed_orders = Order::whereHas('fulfillment_status', function ($query) {
            $query->where('name', 'failed');
        })->count();

        return Inertia::render('Admin/Orders/index', [
            'orders' => $orders,
            'total_orders' => $total_orders,
            'total_pending_orders' => $total_pending_orders,
            'total_completed_orders' => $total_completed_orders,
            'total_failed_orders' => $total_failed_orders,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Orders/create');
    }
}
