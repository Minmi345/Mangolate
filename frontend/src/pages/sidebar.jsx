import logo from '../assets/logo.svg';
import './sidebar.css'
import { SillyPage } from './SillyPage';

export default function HomePage() {
    return (
        <>
            <div class="container">
                <Sidebar />

                <main class="content">
                    <h1>Main Content Area</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ipsa magnam error ducimus sit, eveniet voluptates, amet aspernatur assumenda deserunt alias repellat architecto eius sapiente nisi. Explicabo blanditiis optio dolores.
                </main>
            </div>
        </>)
}

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
export function Sidebar() {
    return (
        <>
            <sidebar class="sidebar">
                <Logo />

            </sidebar>
        </>
    )
}

export function Logo() {
    return (
        <>
            <img src={logo} alt="logo" width="150px" class="logo"></img>

            <BrowserRouter>
                <nav>
                    <Link class="Links" to="/">Home</Link> {" "}
                    <Link class="Links" to="/liam">Liam</Link> {" "}
                    <Link class="Links" to="/sillyPage">Silly Page</Link> {" "}
                    <Link class="Links" to="/SignUpPage">Sign Up/ Log In Page</Link> {" "}
                    <Link class="Links" to="/Table">See some cool table</Link> {" "}
                    <Link class="Links" to="/contact">Contact</Link>

                </nav>
                <Routes>

                    <Route path="/liam" element={<p>Liam's secret page!!!!!!!! Love you good luck xx</p>} />
                    <Route path="/sillyPage" element={<SillyPage />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

{/* Routes */ }
<Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/sillyPage" element={<SillyPage />} />
    <Route path="/contact" element={<p>this is contact page :)</p>} />
</Routes>

function SidebarLinks({ text, link }) {
    return (
        <>
            <a href={link} class="Links">{text}</a>
        </>)
}