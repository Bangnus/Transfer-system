import React from 'react'
import Button from '../../components/content-button/button'
import { Link } from 'react-router-dom'
const managecourse = () => {
    return (
        <>
        <div className="">
            <Link to="/addspecialgroup">
            <Button label='เพิ่มกลุ่มวิชา'/>
            </Link>
        </div>
        </>
    )
}

export default managecourse