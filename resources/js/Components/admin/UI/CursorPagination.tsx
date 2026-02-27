import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CursorPaginationProps {
    data: {
        data: any[];
        next_page_url: string | null;
        prev_page_url: string | null;
        per_page: number;
    };
}

export default function CursorPagination({ data }: CursorPaginationProps) {
    const isFirstPage = !data.prev_page_url;
    const hasNextPage = !!data.next_page_url;

    // A smart label to show context since we don't have page numbers
    const getPageLabel = () => {
        if (isFirstPage && !hasNextPage) return 'All results shown';
        if (isFirstPage) return 'First Page';
        return 'Browsing History';
    };

    return (
        <div className="px-6 py-4 border-t border-gray-800 flex flex-col sm:flex-row justify-start items-center bg-gray-900/30 gap-4">
            
            {/* Left Side: Status Text */}
            <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${data.data.length > 0 ? 'bg-indigo-500' : 'bg-gray-700'}`}></span>
                <span>
                    Showing <span className="text-gray-300 font-bold">{data.data.length}</span> items
                </span>
                <span className="text-gray-700 mx-2">|</span>
                <span className="text-gray-400">{getPageLabel()}</span>
            </div>

            {/* Right Side: Navigation Buttons */}
            <div className="flex items-center gap-2">
                {/* PREVIOUS BUTTON */}
                {data.prev_page_url ? (
                    <Link
                        href={data.prev_page_url}
                        preserveScroll
                        preserveState
                        className="group flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-400 bg-gray-950 border border-gray-800 rounded-lg hover:border-indigo-500/50 hover:text-white hover:shadow-[0_0_10px_-3px_rgba(99,102,241,0.3)] transition-all"
                    >
                        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                        Previous
                    </Link>
                ) : (
                    <button
                        disabled
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-950/50 border border-gray-800/50 rounded-lg cursor-not-allowed"
                    >
                        <ChevronLeft className="w-3 h-3" />
                        Previous
                    </button>
                )}

                {/* NEXT BUTTON */}
                {data.next_page_url ? (
                    <Link
                        href={data.next_page_url}
                        preserveScroll
                        preserveState
                        className="group flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-400 bg-gray-950 border border-gray-800 rounded-lg hover:border-indigo-500/50 hover:text-white hover:shadow-[0_0_10px_-3px_rgba(99,102,241,0.3)] transition-all"
                    >
                        Next
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                ) : (
                    <button
                        disabled
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-950/50 border border-gray-800/50 rounded-lg cursor-not-allowed"
                    >
                        Next
                        <ChevronRight className="w-3 h-3" />
                    </button>
                )}
            </div>
        </div>
    );
}