import { useState, useEffect } from 'react'
import './tables.css'

export default function PageTable() {
    return (
        <>
            <UserTable />
            <TitleTable />
            <ChapterByUserTable />
            < PensioneerTable />
            <TitleFormCreate />
            <TitleFormDelete />
            < TitleFormPatch />
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
            <h2>Users</h2>
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
                    <td>{info._id}</td>
                </tr>
            )
        }
    )
    return (
        <>
            <br></br>
            <h2>Titles</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
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
        </>
    )
}


function PensioneerTable() {
    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchData = () => fetch('http://localhost:3001/chapters/title/Pensioneers')
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch(err => console.error("Error fetching:", err))
        
        fetchData()
        const refresh = setInterval(fetchData,5000)
        return () =>{
            clearInterval(refresh)
            console.log("Memory was cleaned, I promise!")
        }

    }, [])

    // format the worker arrays into a readable string
    const formatWorkers = (workersArray) =>
        workersArray.length > 0 ? workersArray.join(', ') : "None";

    // Helper to format date
    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString('de-DE');
    };

    const DisplayDataForTable = data.map((info) => {
        return (
            <tr key={info._id}>

                <td><b>{info.name}</b></td>
                <td>{formatWorkers(info.tasks.cleaner.workers)}</td>
                <td>{formatWorkers(info.tasks.typer.workers)}</td>
                <td>{formatWorkers(info.tasks.translator.workers)}</td>
                <td>{formatWorkers(info.tasks.editor.workers)}</td>
                <td>{formatDate(info.tasks.cleaner.deadline)}</td>

                {/* 4. Published Status */}
                <td>{info.isPublished ? "✅ Yes" : "❌ No"}</td>
            </tr>
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Chapter Name</th>
                    <th>Cleaner</th>
                    <th>Typer</th>
                    <th>Translator</th>
                    <th>Editor</th>
                    <th>Deadline</th>
                    <th>Published</th>
                </tr>
            </thead>
            <tbody>
                {DisplayDataForTable}
            </tbody>
        </table>
    )
}

function TitleFormCreate() {
    function formatDDMMYYYY(d) {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}.${mm}.${yyyy}`;
    }
    let today = new Date()
    let plus7 = new Date(today);
    plus7.setDate(plus7.getDate() + 7);


    const [chapter, setChapter] = useState("Chapter 1: How it all started")
    const [cleaner, setCleaner] = useState("Hex")
    const [typer, setTyper] = useState("Htoss")
    const [editor, setEditor] = useState("Htoss")
    const [translator, setTranslator] = useState("Kji")
    const [deadline, setDeadline] = useState(formatDDMMYYYY(plus7))

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Having this funny things:", { chapter, cleaner, typer, editor, deadline })
        let data
        let parseddate = new Date(deadline)
        const payload = {
            name: chapter,
            isPublished: false,
            titleId: "69f0886dfdae3c6adf53c903",
            tasks: {
                cleaner: { workers: [cleaner], deadline: parseddate, status: "Not Started" },
                typer: { workers: [typer], deadline: parseddate, status: "Not Started" },
                translator: { workers: [translator], deadline: parseddate, status: "Not Started" },
                editor: { workers: [editor], deadline: parseddate, status: "Not Started" }
            }
        }
        console.log({ payload })

        fetch('http://localhost:3001/chapters', {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/json', // Tell the server to expect JSON
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((json) => data = json)


        console.log(data)
    }
    return (
        <>
            <br></br>
            <h2>Add new chapter to the title "Pensioneers"</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <label>Name of the Chapter</label>
                    <input
                        placeholder="Write the chapter name"
                        value={chapter}
                        onChange={(e) => setChapter(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Cleaner</label>
                    <input
                        value={cleaner}
                        onChange={(e) => setCleaner(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Translator</label>
                    <input
                        value={translator}
                        onChange={(e) => setTranslator(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Typer</label>
                    <input
                        value={typer}
                        onChange={(e) => setTyper(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Editor</label>
                    <input
                        value={editor}
                        onChange={(e) => setEditor(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Deadline</label>
                    <input
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Create</button>
            </form>

        </>
    )
}

function TitleFormPatch() {
    function formatDDMMYYYY(d) {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}.${mm}.${yyyy}`;
    }
    let today = new Date()
    let plus7 = new Date(today);
    plus7.setDate(plus7.getDate() + 7);


    const [chapter, setChapter] = useState("Chapter 1: How it all started")
    const [cleaner, setCleaner] = useState("Hex")
    const [typer, setTyper] = useState("Htoss")
    const [editor, setEditor] = useState("Htoss")
    const [translator, setTranslator] = useState("Kji")
    const [deadline, setDeadline] = useState(formatDDMMYYYY(plus7))

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Having this funny things:", { chapter, cleaner, typer, editor, deadline })
        let data
        let parseddate = new Date(deadline)
        const payload = {
            name: chapter,
            isPublished: false,
            titleId: "69f0886dfdae3c6adf53c903",
            tasks: {
                cleaner: { workers: [cleaner], deadline: parseddate, status: "Not Started" },
                typer: { workers: [typer], deadline: parseddate, status: "Not Started" },
                translator: { workers: [translator], deadline: parseddate, status: "Not Started" },
                editor: { workers: [editor], deadline: parseddate, status: "Not Started" }
            }
        }
        console.log({ payload })

        fetch('http://localhost:3001/chapters', {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/json', // Tell the server to expect JSON
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((json) => data = json)


        console.log(data)
    }
    return (
        <>
            <br></br>
            <h2>Edit chapter in the title "Pensioneers"</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <label>Name of the Chapter</label>
                    <input
                        placeholder="Write the chapter name"
                        value={chapter}
                        onChange={(e) => setChapter(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Cleaner</label>
                    <input
                        value={cleaner}
                        onChange={(e) => setCleaner(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Translator</label>
                    <input
                        value={translator}
                        onChange={(e) => setTranslator(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Typer</label>
                    <input
                        value={typer}
                        onChange={(e) => setTyper(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Editor</label>
                    <input
                        value={editor}
                        onChange={(e) => setEditor(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Deadline</label>
                    <input
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Create</button>
            </form>

        </>
    )
}

function TitleFormDelete() {
    const [chapter, setChapter] = useState("Chapter 1: How it all started")
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("Having this funny things:", { chapter, cleaner, typer, editor, deadline })
        let data
        const payload = {
            name: chapter,
            titleId: "69f0886dfdae3c6adf53c903"
        }
        console.log({ payload })

        fetch('http://localhost:3001/chapters', {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/json', // Tell the server to expect JSON
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((json) => data = json)


        console.log(data)
    }
    return (
        <>
            <br></br>
            <h2>Delete chapter from the title "Pensioneers"</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <label>Name of the Chapter</label>
                    <input
                        placeholder="Write the chapter name"
                        value={chapter}
                        onChange={(e) => setChapter(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Delete!</button>
            </form>

        </>
    )
}
