<?php

namespace App\Models\Transaction;

use App\Models\Auth\User;
use App\Models\Cms\Category;
use App\Models\Cms\Type;
use Illuminate\Database\Eloquent\Model;

class PersonalTransaction extends Model
{
    protected $table = 'personal_transactions';
    protected $fillable = [
        'user_id',
        'type_id',
        'amount',
        'category_id',
        'note',
    ];

    public static function getAllPersonalTransaction($id)
    {
        return self::where('user_id', $id)
            ->get();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
