export const getData = (axios, URL, reducer) => async (dispatch) => {
  const resp = await axios.get(URL);
  dispatch(reducer(resp.data.data));
};

export const addData = (axios, URL, reducer, data) => async (dispatch) => {
  try {
    const resp = await axios.post(URL, data);
    dispatch(reducer(resp.data.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateData = (axios, URL, reducer, data) => async (dispatch) => {
  try {
    const resp = await axios.put(URL, data);
    dispatch(reducer(resp.data.data));
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = (axios, URL, reducer, id) => async (dispatch) => {
  try {
    const resp = await axios.delete(URL, { data: { id } });
    if (resp.data.success) {
      dispatch(reducer({ id }));
    }
  } catch (err) {
    console.log(err);
  }
};
