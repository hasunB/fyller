<?php

namespace App\Presentation\Requests\Expenses;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpenseRequest extends FormRequest
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
            'category_id' => $this->category,
            'merchant_id' => $this->merchant,
            'expense_date' => $this->date,
            'expire_date' => $this->expiry_date,
        ]);

        // Unset the old keys from the request
        $this->request->remove('category');
        $this->request->remove('merchant');
        $this->request->remove('date');
        $this->request->remove('expiry_date');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isRecurring = $this->boolean('is_recurring');

        return [
            // Base Rules
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'merchant_id' => 'required|exists:merchants,id',
            'amount' => [$isRecurring ? 'nullable' : 'required', 'numeric', $isRecurring ? 'min:0' : 'min:0.01'],
            'date' => 'nullable|date',
            'enable_ai_forecast' => 'boolean',
            'enable_anomaly_detection' => 'boolean',
            'is_recurring' => 'boolean',

            // Recurring Rules (Only required if is_recurring is true)
            'recurring_frequency' => [$isRecurring ? 'required' : 'nullable', 'in:monthly,weekly,daily,yearly'],
            'recurring_interval' => [$isRecurring ? 'required' : 'nullable', 'numeric', 'min:1'],
            'recurring_amount' => [$isRecurring ? 'required' : 'nullable', 'numeric', 'min:0.01'],
            'recurring_start_date' => [$isRecurring ? 'required' : 'nullable', 'date'],

            // These are nullable anyway, but you can restrict them if needed
            'recurring_end_date' => 'nullable|date',
            'recurring_next_run_date' => 'nullable|date',
        ];
    }
}
