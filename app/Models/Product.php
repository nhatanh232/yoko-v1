<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = ['name', 'slug', 'quantity', 'unit', 'price', 'category_id',
        'mini_description', 'description', 'thumbnail', 'status'];

    const ACTIVE_STATUS = 1;
    const EMPTY_STATUS = 0;
    const STOP_SELLING_STATUS = -1;

    public function getList(){
        $result = $this->with('category')->orderBy('updated_at', 'desc')->get()->toArray();

        $total = sizeof($result);

        return [
            'rows' => $result,
            'total' => $total
        ];
    }

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function createProduct($data){
        $data['slug'] = Str::slug($data['name']);
        return $this->create($data);
    }

    public function updateProduct($data, $id){
        $slug = Str::slug($data['name']);
        $object = self::find($id);
        if (!empty($object)) {
            $object->name = $data['name'];
            $object->slug = $slug;
            $object->quantity = $data['quantity'];
            $object->unit = $data['unit'];
            $object->price = $data['price'];
            $object->mini_description = $data['mini_description'] ?? null;
            $object->description = $data['description'] ?? null;
            if(isset($data['thumbnail'])){
                $object->thumbnail = $data['thumbnail'];
            }
            $object->category_id = $data['category_id'];
            return $object->save();
        }
        return false;
    }

    public function stopSelling($id)
    {
        $object = self::find($id);
        if (!empty($object)) {
            $object->status = self::STOP_SELLING_STATUS;
            return $object->save();
        }
        return false;
    }
}
