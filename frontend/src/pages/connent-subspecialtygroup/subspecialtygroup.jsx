import React, { useState, useEffect } from 'react'
import Navbar from '../../components/connent-navbar/navbar'
import { useSelector, useDispatch } from 'react-redux'
import { addspecialGroup, addSubSpecialtyGroup, addspecialcourse } from '../../store/actions/specialGroupActions'
const subspecialtygroup = () => {
    const dispatch = useDispatch();
    //
    const [specialGroupName, setSpecialGroupName] = useState('');
    const [secName, setSecName] = useState('');

    const [subSpecialGroupName, setSubSpecialGroupName] = useState(['']);
    const [specialGroupID, setSpecialGroupID] = useState(null);

    const { loading, error, specialGroup, SubSpecialtyGroup, specialcourse } = useSelector((state) => state.specialGroup);

    useEffect(() => {

    },[])
    return (
        <div>
            <Navbar />
        </div>
    )
}

export default subspecialtygroup