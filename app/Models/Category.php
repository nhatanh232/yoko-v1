<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = ['name', 'slug', 'status'];

    const ACTIVE_STATUS = 1;
    const LOCK_STATUS = 0;

    public function getList()
    {
        $result = $this->orderBy('updated_at', 'desc')->get()->toArray();

        $total = sizeof($result);

        return [
            'rows' => $result,
            'total' => $total
        ];
    }

    public function store($data)
    {
        $slug = Str::slug($data['name']);
        return $this->create([
            'name' => $data['name'],
            'slug' => $slug
        ]);
    }

    public function edit($data, $id)
    {
        $slug = Str::slug($data['name']);
        $object = self::find($id);
        if (!empty($object)) {
            $object->name = $data['name'];
            $object->slug = $slug;
            return $object->save();
        }
        return false;
    }

    public function remove($id)
    {
        $object = self::find($id);
        if (!empty($object)) {
            $object->status = self::LOCK_STATUS;
            return $object->save();
        }
        return false;
    }
}
