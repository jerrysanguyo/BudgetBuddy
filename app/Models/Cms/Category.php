<?php

namespace App\Models\Cms;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $fillable = [
        'type_id',
        'name',
        'remarks'
    ];

    public static function getAllCategoriesPerType($type)
    {
        return self::select('id', 'type_id', 'name', 'remarks')
            ->where('type_id', $type)
            ->get();
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }
}
