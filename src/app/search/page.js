'use client'

import { useEffect, useState } from "react";
import axios from "axios";

const SearchData = () => {
  const [name, setName] = useState('renan');

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`
    }).then((response) => {
        console.log(response)
    });
  });

  return (
    <h1>oi</h1>
  )
}

export default SearchData;
