import { useState, useEffect } from 'react'
import './tables.css'

export default function Home() {
    return (
        <>
            <ChapterByUserTable />
        </>
    )
}

const users = [
    //{ name: "Kji", id: "69ea5f4c377d7d1b26d7d552" },
    //{ name: "Feu", id: "69ea7900d9cb3c36fd560670" },
    { name: "Moth", id: "69ea7a6748811209d2eb383e" },
    { name: "Htoss", id: "69ea7bec48811209d2eb383f" },
    { name: "Vika", id: "69ea7c0148811209d2eb3840" },
    // { name: "Helo", id: "69ea7c0b48811209d2eb3841" },
    { name: "Hex", id: "69ea7c1848811209d2eb3842" },
    { name: "Chori", id: "69ea7c5a48811209d2eb3843" },
]

function ChapterByUserTable() {

    const [data, setData] = useState([])
    const [selectedUserId, setSelectedUserId] = useState(users[3].id);
    useEffect(() => {
        fetch(`http://localhost:3001/users/${selectedUserId}/chapters`)
            .then((res) => res.json())
            .then((json) => setData(json))
    }, [selectedUserId])

    const handleUserChange = (event) => {
        setSelectedUserId(event.target.value)
    }
    const DisplayDataForTable = data && data.length > 0
        ? data.map(
            (info) => {
                const time = new Intl.DateTimeFormat('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).format(new Date(info.deadline))
                return (
                    <tr>
                        <td><b>{info.titleName}</b></td>
                        <td>{info.chapterName}</td>
                        <td>{info.role}</td>
                        <td>{time}</td>
                        <td>{info.status}</td>
                        {/* <td>{info._id}</td> */}
                    </tr>
                )
            }
        )
        : <tr><td colSpan="5" style={{ textAlign: 'center' }}>No data found for this user.</td></tr>
    return (
        <>
            <h2>Chapter by user</h2>
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

            <select value={selectedUserId} onChange={handleUserChange}>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </>
    )
}