import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, fetchUser } from './lib/userSlice'
import { Article, ArticleSkeleton } from './components/Article'

export default function () {
  const dispatch = useDispatch()
  const { loading, users, user, error } = useSelector((state) => state.users)

  const [init, setInit] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [userIdSelected, setUserIdSelected] = useState(0)
  const [userSelected, setUserSelected] = useState({})

  useEffect(() => {
    if (!init) {
      setInit(true)
    }
  }, [])

  useEffect(() => {
    if (init) {
      dispatch(fetchUsers())
    }
  }, [init])

  useEffect(() => {
    if (init && !loading) {
      setLoaded(true)
    }
  }, [loading])

  useEffect(() => {
    if (userIdSelected) {
      setLoaded(false)
      dispatch(fetchUser(userIdSelected))
    }
  }, [userIdSelected])

  useEffect(() => {
    if (Object.keys(user).length) {
      setUserSelected(user)
    }
  }, [user])

  function refreshUsers() {
    setUserIdSelected(0)
    setLoaded(false)
    dispatch(fetchUsers())
  }

  return (
    <main>
      <div>
        <p>Reqres</p>
        <p>Test your front-end against a real API</p>
        <button
          className={loaded && !error ? '' : 'transparent'}
          type="button"
          onClick={() => refreshUsers()}
        >
          <span className="material-icons-outlined">refresh</span>
          <p>Perbarui</p>
        </button>
      </div>
      <div>
        {loaded && !error ? (
          userIdSelected ? (
            <Article item={userSelected} />
          ) : (
            users.map((item, key) => {
              return (
                <Article item={item} key={key} setUser={setUserIdSelected} />
              )
            })
          )
        ) : userIdSelected ? (
          <ArticleSkeleton />
        ) : (
          new Array(6).fill('').map((item, key) => {
            return <ArticleSkeleton key={key} />
          })
        )}
      </div>
    </main>
  )
}
