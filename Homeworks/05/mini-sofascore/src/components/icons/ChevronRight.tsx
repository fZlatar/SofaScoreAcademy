import { styled } from '@kuma-ui/core'
import React from 'react'

/* cSpell:disable */
export default function ChevronRight({ width = 24, height = 24 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#idc0jjbrba)">
                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="idc0jjbrba">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    )
}
