<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = ['name', 'slug', 'quantity', 'unit', 'price', 'category_id',
        'mini_description', 'description', 'thumbnail', 'status'];

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
}
