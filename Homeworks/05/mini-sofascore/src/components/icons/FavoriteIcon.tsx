import React from 'react'

export default function FavoriteIcon({ width = 24, height = 24 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor">
            <path
                fill="currentColor"
                d="M13 2v2h2l2 2v8l2 2v2H5v-2l2-2V6l2-2h2V2h2zm-8.71.29 1.42 1.42L4 5.41V8H2V4.59l2.29-2.3zm15.42 0L22 4.59V8h-2V5.41l-1.71-1.7 1.42-1.42zM14 20h-4v2h4v-2z"
                fillRule="evenodd"
            ></path>
        </svg>
    )
}
