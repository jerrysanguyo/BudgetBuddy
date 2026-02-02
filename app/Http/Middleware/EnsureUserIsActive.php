<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsActive
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && !Auth::user()->is_active) {
            Auth::logout();

            if ($request->hasSession()) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }

            return response()->json([
                'message' => 'Your account is inactive.',
                'code' => 'ACCOUNT_INACTIVE',
            ], 403);
        }

        return $next($request);
    }
}
