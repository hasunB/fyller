<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function create(){
        return Inertia::render('Auth/Login');
    }

    public function store(){
        // validate
        $credentials = request()->validate([
            'email' => 'required|string|email',
            'password' => 'required',
        ]);

        // attempt to log in
        if (! Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => 'The provided credentials do not match our records.',
            ]);
        }

        // regenerate session to prevent fixation
        request()->session()->regenerate();

        // redirect
        return redirect('/dashboard');
    }

    public function destroy() {

    }
}
