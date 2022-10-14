import React from 'react'

import { useState } from 'react'
const Senha = ({token, useReceberItems}) => {

    const [urlSenha, setUrl] = useState("")
    const [descricaoSenha, setDescricao] = useState("")
    const [passwordSenha, setPasswordSenha] = useState("")

    const useSenha = (e) => {
        e.preventDefault()
        const requesicao = async() => {

            const data = {
                descricao: descricaoSenha,
                password: passwordSenha,
                url: urlSenha
            }
            const res = await fetch('http://localhost:8080/api/senha', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":token
                },
                body: JSON.stringify(data)
            });
            console.log(res.status)
        }
        requesicao()
        useReceberItems()
        setUrl("")
        setDescricao("")
        setPasswordSenha("")
    }
    return (
        <div>
            <h1>Cadastrar Senhas</h1>
            <form onSubmit={useSenha}>
                <label>
                    <span>Username</span>
                    <input type={'text'} value={descricaoSenha} onChange={(event)=> setDescricao(event.target.value)}/>
                </label>
                <label>
                    <span>Senha</span>
                    <input type={'text'} value={passwordSenha} onChange={(event)=> setPasswordSenha(event.target.value)}/>
                </label>
                <label>
                    <span>URL</span>
                    <input type={'text'} value={urlSenha} onChange={(event)=> setUrl(event.target.value)}/>
                </label>
                <input type="submit" value={'Cadastrar'}/>
            </form>

        </div>
    )
}

export default Senha