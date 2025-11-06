<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DeviceController extends Controller
{
    public function index(): JsonResponse
    {
        $devices = Device::orderBy('created_at', 'desc')->get();
        return response()->json($devices);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|string|in:light,fan',
            'name' => 'required|string|max:255',
            'settings' => 'required|array',
        ]);

        $device = Device::create($validated);
        return response()->json($device, 201);
    }

    public function show(string $id): JsonResponse
    {
        $device = Device::findOrFail($id);
        return response()->json($device);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $device = Device::findOrFail($id);

        $validated = $request->validate([
            'type' => 'sometimes|required|string|in:light,fan',
            'name' => 'sometimes|required|string|max:255',
            'settings' => 'sometimes|required|array',
        ]);

        $device->update($validated);
        return response()->json($device);
    }

    public function destroy(string $id): JsonResponse
    {
        $device = Device::findOrFail($id);
        $device->delete();
        return response()->json(['message' => 'Device deleted successfully']);
    }
}
