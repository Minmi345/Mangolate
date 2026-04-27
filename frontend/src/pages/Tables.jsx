import { useState, useEffect } from 'react'

export default function PageTable() {
    return (
        <>
            <UserTable />
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
                    <td>{info.hashed_password}</td>
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
                        <th>Id</th>
                        <th>Name</th>
                        <th>password</th>
                        <th>roles</th>
                    </tr>

                </thead>

                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </>
    )
}

function ChangeUserName(){

    return(
        <>
        <form>
            
        </form>
        </>
    )
}

