import React from 'react'

export default function PieChart({ width = 40, height = 40, percentage = 0.0 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 36c8.837 0 16-7.163 16-16S28.837 4 20 4 4 11.163 4 20s7.163 16 16 16zm0-6c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
                fill="#374DF5"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.64 6.358A16 16 0 0 1 20 4v6c-5.523 0-10 4.477-10 10 0 2.197.708 4.228 1.91 5.878l-4.854 3.527A16 16 0 0 1 11.64 6.358z"
                fill="#F0EEDF"
            />
        </svg>
    )
}
