import '../Horarios/Horarios.css';
import React, { useState , useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';

function EditarHorario() {
  const [horarioInicioValido, setHorarioInicioValido] = useState(false);
  const [horarioFimValido, setHorarioFimValido] = useState(false);
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');
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
  const {id} = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch(`http://localhost:4001/horarios/${id}`);
        if (response.ok) {
          const data = await response.json();
          // Atribuir os valores recuperados aos campos de entrada diretamente
          setTipoSala(data[0].hor_tipo);
          setHorarioInicio(data[0].hor_inicio);
          setHorarioFim(data[0].hor_fim);

          // Ajustar o estado dos dias da semana
          const diasSelecionados = data[0].hor_dias.split(',').reduce((acc, dia) => {
            acc[dia.toLowerCase()] = true;
            return acc;
          }, {});
          setDiasSemana(prevState => ({
            ...prevState,
            ...diasSelecionados,
          }));
        } else {
          console.error('Erro ao buscar plano:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar plano:', error.message);
      }
    };

    if (id) {
      fetchHorarios();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const algumDiaSelecionado = Object.values(diasSemana).some(dia => dia);
    if (algumDiaSelecionado && horarioInicioValido && horarioFimValido) {

        const horario ={
          hor_tipo: tipoSala,
          hor_dias : Object.keys(diasSemana).filter(dia => diasSemana[dia]).map(dia => dia.toUpperCase()).join(','),
          hor_inicio: horarioInicio,
          hor_fim: horarioFim,
        }
        console.log(horario);
        try{
          const response = await fetch(`http://localhost:4001/horarios/${id}`,{
            method : 'PUT',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(horario),
          });
    
          if(response.ok){
            alert('Horario Atualizado com sucesso');
            navigate('/buscar/horarios')
            setHorarioInicioValido(false);
            setHorarioFimValido(false);
          }else{
            const errorData = await response.json();
            alert(`Erro ao atualizar horario: ${errorData.message}`);
          }
        }catch(error){
          alert(`Erro ao atualizar horario: ${error.message}`);
        }
      }else{
        alert('Por favor, preencha todos os campos corretamente.');
      }
    }

  const handleDiaSemanaChange = (event) => {
    const { name, checked } = event.target;
    setDiasSemana(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  return (
    <form action="submit" className="container mt-5" onSubmit={handleSubmit}>
      <h1>Cadastro de Horário</h1>
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
          value={horarioInicio}
          onChange={(e) => setHorarioInicio(e.target.value)}
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
          value={horarioFim}
          onChange={(e) => setHorarioFim(e.target.value)}
          onBlur={handleHorarioFimBlur}
        />
        <p id="horarioFimAviso" className="text-danger"></p>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-success">Salvar</button>
      </div>
    </form>
  );
}

export default EditarHorario;
