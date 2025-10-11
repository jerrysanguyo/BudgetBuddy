<?php

namespace App\Models\Cms;

use App\Models\Transaction\PersonalTransaction;
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

    public function personal_transaction()
    {
        return $this->hasMany(PersonalTransaction::class, 'type_id');
    }
}
