<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request) {
        $email = $request->input('email');
        $password = $request->input('password');

        if ($email === '' || $password === '') {
            return response()->json([
                'message' => 'Email and password are required',
            ], 400);
        }

        
    }
}
