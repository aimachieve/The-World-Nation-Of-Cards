import { createContext, useEffect, useReducer } from 'react'
// utils
import axios from '../utils/axios'
import { isValidToken, setSession } from '../utils/jwt'

// ----------------------------------------------------------------------

const initialState = {
  isCreatedEvent: false,
  current_event: null,
  /*======== Mr.New =========*/
  tables: [],
  users: [],
  days: [],
  expectedUsersAmount: 0,
  /*=========================*/
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  SET_CURRENT_EVENT: (state, action) => {
    const { current_event } = action.payload

    return {
      ...state,
      isCreatedEvent: true,
      current_event,
    }
  },
  /*======== Mr.New =========*/
  SET_TABLES: (state, action) => {
    const { tables } = action.payload
    return {
      ...state,
      tables,
    }
  },
  SET_USERS: (state, action) => {
    const { users } = action.payload
    return {
      ...state,
      users: [...state.users, ...users],
    }
  },
  SET_EXPECTED_USERS_AMOUNT: (state, action) => {
    const { expectedUsersAmount } = action.payload
    return {
      ...state,
      expectedUsersAmount,
    }
  },
  CLEAR_USERS: (state, action) => {
    return {
      ...state,
      users: [],
    }
  },
  SET_DAYS: (state, action) => {
    const { days } = action.payload
    return {
      ...state,
      days,
    }
  },
  /*=========================*/
  PRODUCTS: (state, action) => {
    const { products } = action.payload
    return {
      ...state,
      products,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const DrawContext = createContext({
  ...initialState,
  create_sEvent: () => Promise.resolve(),
  create_mEvent: () => Promise.resolve(),

  /*======== Mr.New =========*/
  getRandomTables: () => Promise.resolve(),
  getRandomTablesByUserId: () => Promise.resolve(),
  getSearchData: () => Promise.resolve(),
  clearUsers: () => Promise.resolve(),
  getRandomTablesByDayIdAndRoomNumber: () => Promise.resolve(),
  getAllDays: () => Promise.resolve(),
  /*=========================*/

  getProducts: () => Promise.resolve(),
  purchase: () => Promise.resolve(),
})

function DrawProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {}

    initialize()
  }, [])

  const create_mEvent = async (data) => {
    const response = await axios.post('/api/draw/create_mEvent', data)

    const { current_event } = response.data

    dispatch({
      type: 'SET_CURRENT_EVENT',
      payload: {
        current_event,
      },
    })
  }

  const create_sEvent = async (data) => {
    const response = await axios.post('/api/draw/create_sEvent', data)

    const { current_event } = response.data

    dispatch({
      type: 'SET_CURRENT_EVENT',
      payload: {
        current_event,
      },
    })
  }

  /*================== Mr.New ========================*/
  /**
   * Get 12 random tables
   */
  const getRandomTables = async () => {
    const response = await axios.get('/api/draw/getRandomTables')
    const { status, data } = response
    if (status === 200) {
      dispatch({
        type: 'SET_TABLES',
        payload: {
          tables: data,
        },
      })
    }
  }

  /**
   * Get 12 random tables by user id
   * @param {string} userId
   */
  const getRandomTablesByUserId = async (userId) => {
    const response = await axios.get(
      `/api/draw/getRandomTablesByUserId/${userId}`,
    )
    const { status, data } = response

    if (status === 200) {
      dispatch({
        type: 'SET_TABLES',
        payload: {
          tables: data,
        },
      })
    }
  }

  /**
   * Search users
   * @param {string} key
   * @param {object} pageData
   */
  const getSearchData = async (key, pageData) => {
    const response = !!key
      ? await axios.post('/api/draw/search', { ...pageData, key })
      : await axios.post('/api/draw/getAllUsers', pageData)
    const { status, data } = response
    if (status === 200) {
      dispatch({
        type: 'SET_EXPECTED_USERS_AMOUNT',
        payload: {
          expectedUsersAmount: data.metadata[0].total,
        },
      })
      dispatch({
        type: 'SET_USERS',
        payload: {
          users: data.data,
        },
      })
    }
  }

  /**
   * Clear "users" state
   */
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
      payload: {
        users: [],
      },
    })
  }

  /**
   * Get 12 random tables by room id
   * @param {string} roomId
   */
  const getRandomTablesByDayIdAndRoomNumber = async (reqData) => {
    const response = await axios.post(
      '/api/draw/getRandomTablesByDayIdAndRoomNumber',
      reqData,
    )
    const { status, data } = response

    if (status === 200) {
      dispatch({
        type: 'SET_TABLES',
        payload: {
          tables: data,
        },
      })
    }
  }

  const getAllDays = async () => {
    const response = await axios.get('/api/draw/getAllDays')
    const { status, data } = response

    if (status === 200) {
      dispatch({
        type: 'SET_DAYS',
        payload: {
          days: data,
        },
      })
    }
  }
  /*==================================================*/
  const getProducts = async () => {
    const response = await axios.get('/api/draw/products')
    const { products } = response.data

    dispatch({
      type: 'PRODUCTS',
      payload: {
        products,
      },
    })
  }

  const purchase = async (user) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    const response = await axios.post('/api/draw/payment', { cart, user })

    if (response.data.xStatus == 'Approved') {
      window.localStorage.removeItem('products')
      window.localStorage.removeItem('cart')
      window.location.href = '/thanks'
    }
  }

  return (
    <DrawContext.Provider
      value={{
        ...state,
        create_sEvent,
        create_mEvent,
        /*== Mr.New ==*/
        getRandomTables,
        getRandomTablesByUserId,
        getSearchData,
        clearUsers,
        getRandomTablesByDayIdAndRoomNumber,
        getAllDays,
        /*===========*/
        getProducts,
        purchase,
      }}
    >
      {children}
    </DrawContext.Provider>
  )
}

export { DrawContext, DrawProvider }
