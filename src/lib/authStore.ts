import createStore, { createStoreReturn } from 'react-auth-kit/createStore'

const authStore: createStoreReturn<object> = createStore({
  authName: '_auth',
  authType: 'localstorage',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})

export default authStore
