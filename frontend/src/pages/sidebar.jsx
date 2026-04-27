import logo from '../assets/logo.svg'
import useful from '../assets/tasks/useful.svg'
import favourite from '../assets/tasks/favorite.svg'
import projects from '../assets/tasks/projects.svg'
import profile from '../assets/profile.svg'
import deadline from '../assets/tasks/deadline.svg'
import warning from '../assets/tasks/warning.svg'
import SignPage from './signPage'
// import deadline from '../assets/tasks/.svg'
import './sidebar.css'
import PageTable from './Tables'
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import { SillyPage } from './SillyPage'
import Useful from './Useful'

export default function HomePage() {
    return (
        <>
            <div class="container">
                <Sidebar />

            </div>
        </>)
}

export function Icon({src}) {
    return (
        <>
        <img src={src} className='icon' width='20px'></img>
        </>)
}

export function Sidebar() {
    return (
        <>
                <BrowserRouter>
                    <nav className="sidebar">
                        <Logo />
                        <NavLink className="Links" to="/Table"><Icon src={projects}/>See some cool table</NavLink> {" "}
                        <NavLink className="Links" to="/"> <Icon src={deadline}/>Home</NavLink> {" "}
                        <NavLink className="Links" to="/Useful"><Icon src={useful}/>Useful info</NavLink> {" "}
                        <NavLink className="Links" to="/SignUpPage"><Icon src={profile}/>Sign Up/ Log In Page</NavLink> {" "}
                        <NavLink className="Links" to="/liam"><Icon src={favourite}/>Liam</NavLink> {" "}
                        <NavLink className="Links" to="/sillyPage"><Icon src={warning}/>Silly Page</NavLink> {" "}

                    </nav>
                    <main className='content'>
                    <Routes>
                        <Route path="/liam" element={<p>Liam's secret page!!!!!!!! Love you good luck xx</p>} />
                        <Route path="/sillyPage" element={<SillyPage />} />
                        <Route path="/SignUpPage" element={<SignPage />} />
                        <Route path="/Useful" element={<Useful />} />
                        <Route path="/Table" element={<PageTable />} />
                    </Routes>
</main>
                </BrowserRouter>
        </>
    )
}

export function Logo() {
    return (
        <>
            <img src={logo} alt="logo" width="150px" class="logo"></img>
        </>
    )
}