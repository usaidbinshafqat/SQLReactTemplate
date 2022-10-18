import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

function App () {
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [profPic, setProfPic] = useState('')
  const [posts, setPosts] = useState('')
  const [followers, setFollowers] = useState('')
  const [following, setFollowing] = useState('')
  const [usersList, setUsersList] = useState([])

  const [newUserName, setNewUserName] = useState('')

  const refreshPage = () => {
    window.location.reload()
  }

  useEffect(() => {
    Axios.get('http://localhost:3000/api/get').then(response => {
      setUsersList(response.data)
    })
  }, [])

  const submitLog = () => {
    Axios.post('http://localhost:3000/api/insert', {
      Name: name,
      Username: userName,
      ProfilePicture: profPic,
      Posts: posts,
      Followers: followers,
      Following: following
    })

    setUsersList([
      ...usersList,
      {
        Name: name,
        Username: userName,
        ProfilePicture: profPic,
        Posts: posts,
        Followers: followers,
        Following: following
      }
    ])
  }

  const deleteAccount = username => {
    Axios.delete(`http://localhost:3000/api/delete/${username}`)
    refreshPage()
  }

  const updateUserName = name => {
    Axios.put('http://localhost:3000/api/update', {
      Name: name,
      Username: newUserName
    })
    setNewUserName('')
  }

  return (
    <div className='App'>
      <h1>React SQL Test App</h1>

      <div className='form'>
        <label>Name: </label>
        <input
          type='text'
          name='name'
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <label>UserName: </label>
        <input
          type='text'
          name='username'
          onChange={e => {
            setUserName(e.target.value)
          }}
        />
        <label>Profile Picture: </label>
        <input
          type='text'
          name='profile_picture'
          onChange={e => {
            setProfPic(e.target.value)
          }}
        />
        <label>Posts: </label>
        <input
          type='text'
          name='posts'
          onChange={e => {
            setPosts(e.target.value)
          }}
        />
        <label>Followers: </label>
        <input
          type='text'
          name='followers'
          onChange={e => {
            setFollowers(e.target.value)
          }}
        />
        <label>Following: </label>
        <input
          type='text'
          name='following'
          onChange={e => {
            setFollowing(e.target.value)
          }}
        />

        <button onClick={submitLog}>Submit</button>

        {usersList.map(key => {
          return (
            <div className='users'>
              <h1>{key.Name}</h1>
              <p>
                UserName: {key.Username} | Profile Picture: {key.ProfilePicture}{' '}
                | Posts: {key.Posts} | Followers: {key.Followers} | Following:{' '}
                {key.Following}
              </p>
              <button
                onClick={() => {
                  deleteAccount(key.Username)
                }}
              >
                Delete Account
              </button>
              <input
                type='text'
                id='updateInput'
                onChange={e => {
                  setNewUserName(e.target.value)
                }}
              />
              <button
                onClick={() => {
                  updateUserName(key.Name)
                }}
              >
                Update UserName
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
