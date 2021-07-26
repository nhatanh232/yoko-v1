<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    //
    protected $category;

    protected $data = [];

    public function __construct(Category $category)
    {
        $this->category = $category;
        $this->data['title'] = 'Quản lý danh mục';
        $this->data['controllerName'] = 'category';
    }

    public function index()
    {
        return view('admin.category.index', $this->data);
    }

    public function search()
    {
        $data = $this->category->getList();
        return response()->json($data);
    }

    public function create()
    {
        return view('admin.category.create', $this->data);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data,
            [
                'name' => 'required|unique:categories,name'
            ],
            [
                'name.required' => 'Không được bỏ trống tên danh mục',
                'name.unique' => 'Tên danh mục đã tồn tại'
            ]);
        if (!$validator->fails()) {
            $result = $this->category->store($data);
            if(is_object($result)){
                $request->session()->flash('msg', json_encode([
                    'title' => 'Thông báo',
                    'text' => 'Tạo mới danh mục thành công',
                    'type' => 'success',
                ]));
                return \redirect()->route($this->data['controllerName'].'.index');
            }

            $request->session()->flash('msg', json_encode([
                'title' => 'Thông báo',
                'text' => $validator->errors()->first(),
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
        $this->data['category'] = Category::findOrFail($id);
        $this->data['id'] = $id;
        return view('admin.category.edit', $this->data);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id){
        $data = $request->all();

        $validator = Validator::make($data,
        [
            'name' => 'required|unique:categories,name,'.$id .',id'
        ],
        [
            'name.required' => 'Không được bỏ trống tên danh mục',
            'name.unique' => 'Tên danh mục đã tồn tại'
        ]);

        if(!$validator->fails()){
            $result = $this->category->edit($data, $id);
            if($result){
                $request->session()->flash('msg', json_encode([
                    'title' => 'Thông báo',
                    'text' => 'Cập nhật danh mục thành công',
                    'type' => 'success',
                ]));
                return \redirect()->route($this->data['controllerName'].'.index');
            }

            $request->session()->flash('msg', json_encode([
                'title' => 'Thông báo',
                'text' => 'Cập nhật thất bại',
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

    public function delete($id){
        $result = $this->category->remove($id);
        if($result){
            return response()->json([
                'status' => 0,
                'msg' => 'Xóa danh mục thành công'
            ]);
        }
        return response()->json([
            'status' => -1,
            'msg' => 'Xóa danh mục thất bại'
        ]);
    }
}
