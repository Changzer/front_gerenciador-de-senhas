import React, {useDebugValue, useState, useContext, useEffect} from 'react'
import Senha from "../components/Senha";
const Login = () => {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const[usuario, setUsuario] = useState("");
    const[token, setToken] = useState("");

    const [senhas, setSenhas] = useState([]);

    const useLogin = (e) => {
        e.preventDefault()
        const requisicao = async () => {
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    'username': username,
                    'password': password,
                })
            });
            const json = await res.text()
            setToken(json)
        }
        requisicao()
        console.log(token)

    }

    const useReceberItems = () => {
        const fetchData = async() => {
            const res = await fetch('http://localhost:8080/api/senha', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":token
                },
            })
            const json = await res.json()
            setSenhas(json)
        }
        fetchData()
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Gerenciador de Senhas</h1>

                <form onSubmit={useLogin}>
                    <label>Usuário:
                        <input type={"text"} value={username} onChange={(event)=>setUsername(event.target.value)} />
                    </label>
                    <br/>
                    <label>Senha:
                        <input type={"text"} value={password} onChange={(event)=>setPassword(event.target.value)}/>
                    </label>
                    <br/>
                    <input type="submit" value={'login'}/>

                </form>

                {token}

                {token !== null && ( <button onClick={useReceberItems}>Mostrar Lista de Senhas</button>)}


                {token !== null && (
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Descricao</th>
                            <th>URL</th>
                            <th>Senha</th>
                        </tr>
                        {senhas.map((senha1)=>
                            (
                                <tr>
                                    <td>{senha1.id}</td>
                                    <td>{senha1.descricao}</td>
                                    <td>{senha1.url}</td>
                                    <td>{senha1.password}</td>

                                </tr>
                            ))}
                    </table>
                )}

                {token !== null && <Senha token={token} useReceberItems={useReceberItems}/>}



            </header>
        </div>
    );

}



export default Login