<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    protected $product;
    protected $path = 'images/product/';

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
        $this->data['category'] = Category::where('status', Category::ACTIVE_STATUS)->get()->pluck('name', 'id')->toArray();
        return view('admin.product.create', $this->data);
    }

    public function uploadImage(Request $request)
    {
        $data = $request->only('file');
        $hinh = $data['file'];
        if ($hinh != null) {
            $hinh = $hinh->getClientOriginalName();
            $extension = substr($hinh, strpos($hinh, "."));
            $hinh = Carbon::now()->timestamp . $extension;
            $data['file']->move($this->path, $hinh);
        }
        return $this->path.$hinh;
    }

    public function store(Request $request){
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required|unique:products,name',
            'quantity' => 'required|min:1|integer',
            'unit' => 'required',
            'price' => 'required|integer|min:1',
            'thumbnail' => 'required|image',
            'category_id' => 'required|exists:categories,id'
        ]);

        if(!$validator->fails()){
            $image = $data['thumbnail']->getClientOriginalName();
            $extension = substr($image, strpos($image, "."));
            $image = "product_" . Carbon::now()->timestamp . $extension;
            $data['thumbnail']->move($this->path, $image);
            $data['thumbnail'] = $this->path.$image;

            $result = $this->product->createProduct($data);

            if(is_object($result)){
                $request->session()->flash('msg', json_encode([
                    'title' => 'Thông báo',
                    'text' => 'Tạo mới sản phẩm thành công',
                    'type' => 'success',
                ]));
                return \redirect()->route($this->data['controllerName'].'.index');
            }

            $request->session()->flash('msg', json_encode([
                'title' => 'Thông báo',
                'text' => 'Tạo mới sản phẩm thất bại',
                'type' => 'error',
            ]));
            return Redirect::back()->withInput($data);
        }

        $request->session()->flash('msg', json_encode([
            'title' => 'Thông báo',
            'text' => $validator->errors()->first(),
            'type' => 'error',
        ]));
        return Redirect::back()->withInput($data);
    }

    public function edit($id){
        $this->data['product'] = Product::findOrFail($id);
        $this->data['id'] = $id;
        $this->data['category'] = Category::where('status', Category::ACTIVE_STATUS)->get()->pluck('name', 'id')->toArray();
        return view('admin.product.edit', $this->data);
    }

    public function update(Request $request, $id){
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required|unique:products,name,'.$id.',id',
            'quantity' => 'required|min:1|integer',
            'unit' => 'required',
            'price' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id'
        ]);

        if(!$validator->fails()){
            if(isset($data['thumbnail'])){
                $image = $data['thumbnail']->getClientOriginalName();
                $extension = substr($image, strpos($image, "."));
                $image = "product_" . Carbon::now()->timestamp . $extension;
                $data['thumbnail']->move($this->path, $image);
                $data['thumbnail'] = $this->path.$image;
            }

            $result = $this->product->updateProduct($data, $id);

            if($result){
                $request->session()->flash('msg', json_encode([
                    'title' => 'Thông báo',
                    'text' => 'Cập nhật sản phẩm thành công',
                    'type' => 'success',
                ]));
                return \redirect()->route($this->data['controllerName'].'.index');
            }

            $request->session()->flash('msg', json_encode([
                'title' => 'Thông báo',
                'text' => 'Cập nhật sản phẩm thất bại',
                'type' => 'error',
            ]));
            return Redirect::back()->withInput($data);
        }

        $request->session()->flash('msg', json_encode([
            'title' => 'Thông báo',
            'text' => $validator->errors()->first(),
            'type' => 'error',
        ]));
        return Redirect::back()->withInput($data);
    }

    public function removeProduct($id){
        $result = $this->product->stopSelling($id);
        if($result){
            return response()->json([
                'status' => 0,
                'msg' => 'Cập nhật trạng thái sản phẩm thành công'
            ]);
        }
        return response()->json([
            'status' => -1,
            'msg' => 'Cập nhật trạng thái sản phẩm thất bại'
        ]);
    }
}
