<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAffiliateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $affiliate = $this->route('affiliate');
        
        return auth()->user()->isAdmin() || 
               (auth()->user()->id === $affiliate->user_id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'payment_method' => 'required|in:bank_transfer,paypal,mobile_money',
            'payment_details' => 'required|string|max:1000',
        ];

        // Admin-only fields
        if (auth()->user()->isAdmin()) {
            $rules['commission_rate'] = 'numeric|min:0|max:100';
            $rules['status'] = 'in:pending,approved,suspended,rejected';
        }

        return $rules;
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
            'commission_rate.numeric' => 'Commission rate must be a number.',
            'commission_rate.min' => 'Commission rate cannot be negative.',
            'commission_rate.max' => 'Commission rate cannot exceed 100%.',
        ];
    }
}