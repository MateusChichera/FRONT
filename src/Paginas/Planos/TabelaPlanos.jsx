import React, { useState, useEffect } from 'react';

function TabelaPlanos() {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const response = await fetch('http://localhost:4001/planos');
        if (response.ok) {
          const data = await response.json();
          setPlanos(data);
        } else {
          console.error('Erro ao buscar planos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar Planos:', error.message);
      }
    };

    fetchPlanos();
  }, []);


  const handleExcluir = async (id) => {
    if (window.confirm('Deseja mesmo excluir esse plano?')) {
        try {
          const response = await fetch(`http://localhost:4001/planos/${id}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            alert('Plano excluído com sucesso!');
            window.location.reload();
          } else {
            const errorData = await response.json();
            alert(`Erro ao excluir plano: ${errorData.message}`);
          }
        } catch (error) {
          alert(`Erro ao excluir plano: ${error.message}`);
        }
      }
  };

  return (
    <>
    <h1 className="mt-3">Lista de Planos</h1>
    <table className="table mt-3 table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nome</th>
          <th scope="col">Valor</th>
          <th scope="col">Dias</th>
          <th scope="col">Açoes</th>
        </tr>
      </thead>
      <tbody>
        {planos.map((plano) => (
          <tr key={plano.pla_id}>
            <td>{plano.pla_id}</td>
            <td>{plano.pla_nome}</td>
            <td>{plano.pla_valor}</td>
            <td>{plano.pla_dias}</td>
            <td>
              <div className="d-flex">
                <button
                  className="btn btn-success btn-sm mr-1"
                  onClick={() => {
                    window.location.href = `/editar/planos/${plano.pla_id}`;
                  }}
                >
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleExcluir(plano.pla_id)}
                >
                  <i className="fas fa-trash-alt"></i> Excluir
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
  
}

export default TabelaPlanos;
