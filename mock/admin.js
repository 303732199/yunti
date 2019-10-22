
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/admin/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          error_code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        error_code: 0,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/admin/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          error_code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        error_code: 0,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/admin/logout',
    type: 'post',
    response: _ => {
      return {
        error_code: 0,
        data: 'success'
      }
    }
  }
]
