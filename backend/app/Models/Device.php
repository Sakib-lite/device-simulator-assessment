<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'settings',
    ];

    protected $casts = [
        'settings' => 'array',
    ];
}
