<?php

namespace App\Presentation\Requests\Employees;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'role_id' => $this->role,
            'department_id' => $this->department,
        ]);

        $this->request->remove('role');
        $this->request->remove('department');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Base Rules
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'role' => 'required|exists:roles,id',
            'password' => 'required|string|min:8|confirmed',
            'department' => 'required|exists:departments,id',
            'job_title' => 'nullable|string|max:255',
            'date_of_joining' => 'required|date',
            'mobile_number' => 'required|string|max:20', // Changed from numeric|min:10 as min:10 on numeric means >= 10
            'permissions' => [
                'required',
                'array',
                function ($attribute, $value, $fail) {
                    // Check if at least one permission evaluates to true
                    if (collect($value)->filter(fn($v) => filter_var($v, FILTER_VALIDATE_BOOLEAN))->isEmpty()) {
                        $fail('At least one permission must be selected.');
                    }
                },
            ],
            'permissions.*' => 'boolean',
        ];
    }
}
