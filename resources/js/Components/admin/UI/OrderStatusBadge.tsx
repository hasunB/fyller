import React from "react";
import { CheckCircle2, Clock, XCircle, AlertTriangle, Truck } from "lucide-react";

interface OrderStatusBadgeProps {
    status: string;
    type: 'payment' | 'fulfillment';
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, type }) => {
    const styles: any = {
        // Payment Styles
        'Paid': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        'Failed': 'bg-red-500/10 text-red-400 border-red-500/20',

        // Fulfillment Styles
        'Unfulfilled': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        'Processing': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'Shipped': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        'Delivered': 'bg-green-500/10 text-green-400 border-green-500/20',
    };

    const Icons: any = {
        'Paid': CheckCircle2,
        'Pending': Clock,
        'Failed': XCircle,
        'Unfulfilled': AlertTriangle,
        'Processing': Clock,
        'Shipped': Truck,
        'Delivered': CheckCircle2
    };

    const Icon = Icons[status] || Clock;

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]} flex items-center gap-1.5 w-fit`}>
            <Icon className="w-3 h-3" />
            {status}
        </span>
    );
};

export default OrderStatusBadge;