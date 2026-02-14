import React from 'react';

// Enterprise Tip: Use "Compound Components" for flexibility
export const Table = ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left text-sm text-gray-500 bg-white">
            {children}
        </table>
    </div>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
    <tr>{children}</tr>
    </thead>
);

export const TableRow = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <tr
        onClick={onClick}
        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
    >
        {children}
    </tr>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
    <th scope="col" className="px-6 py-4 font-semibold">
        {children}
    </th>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
    <td className="px-6 py-4 whitespace-nowrap">
        {children}
    </td>
);
