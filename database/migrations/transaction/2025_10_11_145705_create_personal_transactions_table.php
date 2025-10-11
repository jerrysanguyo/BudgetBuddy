<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('personal_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('type_id')
                ->constrained('types')
                ->onDelete('restrict')
                ->onUpdate('cascade');
            $table->foreignId('category_id')
                ->constrained('categories')
                ->onDelete('restrict')
                ->onUpdate('cascade');
            $table->decimal('amount', 30,2);
            $table->string('note')->nullable();
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('personal_transactions');
    }
};
