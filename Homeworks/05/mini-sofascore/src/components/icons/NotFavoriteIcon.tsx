import React from 'react'

export default function NotFavoriteIcon({ width = 24, height = 24 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor">
            <path
                fill="currentColor"
                d="M17 14V6l-2-2h-2V2h-2v2H9L7 6v8l-2 2v2h14v-2l-2-2zm-9.17 2 .59-.59.59-.59V6.83L9.84 6h4.34l.83.83v8l.59.59.59.59H7.83V16zM14 20h-4v2h4v-2z"
                fill-rule="evenodd"
            ></path>
        </svg>
    )
}
