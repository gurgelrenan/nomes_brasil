'use client'

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const NameChart = ({ data, name }) => {
  if (!data || !data.res) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Carregando dados...</CardTitle>
          <CardDescription>Aguardando dados do nome {name}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const chartData = data.res.map(item => ({
    periodo: item.periodo,
    frequencia: item.frequencia
  }))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Frequência do nome "{name}" ao longo dos anos</CardTitle>
        <CardDescription>
          Dados do censo brasileiro - Total de registros: {data.res.reduce((acc, item) => acc + item.frequencia, 0).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorFrequencia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
              <XAxis
                dataKey="periodo"
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1 }}
              />
              <YAxis
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1 }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg shadow-lg p-4">
                        <p className="font-semibold text-foreground">{`Período: ${label}`}</p>
                        <p className="text-primary font-medium">{`Frequência: ${payload[0].value.toLocaleString()}`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="frequencia"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#colorFrequencia)"
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5, stroke: 'white' }}
                activeDot={{ r: 8, fill: 'hsl(var(--primary))', strokeWidth: 3, stroke: 'white' }}
                connectNulls={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default NameChart
