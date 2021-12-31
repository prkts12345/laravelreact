<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thoughts extends Model
{
    use HasFactory;
    protected $table = "thoughts";
    protected $fillable = ['thoughts', 'thoughtsdate'];
}
