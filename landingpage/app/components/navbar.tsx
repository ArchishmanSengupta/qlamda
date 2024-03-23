import { Link } from '@remix-run/react'
import { GithubIcon } from 'lucide-react'
import {
    Select
} from '~/components/ui/select'
import useTheme, { changeTheme } from '~/hooks/use-theme'
import { type ThemeName } from '~/registry/themes'

const Navbar = () => {
    const [theme, setTheme] = useTheme()
    return (
        <div className='px-5 py-2'>
            <nav className='mx-auto flex max-w-7xl items-center justify-between'>
                <Link to='/' className='flex items-center gap-2'>
                <img src='/ql.png' alt="QL Logo" className="h-10 w-10" />
                    {/* <span className='hidden text-lg font-semibold md:block'>
                        QlaMDA
                    </span> */}
                </Link>
                <div className='flex items-center gap-5'>
                    <a
                        href='https://github.com/ArchishmanSengupta/QLaMDA'
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background/30 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-white/10'
                        aria-label='my github'
                    >
                        <GithubIcon className='h-5 w-5' />
                    </a>
                    <Select
                        onValueChange={(theme: ThemeName) => {
                            changeTheme(theme)
                            setTheme(theme)
                        }}
                        value={theme}
                    >
                    </Select>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
