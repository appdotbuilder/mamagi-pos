<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => 'required|in:pending,confirmed,preparing,ready,completed,cancelled',
            'payment_status' => 'required|in:pending,paid,failed,refunded',
            'payment_method' => 'nullable|in:cash,card,online',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'status.required' => 'Order status is required.',
            'status.in' => 'Invalid order status selected.',
            'payment_status.required' => 'Payment status is required.',
            'payment_status.in' => 'Invalid payment status selected.',
        ];
    }
}