
const Button = ({type , children , onClick , submit ,tippyContent ,tippyTheme , className}) => {

    const buttonProps = {
        ...(tippyContent && {'data-tippy-content' : tippyContent}),
        ...(tippyTheme && {'data-tippy-theme' : tippyTheme}),
        type : (submit ? 'submit' : 'button'),
        onClick : (onClick || (() =>{}))
    }


  return (

        <button {...buttonProps} className={`py-2 px-3 ${type === 'secondary' ? 'bg-white/[.03] hover:bg-white/[.08] text-orange-500' : 'bg-orange-700 hover:bg-orange-600 text-white '} rounded-lg active:scale-[.95] shrink-0 no-select ${className || className}` }>{children}</button>

    )
}

export default Button