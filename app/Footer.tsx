import SocialIcons from "./SocialIcons"

const Footer = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-between z-10 px-4 py-2 mt-8 gap-2 items-center bg-[#f8f6f4] text-xs text-gray-400'>
            <div className='flex items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" fill="none" viewBox="0 0 20 20" className="inline-block"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M13.5 13c-.6.5-1.3.8-2.1.8-2 0-3.4-1.4-3.4-3.8s1.4-3.8 3.4-3.8c.8 0 1.5.3 2.1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <p>2025 Nstream AI India Pvt. Ltd. All rights reserved.</p>
        </div>
        <SocialIcons />
    </div>
    )
}

export default Footer;