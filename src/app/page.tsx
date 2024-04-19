'use client'
import Column from '@/components/column'
import Header from '@/components/header'
import { Sag } from '@prisma/client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState<Sag[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const statusIds = data!.map((item) => item.status_id)
  const uniqueStatusIds = Array.from(new Set(statusIds.sort()))

  const getCasesByStatusId = (statusId: number) => {
    return data.filter((a) => a.status_id === statusId)
  }

  useEffect(() => {
    setLoading(true)
    axios
      .get('/api/laws')
      .then((res) => {
        setData(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="">
      <Header />
      {loading && <span>Loading...</span>}
      <div className="flex w-screen overflow-x-scroll">
        {data &&
          uniqueStatusIds.map((statusId) => (
            <Column key={statusId} statusId={statusId} cases={getCasesByStatusId(statusId)} />
          ))}
      </div>
    </main>
  )
}
