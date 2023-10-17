import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './lib/userSlice'

export default function () {
  const dispatch = useDispatch()
  const { loading, users, error } = useSelector((state) => state.users)

  const [init, setInit] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!init) {
      setInit(true)
    }
  }, [])

  useEffect(() => {
    if (init) {
      dispatch(fetchUsers({ size: 6 }))
    }
  }, [init])

  useEffect(() => {
    if (init && !loading) {
      setLoaded(true)
    }
  }, [loading])

  function refreshUser() {
    setLoaded(false)
    dispatch(fetchUsers({ size: 6 }))
  }

  return (
    <main>
      <div>
        <p>Testimoni Peserta</p>
        <p>
          Ribuan peserta sukses belajar di Akademi Prestasi. Apa kata mereka?
          <br />
          Berikut adalah testimoni dari mereka.
        </p>
        <button
          className={loaded && !error ? '' : 'transparent'}
          type="button"
          onClick={() => refreshUser()}
        >
          <span className="material-icons-outlined">refresh</span>
          <p>Perbarui</p>
        </button>
      </div>
      <div>
        {loaded && !error
          ? users.map((item, key) => {
              return (
                <article data-id={item.id} key={key}>
                  <div>
                    <div>
                      <div>
                        <img src={item.avatar} alt="img" loading="lazy" />
                      </div>
                      <div>
                        <p>{item.first_name + ' ' + item.last_name}</p>
                        <div>
                          <span className="material-icons-outlined">
                            business
                          </span>
                          <p>
                            {item.employment.key_skill +
                              ' - ' +
                              item.employment.title}
                          </p>
                        </div>
                        <div>
                          <span className="material-icons-outlined">place</span>
                          <p>{item.address.state}</p>
                        </div>
                      </div>
                    </div>
                    <p>{item.subscription.plan}</p>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec bibendum auctor erat, sed mollis erat pharetra id.
                    Pellentesque at erat vel augue malesuada tincidunt. Nunc
                    eleifend sit amet enim a accumsan. Integer vitae metus
                    purus. Fusce vulputate scelerisque felis, sed ultrices ipsum
                    aliquam in. Pellentesque pretium fringilla ante.
                  </p>
                </article>
              )
            })
          : new Array(6).fill('').map((item, key) => {
              return (
                <article className="skeleton" key={key}>
                  <div>
                    <div>
                      <div></div>
                      <div>
                        <p></p>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <p></p>
                  </div>
                  <p></p>
                </article>
              )
            })}
      </div>
    </main>
  )
}
