import React from 'react'

const BtnLink = ({ href , children, title}) => {
  return (
    <a data-tippy-content={title} href={href} target="_blank" className=" transition-all horizontal gap-1 border-solid border border-neutral-300/0 bg-neutral-400/10 hover:bg-neutral-400/40 px-2 py-1 rounded-lg hover:scale-[1.16] max-sm:bg-neutral-400/25">
        {children}
    </a>
  )
}

export default BtnLink