export function SillyPage() {
    return (
        <>
        <main className="content">

            <Yipee />
            <ToDoList />
            <Paragraph text={"This is how to reuse components with different things in it"}/>
            <Paragraph text={"Same component, different text"}/>
            <svg className="icon" role="presentation" aria-hidden="true"></svg>
        </main>
        </>
    )
}

function Yipee() {
    return (
        <h1>Teheee :3</h1>
    )
}

function Paragraph({text}){
    return(
        <>
        <p>{text}</p>
        </>
    )
}

const today = new Date();

function formatDate(date) {
    return new Intl.DateTimeFormat(
        'en-US',
        { weekday: 'long' }
    ).format(date);
}

function ToDoList() {
    return (
        <h1> To Do List for {formatDate(today)}</h1>
    )
}