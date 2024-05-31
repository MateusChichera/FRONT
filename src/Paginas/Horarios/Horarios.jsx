import '../Horarios/Horarios.css';
import React, { useState } from 'react';

function Planos() {
  const [dataValida, setDataValida] = useState(false);
  const [horarioInicioValido, setHorarioInicioValido] = useState(false);
  const [horarioFimValido, setHorarioFimValido] = useState(false);
  const [tipoSala, setTipoSala] = useState('COWORKING');
  const [diasSemana, setDiasSemana] = useState({
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
    sabado: false,
    domingo: false
  });

  // Funções de validação
  const validarHorario = (horario) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(horario);
  };

  // Funções para lidar com a validação onBlur
  const handleHorarioInicioBlur = (event) => {
    const horario = event.target.value;
    if (!validarHorario(horario)) {
      document.getElementById('horarioInicioAviso').textContent = 'Horário de início inválido. Deve estar no formato HH:MM.';
      setHorarioInicioValido(false);
    } else {
      document.getElementById('horarioInicioAviso').textContent = '';
      setHorarioInicioValido(true);
    }
  };

  const handleHorarioFimBlur = (event) => {
    const horario = event.target.value;
    if (!validarHorario(horario)) {
      document.getElementById('horarioFimAviso').textContent = 'Horário final inválido. Deve estar no formato HH:MM.';
      setHorarioFimValido(false);
    } else {
      document.getElementById('horarioFimAviso').textContent = '';
      setHorarioFimValido(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const algumDiaSelecionado = Object.values(diasSemana).some(dia => dia);
    if (algumDiaSelecionado && horarioInicioValido && horarioFimValido) {
      alert('Horário cadastrado com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  const handleDiaSemanaChange = (event) => {
    const { name, checked } = event.target;
    setDiasSemana(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  return (
    <form action="submit" className="container mt-5" onSubmit={handleSubmit}>
      <h1>Cadastro de Horários</h1>
      <div className="form-group">
        <label htmlFor="tipoSala">Tipo de Sala</label>
        <select
          className="form-control"
          id="tipoSala"
          value={tipoSala}
          onChange={(e) => setTipoSala(e.target.value)}
        >
          <option value="COWORKING">COWORKING</option>
          <option value="SALAS INDIVIDUAIS">SALAS INDIVIDUAIS</option>
          <option value="SALA DE REUNIÃO">SALA DE REUNIÃO</option>
          <option value="SALÃO NOBRE">SALÃO NOBRE</option>
        </select>
      </div>
      <div className="form-group">
        <label>Dias da Semana</label>
        <div>
          {['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'].map(dia => (
            <div key={dia} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={dia}
                name={dia}
                checked={diasSemana[dia]}
                onChange={handleDiaSemanaChange}
              />
              <label className="form-check-label" htmlFor={dia}>
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="horarioInicio">Horário de Início</label>
        <input
          type="time"
          className={`form-control ${horarioInicioValido ? 'is-valid' : ''}`}
          id="horarioInicio"
          placeholder="Horário de Início"
          onBlur={handleHorarioInicioBlur}
        />
        <p id="horarioInicioAviso" className="text-danger"></p>
      </div>
      <div className="form-group">
        <label htmlFor="horarioFim">Horário Final</label>
        <input
          type="time"
          className={`form-control ${horarioFimValido ? 'is-valid' : ''}`}
          id="horarioFim"
          placeholder="Horário Final"
          onBlur={handleHorarioFimBlur}
        />
        <p id="horarioFimAviso" className="text-danger"></p>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-success">Salvar</button>
        <button type="button" className="btn btn-warning">Alterar</button>
        <button type="button" className="btn btn-info">Lista</button>
        <button type="button" className="btn btn-danger">Excluir</button>
      </div>
    </form>
  );
}

export default Planos;
