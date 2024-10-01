export const setUser = (user) => (dispatch) => {
  // Dispatch เพื่อบันทึกผู้ใช้ลงใน Redux store
  dispatch({
    type: 'SET_USER',
    payload: user,
  });

  setTimeout(() => {
    dispatch(clearUser()); // ลบข้อมูลผู้ใช้หลังจากเวลาที่กำหนด
  }, 24 * 60 * 60 * 1000); // 24 ชม.
};

export const clearUser = () => ({
  type: 'CLEAR_USER',
});
