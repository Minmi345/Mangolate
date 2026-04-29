import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'

export default function SignPage() {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in with:", { user, password })
        const hashedPassword = await bcrypt.hash(password, 10)

        const [data, setData] = useState([])
        useEffect(() => {
            fetch('http://localhost:3001/users')
                .then((res) => res.json())
                .then((json) => setData(json))
        }, [])

        console.log(data)
    }

    return (
        <>

            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label>User Name</label>
                    <input
                        type="user"
                        placeholder="FunnyGuy"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Sign In</button>
            </form>

        </>
    )
}

