<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'enterprise_name',
        'address',
        'city',
        'cin',
        'phone',
        'email',
        'products',
        'total_price',
        'free_shipping',
        'created_at',
        'status',

    ];
}
