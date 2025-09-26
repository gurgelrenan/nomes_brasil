'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"
import NameChart from "@/components/NameChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchData = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState({ res: [] });
  const [loading, setLoading] = useState(false);
  const [currentName, setCurrentName] = useState("");

  const fetchData = (searchName) => {
    if (searchName) {
      setLoading(true);
      axios({
        method: "GET",
        url: `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${searchName}`
      }).then((response) => {
        const responseData = response.data[0];
        setData(responseData || { res: [] });
        setCurrentName(searchName);
        setLoading(false);
      }).catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setData({ res: [] });
        setLoading(false);
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const newName = searchInput.trim();
      fetchData(newName);
    }
  };

  const formatName = (name) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentName ? `Análise do Nome "${formatName(currentName)}"` : "Análise de Nomes Brasileiros"}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Dados históricos dos censos brasileiros do IBGE
          </p>

          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Digite um nome (ex: João, Maria)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1"
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={!searchInput.trim() || loading}
                >
                  {loading ? "Buscando..." : "Pesquisar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {currentName && <NameChart data={data} name={formatName(currentName)} />}

        {currentName && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total de Registros</CardTitle>
                <CardDescription>Soma de todas as ocorrências</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  {data.res && data.res.length > 0
                    ? data.res.reduce((acc, item) => acc + item.frequencia, 0).toLocaleString()
                    : '0'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Período com Maior Frequência</CardTitle>
                <CardDescription>Década de maior popularidade</CardDescription>
              </CardHeader>
              <CardContent>
                {(() => {
                  if (!data.res || data.res.length === 0) {
                    return (
                      <div>
                        <p className="text-3xl font-bold text-primary">-</p>
                        <p className="text-sm text-muted-foreground">Sem dados</p>
                      </div>
                    );
                  }
                  const maxItem = data.res.reduce((max, item) =>
                    item.frequencia > max.frequencia ? item : max
                  );
                  return (
                    <div>
                      <p className="text-3xl font-bold text-primary">{maxItem.periodo}</p>
                      <p className="text-sm text-muted-foreground">
                        {maxItem.frequencia.toLocaleString()} registros
                      </p>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}

        {currentName && data.res && data.res.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Dados Detalhados por Período</CardTitle>
              <CardDescription>Informações completas de cada década</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-6 font-semibold">Período</th>
                      <th className="text-left py-2 px-6 font-semibold">Frequência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.res.map((item) => (
                      <tr key={item.periodo} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-4">{item.periodo}</td>
                        <td className="py-2 px-4 font-medium">{item.frequencia.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-muted-foreground">Carregando dados...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchData;