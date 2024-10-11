import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSpecialcourse } from '../../../store/actions/courseActions'
import Button from '../../../components/content-button/button'

const specialcourse = () => {
  const [selectedGroupID, setSelectedGroupID] = useState(null);
  const [selectedSubGroupID, setSelectedSubGroupID] = useState(null)
  const dispatch = useDispatch();
  const { specialdata: specialcourses = [] } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchSpecialcourse());
  }, [dispatch])

  console.log(selectedGroupID)
  console.log(selectedSubGroupID)
  const handleGroupClick = (groupid) => {
    setSelectedGroupID(groupid === selectedGroupID ? null : groupid)
  }

  const handleSubGroupClkick = (groupid) => {
    setSelectedSubGroupID(groupid === selectedSubGroupID ? null : groupid)
  }
  return (
    <div>
      {specialcourses.map((subject) => (
        <div key={subject.id} className="">
          <div className="text-center">{subject.name}</div>
          <table>
            {subject.SpecialGroup.map((SpecialGroup, Groupindex) => (
              <tbody key={SpecialGroup.id}>
                <tr>
                  <td>
                    <button onClick={() => handleGroupClick(SpecialGroup.id)}>
                      {Groupindex + 1}.{SpecialGroup.name}
                    </button>
                    {selectedGroupID === SpecialGroup.id && SpecialGroup.SubSpecialtyGroup && SpecialGroup.SubSpecialtyGroup.length > 0 && (
                      <div className="">
                        {SpecialGroup.SubSpecialtyGroup.map((SubSpecialtyGroup, subGroupindex) => (
                          <div key={SubSpecialtyGroup.id} className="">
                            <button onClick={() => handleSubGroupClkick(SubSpecialtyGroup.id)}>
                              {Groupindex + 1}.{subGroupindex + 1}{SubSpecialtyGroup.name}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      ))}
    </div>
  )
}

export default specialcourse