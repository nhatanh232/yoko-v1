<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateYokoDb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table){
           $table->id();
           $table->string('name');
           $table->integer('quantity');
           $table->string('unit');
           $table->integer('price');
           $table->string('mini_description', 200)->nullable();
           $table->longText('description')->nullable();
           $table->string('thumbnail');
           $table->tinyInteger('status')->default(1);
           $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table){
           $table->id();
           $table->string('name');
           $table->json('order');
           $table->integer('total');
           $table->string('phone');
           $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
        Schema::dropIfExists('products');
        Schema::dropIfExists('orders');
    }
}
