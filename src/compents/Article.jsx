function Article({ item, setUser }) {
  return (
    <article {...(setUser && { onClick: () => setUser(item.id) })}>
      <div>
        <div>
          <img src={item.avatar} alt="img" loading="lazy" />
        </div>
        <div>
          <p>{item.first_name + ' ' + item.last_name}</p>
          <div>
            <span className="material-icons-outlined">mail</span>
            <p>{item.email}</p>
          </div>
        </div>
      </div>
      <p>{item.id}</p>
    </article>
  )
}

function ArticleSkeleton() {
  return (
    <article className="skeleton">
      <div>
        <div></div>
        <div>
          <p></p>
          <div></div>
        </div>
      </div>
      <p></p>
    </article>
  )
}

export { Article, ArticleSkeleton }
