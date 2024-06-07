import React from 'react'

/* cSpell:disable */
export default function RedCard({ width = 24, height = 24 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2H6a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" fill="#EA4545" />
        </svg>
    )
}
