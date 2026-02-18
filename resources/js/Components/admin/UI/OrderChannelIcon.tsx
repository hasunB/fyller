import React from "react";
import { Globe, Smartphone, Store } from "lucide-react";

interface OrderChannelIconProps {
    channel: string;
}

const OrderChannelIcon: React.FC<OrderChannelIconProps> = ({ channel }) => {
    if (channel === 'Web') return <Globe className="w-4 h-4 text-indigo-400" />;
    if (channel === 'Mobile') return <Smartphone className="w-4 h-4 text-purple-400" />;
    return <Store className="w-4 h-4 text-orange-400" />;
};

export default OrderChannelIcon;