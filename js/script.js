function route() {
  const path = window.location.pathname
  console.log(path)

  switch (path) {
    case '/':
    case '/index.html':
      // do something
      break
    case '/register/':
    case '/register/index.html':
      // do something
      break
    case '/login/':
    case '/login/index.html':
      // do something
      break
    case '/profile/':
    case '/profile/index.html':
      // do something
      break
    case '/about/':
    case '/about/index.html':
      // do something
      break
    case '/auctions/':
    case '/auctions/index.html':
      // do something
      break
    default:
  }
}

route()
