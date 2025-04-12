import Image from "next/image"
import SocialIcons from "./SocialIcons"
import copyright from '../assets/copyright.png'

const Footer = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-between z-10 px-[10%] mt-[32px] sm:mt-12 gap-[10px] sm:gap-0 items-center bg-[#F4F4F4] py-[30px] relative'>
        <div className='flex text-[#474747] items-center gap-[4px]'>
            <p>Copyright</p>
            <Image src={copyright} alt='copyright' className='w-[16px] h-[14px]' />
            <p>2020 Meliora, Inc</p>
        </div>
        <SocialIcons />
    </div>
    )
}

export default Footer;