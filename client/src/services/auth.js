import { ref } from 'vue'

const user = ref(null)
const token = ref(null)

// Initialize from localStorage
const init = () => {
  const storedUser = localStorage.getItem('user')
  const storedToken = localStorage.getItem('authToken')
  
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (e) {
      localStorage.removeItem('user')
    }
  }
  
  if (storedToken) {
    token.value = storedToken
  }
}

const setUser = (newUser, newToken) => {
  if (newUser) {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  } else {
    user.value = null
    localStorage.removeItem('user')
  }
  
  if (newToken) {
    token.value = newToken
    localStorage.setItem('authToken', newToken)
  } else if (newToken === null) {
    token.value = null
    localStorage.removeItem('authToken')
  }
}

const clearUser = () => {
  user.value = null
  token.value = null
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
}

// Call init immediately
init()

export { user, token, setUser, clearUser }
