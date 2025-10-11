<?php

namespace App\Models\Cms;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $table = 'types';
    protected $fillable = [
        'name',
        'remarks'
    ];

    public static function getAllTypes()
    {
        return self::select('id', 'name', 'remarks')->get();
    }

    public function category()
    {
        return $this->hasMany(Category::class, 'type_id');
    }
}
