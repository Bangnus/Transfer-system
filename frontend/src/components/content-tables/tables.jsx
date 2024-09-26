import React from 'react'
import Proptype from 'prop-types'

const tables = () => {
  return (
    <div className='relative flex flex-col w-full h-full  text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
        <table>
            <thead>
                <tr>
                    <th>รหัสวิชา</th>
                    <th>ชื่อวิชา</th>
                    <th>ท:ป</th>
                    <th>ผลการเรียน</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                <tr>
                    <td>Peerapat</td>
                    <td>Peerapat</td>
                    <td>Peerapat</td>
                    <td>Peerapat</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default tables