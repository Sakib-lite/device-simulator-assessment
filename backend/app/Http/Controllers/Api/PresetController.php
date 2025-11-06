<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Preset;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PresetController extends Controller
{
    public function index(): JsonResponse
    {
        $presets = Preset::orderBy('created_at', 'desc')->get();
        return response()->json($presets);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'devices' => 'required|array',
        ]);

        $preset = Preset::create($validated);
        return response()->json($preset, 201);
    }

    public function show(string $id): JsonResponse
    {
        $preset = Preset::findOrFail($id);
        return response()->json($preset);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $preset = Preset::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'devices' => 'sometimes|required|array',
        ]);

        $preset->update($validated);
        return response()->json($preset);
    }

    public function destroy(string $id): JsonResponse
    {
        $preset = Preset::findOrFail($id);
        $preset->delete();
        return response()->json(['message' => 'Preset deleted successfully']);
    }
}
