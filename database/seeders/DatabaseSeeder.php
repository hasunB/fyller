<?php

namespace Database\Seeders;

use App\Domain\Customers\Models\Customer;
use App\Domain\User\Models\User;
use App\Domain\Inventory\Models\Category;
use App\Domain\Inventory\Models\Product;
use App\Domain\Orders\Models\Order;
use App\Domain\Orders\Models\OrderItem;
use App\Domain\Expenses\Models\Expense;
use App\Domain\Expenses\Models\ExpenseRecurringRule;
use App\Domain\Expenses\Models\ExpenseTransaction;
use App\Domain\Employees\Models\Employee;
use App\Domain\Employees\Models\EmployeeStatus;
use App\Domain\Employees\Models\EmployeeStatusLog;
use App\Domain\Employees\Models\Address;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Domain\Employees\Models\Role;
use App\Domain\Employees\Models\RolePermission;
use App\Domain\Employees\Models\EmployeePermission;
use App\Domain\Employees\Models\EmployeeRole;
use App\Domain\Employees\Models\Permission;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        Category::factory(10)->create();
        Product::factory(100)->create();

        $types = [
            ['name' => 'Individual'],
            ['name' => 'Business'],
            ['name' => 'Non-Profit'],
            ['name' => 'Government'],
        ];
        foreach ($types as $type) {
            DB::table('customer_type')->insert(array_merge($type, ['created_at' => now(), 'updated_at' => now()]));
        }

        $statuses = [
            ['name' => 'Active'],
            ['name' => 'Inactive'],
            ['name' => 'Suspended'],
            ['name' => 'Pending'],
        ];
        foreach ($statuses as $status) {
            DB::table('customer_status')->insert(array_merge($status, ['created_at' => now(), 'updated_at' => now()]));
        }

        $paymentStatuses = [
            ['name' => 'Pending'],
            ['name' => 'Paid'],
            ['name' => 'Failed'],
            ['name' => 'Refunded']
        ];
        foreach ($paymentStatuses as $status) {
            DB::table('payment_status')->insert(array_merge($status, ['created_at' => now(), 'updated_at' => now()]));
        }

        $paymentTypes = [
            ['name' => 'Credit Card'],
            ['name' => 'PayPal'],
            ['name' => 'Bank Transfer'],
            ['name' => 'Cash']
        ];
        foreach ($paymentTypes as $type) {
            DB::table('payment_type')->insert(array_merge($type, ['created_at' => now(), 'updated_at' => now()]));
        }

        $fulfillmentStatuses = [
            ['name' => 'Unfulfilled'],
            ['name' => 'Processing'],
            ['name' => 'Shipped'],
            ['name' => 'Delivered'],
            ['name' => 'Returned'],
            ['name' => 'Cancelled']
        ];
        foreach ($fulfillmentStatuses as $status) {
            DB::table('fulfillment_status')->insert(array_merge($status, ['created_at' => now(), 'updated_at' => now()]));
        }

        $channelTypes = [
            ['name' => 'Web'],
            ['name' => 'Mobile'],
            ['name' => 'POS']
        ];
        foreach ($channelTypes as $type) {
            DB::table('channel_types')->insert(array_merge($type, ['created_at' => now(), 'updated_at' => now()]));
        }

        Customer::factory(10)->create();
        Order::factory(30)->create();
        OrderItem::factory(50)->create();

        $expenseCategories = [
            ['name' => 'Rent'],
            ['name' => 'Utilities'],
            ['name' => 'Supplies'],
            ['name' => 'Marketing'],
            ['name' => 'Shipping'],
            ['name' => 'Salary'],
            ['name' => 'Travel'],
            ['name' => 'Software'],
            ['name' => 'Infrastructure'],
            ['name' => 'Other'],
        ];
        foreach ($expenseCategories as $category) {
            DB::table('expense_categories')->insert(array_merge($category, ['created_at' => now(), 'updated_at' => now()]));
        }

        $expenseStatuses = [
            ['name' => 'Pending'],
            ['name' => 'Paid'],
            ['name' => 'Failed'],
            ['name' => 'Refunded'],
            ['name' => 'Cancelled'],
            ['name' => 'Review Needed'],
            ['name' => 'Approved'],
            ['name' => 'Rejected'],
            ['name' => 'On Hold'],
            ['name' => 'Unpaid'],
            ['name' => 'AI Flagged'],
        ];
        foreach ($expenseStatuses as $status) {
            DB::table('expense_status')->insert(array_merge($status, ['created_at' => now(), 'updated_at' => now()]));
        }

        $merchants = [
            ['name' => 'Amazon'],
            ['name' => 'eBay'],
            ['name' => 'AliExpress'],
            ['name' => 'Etsy'],
            ['name' => 'Walmart'],
            ['name' => 'Target'],
            ['name' => 'Best Buy'],
            ['name' => 'Home Depot'],
            ['name' => 'Lowe\'s'],
            ['name' => 'Other'],
        ];
        foreach ($merchants as $merchant) {
            DB::table('merchants')->insert(array_merge($merchant, ['created_at' => now(), 'updated_at' => now()]));
        }

        Expense::factory(10)->create();
        ExpenseRecurringRule::factory(10)->create();
        ExpenseTransaction::factory(100)->create();

        $employeeStatuses = [
            ['name' => 'Active'],
            ['name' => 'Inactive'],
            ['name' => 'On Leave'],
            ['name' => 'Terminated'],
            ['name' => 'On Probation'],
            ['name' => 'Contractor'],
            ['name' => 'Part-Time'],
            ['name' => 'Full-Time'],
            ['name' => 'Intern'],
            ['name' => 'Temporary'],
        ];
        foreach ($employeeStatuses as $status) {
            DB::table('employee_status')->insert(array_merge($status, ['created_at' => now(), 'updated_at' => now()]));
        }

        $departments = [
            ['name' => 'Human Resources'],
            ['name' => 'Finance'],
            ['name' => 'IT'],
            ['name' => 'Sales'],
            ['name' => 'Marketing'],
            ['name' => 'Operations'],
            ['name' => 'Customer Support'],
            ['name' => 'Legal'],
            ['name' => 'Research & Development'],
            ['name' => 'Executive'],
        ];
        foreach ($departments as $department) {
            DB::table('departments')->insert(array_merge($department, ['created_at' => now(), 'updated_at' => now()]));
        }

        $permissions = [
            ['name' => 'Create'],
            ['name' => 'Read'],
            ['name' => 'Update'],
            ['name' => 'Delete'],
        ];
        foreach ($permissions as $permission) {
            DB::table('permissions')->insert(array_merge($permission, ['created_at' => now(), 'updated_at' => now()]));
        }

        Employee::factory(10)->create();
        Role::factory(10)->create();
        RolePermission::factory(10)->create();
        EmployeePermission::factory(10)->create();
        EmployeeRole::factory(10)->create();
        EmployeeStatusLog::factory(10)->create();
        Address::factory(10)->create();
    }
}
