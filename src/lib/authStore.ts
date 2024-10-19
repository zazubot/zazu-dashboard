import createStore, { createStoreReturn } from 'react-auth-kit/createStore'

const authStore: createStoreReturn<object> = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})

export default authStore
