'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation"

const SearchData = () => {
  const params = useParams();
  const [name, setName] = useState(params.name);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`
    }).then((response) => {
      setData(response.data[0]);
    });
  }, [name]);

  return (
    <div>
      <h1>Exibindo dados para o nome: {name}...</h1>
      {data.res && data.res.map((item) => (
        <div key={item.periodo}>{item.frequencia}</div>
      ))}
    </div>
  )
}

export default SearchData;
