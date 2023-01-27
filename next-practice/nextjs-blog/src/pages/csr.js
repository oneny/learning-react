import React, { useEffect, useState } from 'react'
import SubLayout from '../components/SubLayout'
import Layout from '../components/Layout'

const CSR = () => {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(new Date().toISOString())
  }, [])

  return (
    <>
      <h1 className="title">{time}</h1>
    </>
  )
}

CSR.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  )
}

export default CSR
