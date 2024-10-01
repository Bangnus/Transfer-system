import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/connent-navbar/navbar'
import Table from '../../components/content-tables/tables'
import Button from '../../components/content-button/button'
const tranfer = () => {
  return (
    <div>
      <Navbar />
      <h1>การเทียบโอนรายวิชา</h1>
      <Link to='/addcourse'>
        <Button label='เพิ่มวิชาเทียบโอน' />
      </Link>
      <Table />
    </div>
  )
}

export default tranfer