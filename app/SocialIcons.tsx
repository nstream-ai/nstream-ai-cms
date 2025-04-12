import fbIcon from '../assets/fbIcon.png'
import githubIcon from '../assets/githubIcon.png'
import linkedinIcon from '../assets/linkedinIcon.png'
import xIcon from '../assets/xIcon.png'
import Image from 'next/image'

const SocialIcons = () => {
    return (
        <div className='flex gap-[40px]'>
            <Image src={fbIcon} alt='fbIcon' className='w-[12px] h-[18px]' />
            <Image src={linkedinIcon} alt='linkedinIcon' className='w-[16px] h-[18px]' />
            <Image src={githubIcon} alt='githubIcon' className='w-[16px] h-[18px]' />
            <Image src={xIcon} alt='xIcon' className='w-[16px] h-[18px]' />
        </div>
    )
}
export default SocialIcons;