<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAffiliateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && !auth()->user()->affiliate;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'payment_method' => 'required|in:bank_transfer,paypal,mobile_money',
            'payment_details' => 'required|string|max:1000',
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
            'full_name.required' => 'Full name is required.',
            'phone.required' => 'Phone number is required.',
            'payment_method.required' => 'Payment method is required.',
            'payment_method.in' => 'Please select a valid payment method.',
            'payment_details.required' => 'Payment details are required.',
            'payment_details.max' => 'Payment details cannot exceed 1000 characters.',
        ];
    }
}