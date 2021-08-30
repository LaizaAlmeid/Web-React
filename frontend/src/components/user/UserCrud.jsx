import Main from '../template/Main'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const baseUrl = 'http://localhost:3001/produtos'


//caso q eu quisesse alterar aqueles icons title e subt cabecalho
const headerProps = {
    subtitle: 'cadastro'
}

const initialState = { nameprod: '', marca: '', departamento: '', qtd:'' , valor: '' }

export default function UserCrud() {

    const [produtos, setProd] = useState(initialState)
    const [produtosList, setItems] = useState([])

    useEffect(() => {
        const getAllProd = async () => {
            const allProd = await retrieveProd()
            if (allProd) setItems(allProd)
        }
        getAllProd()
    }, []);

    const retrieveProd = async () => {
        try {
            const response = await axios.get(baseUrl)
            return response.data
        } catch (err) {
            console.error(err.message)
        }
    }

    //console.log(produtosList)
    //atualiz
    const load = (produtos) => {
        setProd(produtos)
    }
    const remove = (prodSelected) => {
        axios.delete(`${baseUrl}/${prodSelected.id}`).then(resp => {
            const newList = produtosList.filter(p => p !== prodSelected)
            setItems(newList)
        })
    }

    const save = () => {
        if (produtos.nameprod === '' || produtos.qtd === 0 || produtos.valor === 0) {
            alert("TODOS OS CAMPOS DEVEM SER PREENCHIDOS")
            return
        }
        const method = produtos.id ? 'put' : 'post'

        const url = produtos.id ? `${baseUrl}/${produtos.id}` : baseUrl

        axios[method](url, produtos)

            .then(resp => {

                const list = getUpdateList(resp.data)

                setItems(list)

                clear()
            }).catch(err => {
                console.error(err.message)
            })
    }
    const getUpdateList = (data) => {

        const list = produtosList.filter((produtos) => produtos.id !== data.id)

        list.unshift(data)
        return list

    }

    const clear = () => {
        setProd(initialState)
    }

    const updateField = (event) => {
        setProd({
            ...produtos,
            [event.target.name]: event.target.value
        })
    }

    function renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nomeprod</th>
                        <th>marca</th>
                        <th>depart</th>
                        <th>qtd</th>
                        <th>valor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    function renderRows() {
        return produtosList.map(produtos => {
            return (
                <tr key={produtos.id}>
                    <td>{produtos.id}</td>
                    <td>{produtos.nameprod}</td>
                    <td>{produtos.marca}</td>
                    <td>{produtos.departamento}</td>
                    <td>{produtos.qtd}</td>
                    <td>{produtos.valor}</td>
                    <td>
                        <button className="btn btn-info"
                            onClick={() => load(produtos)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        <button className="btn btn-danger ml-2"
                            onClick={() => remove(produtos)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    function renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Produto:</label>
                            <input type="text"
                                className="form-control"
                                name="nameprod"
                                value={produtos.nameprod}
                                onChange={e => updateField(e)}
                                placeholder="Digite o nome"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Marca:</label>
                            <input type="text" className="form-control"
                                name="marca"
                                value={produtos.marca}
                                onChange={e => updateField(e)}
                                placeholder="Digite a marca"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Departamento:</label>
                            <input type="text" className="form-control"
                                name="departamento"
                                value={produtos.departamento}
                                onChange={e => updateField(e)}
                                placeholder="Digite o departamento"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade:</label>
                            <input type="text" className="form-control"
                                name="qtd"
                                value={produtos.qtd}
                                onChange={e => updateField(e)}
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor:</label>
                            <input type="text" className="form-control"
                                name="valor"
                                value={produtos.valor}
                                onChange={e => updateField(e)}
                                placeholder="0"
                            />
                        </div>
                    </div>
                    
                </div>
                <div className="row">
                <div className="col-md-6 justify-content-end">
                        <div className="aling-items-center">
                            <button className="btn btn-primary"
                                onClick={e => save(e)}>
                                Salvar
                            </button>
                            <button className="btn btn-secondary ml-2"
                                onClick={e => clear(e)}>
                                Cancelar
                            </button>
                        </div>

                    </div>
                </div>
                
            </div>
        )
    }

    return (
        //Vvai para o children da main
        <Main {...headerProps}>
            {renderForm()}
            {renderTable()}
        </Main>

    )

}