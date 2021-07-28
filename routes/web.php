<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['register' => false]);

//main board
Route::get('/', function(){
    return view('welcome');
});


//admin board
Route::group(['middleware' => 'auth', 'prefix' => 'auth'], function () {
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::prefix('category')->group(function(){
        Route::get('/', [App\Http\Controllers\CategoryController::class, 'index'])->name('category.index');
        Route::get('/search', [App\Http\Controllers\CategoryController::class, 'search'])->name('category.search');
        Route::get('/create', [App\Http\Controllers\CategoryController::class, 'create'])->name('category.create');
        Route::post('/store', [App\Http\Controllers\CategoryController::class, 'store'])->name('category.store');
        Route::get('/{id}/edit', [App\Http\Controllers\CategoryController::class, 'edit'])->name('category.edit');
        Route::post('/update/{id}', [App\Http\Controllers\CategoryController::class, 'update'])->name('category.update');
        Route::post('/delete/{id}', [App\Http\Controllers\CategoryController::class, 'delete'])->name('category.delete');
    });

    Route::prefix('product')->group(function(){
        Route::get('/', [App\Http\Controllers\ProductController::class, 'index'])->name('product.index');
        Route::get('/search', [App\Http\Controllers\ProductController::class, 'search'])->name('product.search');
        Route::get('/create', [App\Http\Controllers\ProductController::class, 'create'])->name('product.create');
        Route::post('/upload-image', [App\Http\Controllers\ProductController::class, 'uploadImage'])->name('product.upload_image');
        Route::post('/store', [App\Http\Controllers\ProductController::class, 'store'])->name('product.store');
        Route::get('/{id}/edit', [App\Http\Controllers\ProductController::class, 'edit'])->name('product.edit');
        Route::post('/update/{id}', [App\Http\Controllers\ProductController::class, 'update'])->name('product.update');
        Route::post('/delete/{id}', [App\Http\Controllers\ProductController::class, 'removeProduct'])->name('product.stop_selling');
    });
});

