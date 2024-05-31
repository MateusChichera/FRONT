import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './Clientes.css';
import { validarCPF, validarCNPJ, buscarEnderecoPorCEP, buscarCnpj } from './Clientes.js';
import TabelaClientes from './TabelaClientes';

function Clientes() {
  const [tipoCliente, setTipoCliente] = useState('CPF');
  const [nome, setNome] = useState('');
  const [razao, setRazao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cnpjError, setCnpjError] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [dataNascimentoError, setDataNascimentoError] = useState('');
  const [cep, setCep] = useState('');
  const [cepError, setCepError] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [num, setNum] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [mostrarTabela, setMostrarTabela] = useState(false);

  const handleBlurNome = () => {
    if (nome.length < 2) {
      setNomeError('O nome deve ter pelo menos 2 caracteres.');
    } else {
      setNomeError('');
    }
  };

  const handleBlurCPF = () => {
    if (!validarCPF(cpf)) {
      setCpfError('CPF inválido');
    } else {
      setCpfError('');
    }
  };

  const handleBlurCNPJ = async () => {
    if (validarCNPJ(cnpj)) {
      try {
        const data = await buscarCnpj(cnpj);
        if (data.numero) { // Verifica se a resposta contém o campo "numero"
          setNome(data.nome);
          setRazao(data.fantasia);
          setTelefone(data.telefone);
          setEndereco(data.logradouro);
          setNum(data.numero)
          setCidade(data.municipio);
          setBairro(data.bairro);
          setEstado(data.uf);
          setCep(data.cep);
          setEmail(data.email);
          setCnpjError('');
        } else {
          setCnpjError('CNPJ inválido');
        }
      } catch (error) {
        setCnpjError('Erro ao buscar CNPJ');
      }
    } else {
      setCnpjError('CNPJ inválido');
    }
  };
  
  

  const handleBlurDataNascimento = () => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    if (idade < 10) {
      setDataNascimentoError('A idade deve ser maior que 10 anos.');
    } else {
      setDataNascimentoError('');
    }
  };

  const handleBlurCEP = async () => {
    const cepLimpo = cep.replace(/[^\d]/g, '');
    if (cepLimpo.length === 8) {
      try {
        const data = await buscarEnderecoPorCEP(cepLimpo);
        if (data.erro) {
          setCepError('CEP não encontrado');
          setEndereco('');
          setCidade('');
          setBairro('');
          setEstado('');
        } else {
          setCepError('');
          setEndereco(data.logradouro);
          setCidade(data.localidade);
          setBairro(data.bairro);
          setEstado(data.uf);
        }
      } catch {
        setCepError('Erro ao buscar CEP');
      }
    } else {
      setCepError('CEP inválido');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Executar todas as validações antes de enviar o formulário
    handleBlurNome();
    handleBlurCPF();
    handleBlurCNPJ();
    handleBlurDataNascimento();
    handleBlurCEP();

    // Se houver algum erro, não enviar o formulário
    if (nomeError || cpfError || cnpjError || dataNascimentoError || cepError) {
      return;
    }

    const cliente = {
      tipoCliente,
      nome,
      razao,
      telefone,
      cpf,
      cnpj,
      dataNascimento,
      cep,
      endereco,
      num,
      bairro,
      cidade,
      estado,
      email,
    };

    salvarClienteNoLocalStorage(cliente);

    alert('Cliente cadastrado com sucesso!');

    // Limpar todos os campos após o envio
    setNome('');
    setRazao('');
    setTelefone('');
    setCpf('');
    setCnpj('');
    setDataNascimento('');
    setCep('');
    setEndereco('');
    setBairro('');
    setNum('');
    setEstado('');
    setCidade('');
    setEmail('');
    setTipoCliente('CPF');
  };

  const salvarClienteNoLocalStorage = (cliente) => {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      {mostrarTabela ? (
        <TabelaClientes setMostrarTabela={setMostrarTabela} />
      ) : (
        <form className="container mt-5" onSubmit={handleSubmit}>
          <h1>Cadastro de Clientes</h1>
          <div className="form-group">
            <label htmlFor="tipoCliente">Tipo de Cliente</label>
            <select
              className="form-control"
              id="tipoCliente"
              value={tipoCliente}
              onChange={(e) => setTipoCliente(e.target.value)}
            >
              <option value="CPF">Pessoa Física</option>
              <option value="CNPJ">Pessoa Jurídica</option>
            </select>
          </div>

          {tipoCliente === 'CPF' && (
            <>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={handleBlurNome}
                  placeholder="Nome"
                />
                {nomeError && <p className="text-danger">{nomeError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  className="form-control"
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  onBlur={handleBlurCPF}
                  placeholder="CPF"
                />
                {cpfError && <p className="text-danger">{cpfError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  id="dataNascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  onBlur={handleBlurDataNascimento}
                  placeholder="Data de Nascimento"
                />
                {dataNascimentoError && <p className="text-danger">{dataNascimentoError}</p>}
              </div>
            </>
          )}

          {tipoCliente === 'CNPJ' && (
            <>
              <div className="form-group">
                <label htmlFor="cnpj">CNPJ</label>
                <InputMask
                  mask="99.999.999/9999-99"
                  className="form-control"
                  id="cnpj"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  onBlur={handleBlurCNPJ}
                  placeholder="CNPJ"
                />
                {cnpjError && <p className="text-danger">{cnpjError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="nome">Nome Fantasia</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome Fantasia"
                />
              </div>
              <div className="form-group">
                <label htmlFor="razao">Razão Social</label>
                <input
                  type="text"
                  className="form-control"
                  id="razao"
                  value={razao}
                  onChange={(e) => setRazao(e.target.value)}
                  placeholder="Razão Social"
                />
              </div>
            </>
          )}
          <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <InputMask
                  mask="(99) 9999-9999"
                  className="form-control"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Telefone"
                />
              </div>

          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <InputMask
              mask="99999-999"
              className="form-control"
              id="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={handleBlurCEP}
              onKeyDown={handleKeyDown}
              placeholder="CEP"
            />
            {cepError && <p className="text-danger">{cepError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              className="form-control"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="num">Número</label>
            <input
              type="text"
              className="form-control"
              id="num"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              placeholder="Número"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              className="form-control"
              id="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Bairro"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              className="form-control"
              id="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Cidade"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              className="form-control"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              placeholder="Estado"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-success">Salvar</button>
            <button type="button" className="btn btn-info" onClick={() => setMostrarTabela(true)}>Lista</button>
          </div>
        </form>
      )}
    </>
  );
}

export default Clientes;
