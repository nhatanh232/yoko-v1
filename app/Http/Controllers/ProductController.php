<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $product;

    protected $data = [];

    public function __construct(Product $product)
    {
        $this->product = $product;
        $this->data['title'] = 'Quản lý sản phẩm';
        $this->data['controllerName'] = 'product';
    }

    public function index(){
        return view('admin.product.index', $this->data);
    }

    public function search()
    {
        $data = $this->product->getList();
        return response()->json($data);
    }

    public function create(){
        return view('admin.product.create', $this->data);
    }
}
