import React from 'react';
import Layout from "@/Components/Admin/Layouts/DashboardLayout";

export default function Inventory() {
    return (
        <Layout title="Inventory">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Inventory</h1>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Add Product
                </button>
            </div>
        </Layout>
    );
}