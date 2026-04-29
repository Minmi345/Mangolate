import { useState, useEffect } from 'react'
import './tables.css'

export default function PageTable() {
    return (
        <>
            <UserTable />
            <TitleTable />
            <ChangeUserName />
        </>
    )
}

function UserTable() {

    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then((res) => res.json())
            .then((json) => setData(json))
    }, [])
    const DisplayData = data.map(
        (info) => {
            return (
                <tr>
                    <td><b>{info.name}</b></td>
                    <td>{info.roles.join(', ')}</td>
                    <td>{info._id}</td>
                    {/* <td>{info.hashed_password}</td> */}
                </tr>
            )
        }
    )
    return (
        <>
            Tabel
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>roles</th>
                        <th>Id</th>
                        {/* <th>password</th> */}
                    </tr>

                </thead>

                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </>
    )
}

function TitleTable() {

    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/titles')
            .then((res) => res.json())
            .then((json) => setData(json))
    }, [])
    const DisplayDataForTable = data.map(
        (info) => {
            return (
                <tr>
                    <td><b>{info.name}</b></td>
                    {/* <td>{info._id}</td> */}
                </tr>
            )
        }
    )
    return (
        <>
            Tabel
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Id</th> */}
                    </tr>

                </thead>

                <tbody>
                    {DisplayDataForTable}
                </tbody>
            </table>
        </>
    )
}
function ChapterByUserTable() {

    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/users/69ea7bec48811209d2eb383f/chapters')
            .then((res) => res.json())
            .then((json) => setData(json))
    }, [])
    const DisplayDataForTable = data.map(
        (info) => {
            return (
                <tr>
                    <td><b>{info.name}</b></td>
                    <td><b>{info.name}</b></td>
                    <td><b>{info.name}</b></td>
                    {/* <td>{info._id}</td> */}
                </tr>
            )
        }
    )
    return (
        <>
            Tabel
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Chapter</th>
                        <th>Role</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        {/* <th>Id</th> */}
                    </tr>

                </thead>

                <tbody>
                    {DisplayDataForTable}
                </tbody>
            </table>
        </>
    )
}

function ChangeUserName() {
    const [user, setUser] = useState("")
    const [role, setRole] = useState("")
    const [data, setData] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Changing role of:", { user, role })


        fetch('http://localhost:3001/' + user, {
            method: 'PATCH', // Specify the method
            headers: {
                'Content-Type': 'application/json', // Tell the server to expect JSON
            },
            body: JSON.stringify([role])
        })
            .then((res) => res.json())
            .then((json) => setData(json))


        console.log(data)
    }
    return (
        <>
            return (
            <>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>User Name</label>
                        <input
                            type="user"
                            placeholder="Kji"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Role</label>
                        <input
                            type="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Sign In</button>
                </form>

            </>
            )
        </>
    )
}

