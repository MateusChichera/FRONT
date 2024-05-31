import React, { useEffect, useState } from 'react';
import './TabelaClientes.css';

function TabelaClientes({ setMostrarTabela }) { // Recebe a função setMostrarTabela como prop
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const clientesSalvos = JSON.parse(localStorage.getItem('clientes')) || [];
    setClientes(clientesSalvos);
  }, []);

  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const handleEditar = (index) => {
    // Implementar lógica de edição
    console.log('Editar', index);
  };

  const handleExcluir = (index) => {
    const novosClientes = [...clientes];
    novosClientes.splice(index, 1);
    setClientes(novosClientes);
    localStorage.setItem('clientes', JSON.stringify(novosClientes));
  };

  return (
    <div className="table-container">
      <h2>Lista de Clientes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tipo de Cliente</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Data de Nascimento</th>
            <th>CEP</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.tipoCliente}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.tipoCliente === 'CPF' ? cliente.cpf : cliente.cnpj}</td>
              <td>{formatarData(cliente.dataNascimento)}</td>
              <td>{cliente.cep}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.cidade}</td>
              <td>{cliente.email}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEditar(index)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleExcluir(index)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => setMostrarTabela(false)}>Voltar</button>
    </div>
  );
}

export default TabelaClientes;
